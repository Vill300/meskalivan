# Функции реального времени для Meskalivan

## 📡 Текущее состояние

В текущей версии приложение имеет базовую структуру Discord-аналога с:
- ✅ Авторизацией и регистрацией
- ✅ Современным интерфейсом
- ✅ Основными компонентами UI
- ✅ Интеграцией с Supabase

## 🚀 Планируемые улучшения для реального времени

### 1. Подписка на изменения в реальном времени

Добавьте в `src/lib/supabase.ts`:

```typescript
// Подписка на новые сообщения
export const subscribeToMessages = (channelId: string, callback: (message: Message) => void) => {
  return supabase
    .channel(`messages:${channelId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `channel_id=eq.${channelId}`,
    }, callback)
    .subscribe()
}

// Подписка на изменения пользователей
export const subscribeToUsers = (callback: (user: User) => void) => {
  return supabase
    .channel('users')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'users',
    }, callback)
    .subscribe()
}
```

### 2. Компонент для управления реальным временем

Создайте `src/hooks/useRealtime.ts`:

```typescript
import { useEffect, useState } from 'react'
import { subscribeToMessages, subscribeToUsers, Message, User } from '../lib/supabase'

export const useRealtime = (channelId: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const messagesSubscription = subscribeToMessages(channelId, (newMessage) => {
      setMessages(prev => [...prev, newMessage])
    })

    const usersSubscription = subscribeToUsers((userChange) => {
      setUsers(prev => {
        if (userChange.eventType === 'INSERT') {
          return [...prev, userChange.new]
        } else if (userChange.eventType === 'UPDATE') {
          return prev.map(u => u.id === userChange.new.id ? userChange.new : u)
        } else if (userChange.eventType === 'DELETE') {
          return prev.filter(u => u.id !== userChange.old.id)
        }
        return prev
      })
    })

    return () => {
      messagesSubscription.unsubscribe()
      usersSubscription.unsubscribe()
    }
  }, [channelId])

  return { messages, users }
}
```

### 3. База данных схема для Supabase

Выполните этот SQL в Supabase SQL Editor:

```sql
-- Создание таблицы пользователей
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  status TEXT DEFAULT 'offline',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы серверов
CREATE TABLE servers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы каналов
CREATE TABLE channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'voice')),
  server_id UUID REFERENCES servers(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы сообщений
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  channel_id UUID REFERENCES channels(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view servers they belong to" ON servers FOR SELECT USING (true);
CREATE POLICY "Users can create servers" ON servers FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view channels in their servers" ON channels FOR SELECT USING (true);
CREATE POLICY "Users can create channels" ON channels FOR INSERT WITH CHECK (auth.uid() IN (
  SELECT owner_id FROM servers WHERE id = server_id
));

CREATE POLICY "Users can view messages in their channels" ON messages FOR SELECT USING (true);
CREATE POLICY "Users can create messages" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4. Улучшенный ChatArea с реальным временем

Обновите `src/components/ChatArea.tsx`:

```typescript
import { useRealtime } from '../hooks/useRealtime'

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
  const { messages, users } = useRealtime(channelId)
  // ... остальной код
}
```

### 5. Функции для работы с базой данных

Добавьте в `src/lib/supabase.ts`:

```typescript
// Получение сообщений канала
export const getMessages = async (channelId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      user:users(*)
    `)
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })
  
  return { data, error }
}

// Создание нового сообщения
export const createMessage = async (content: string, channelId: string, userId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      content,
      channel_id: channelId,
      user_id: userId,
    })
    .select()
    .single()
  
  return { data, error }
}

// Получение пользователей сервера
export const getServerUsers = async (serverId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('server_id', serverId)
  
  return { data, error }
}
```

### 6. Обновление статуса пользователя

Добавьте хук для управления статусом:

```typescript
// src/hooks/useUserStatus.ts
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useUserStatus = () => {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const updateStatus = async (status: 'online' | 'away' | 'dnd' | 'offline') => {
      await supabase
        .from('users')
        .update({ status })
        .eq('id', user.id)
    }

    // Установить статус "online" при входе
    updateStatus('online')

    // Установить статус "away" при неактивности
    const handleActivity = () => updateStatus('online')
    
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('keypress', handleActivity)

    // Установить статус "offline" при закрытии
    const handleBeforeUnload = () => updateStatus('offline')
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keypress', handleActivity)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      updateStatus('offline')
    }
  }, [user])
}
```

## 🎯 Следующие шаги

1. **Настройте базу данных** в Supabase
2. **Добавьте реальное время** используя приведенный код
3. **Протестируйте функциональность** с несколькими пользователями
4. **Оптимизируйте производительность** для больших каналов
5. **Добавьте уведомления** о новых сообщениях
6. **Реализуйте голосовые каналы** (требует WebRTC)

## 🔧 Тестирование

Для тестирования реального времени:

1. Откройте приложение в двух вкладках
2. Войдите под разными аккаунтами
3. Отправляйте сообщения в реальном времени
4. Проверьте синхронизацию статусов пользователей
5. Протестируйте переключение между каналами