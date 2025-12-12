import React, { useState, useEffect } from 'react'
import { Send, Plus, Gift, Paperclip, Smile } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Message {
  id: string
  content: string
  user: {
    id: string
    username: string
    avatar_url?: string
  }
  created_at: string
}

interface ChatAreaProps {
  channelId: string
}

const ChatArea: React.FC<ChatAreaProps> = ({ channelId }) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Mock messages for demo
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Привет! Добро пожаловать в Meskalivan! 👋',
        user: {
          id: '1',
          username: 'Admin',
          avatar_url: undefined
        },
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: '2',
        content: 'Это отличный Discord-клон! 🚀',
        user: {
          id: '2',
          username: 'User123',
          avatar_url: undefined
        },
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      },
      {
        id: '3',
        content: 'Здесь можно общаться в реальном времени',
        user: {
          id: '3',
          username: 'Developer',
          avatar_url: undefined
        },
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      }
    ]
    setMessages(mockMessages)
  }, [channelId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      user: {
        id: user.id,
        username: user.user_metadata?.username || user.email || 'Пользователь',
        avatar_url: user.user_metadata?.avatar_url
      },
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="chat-area flex flex-col">
      {/* Channel Header */}
      <div className="h-16 bg-discord-darker border-b border-gray-700 flex items-center px-4">
        <div className="flex items-center">
          <h2 className="text-white font-semibold text-lg">#{channelId}</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3 hover:bg-discord-darker hover:bg-opacity-50 p-2 rounded">
            <div className="w-10 h-10 bg-discord-accent rounded-full flex items-center justify-center text-white font-semibold">
              {message.user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium">{message.user.username}</span>
                <span className="text-gray-500 text-xs">{formatTime(message.created_at)}</span>
              </div>
              <p className="text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-center bg-discord-dark rounded-lg">
            <button
              type="button"
              className="p-3 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Написать в #${channelId}`}
              className="flex-1 bg-transparent text-white placeholder-gray-500 py-3 px-2 outline-none"
            />
            
            <div className="flex items-center space-x-2 pr-3">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Gift className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Smile className="h-5 w-5" />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-1 text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatArea