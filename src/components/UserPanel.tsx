import React, { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Mic, MicOff, Headphones, HeadphonesIcon, Settings, LogOut } from 'lucide-react'

interface UserPanelProps {
  user: User | null
  onSignOut: () => void
}

const UserPanel: React.FC<UserPanelProps> = ({ user, onSignOut }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Пользователь'

  return (
    <div className="p-2 border-t border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative">
            <div className="w-8 h-8 bg-discord-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-discord-green rounded-full border-2 border-discord-darker"></div>
          </div>
          
          <div className="ml-2 min-w-0 flex-1">
            <div className="text-sm text-white font-medium truncate">{username}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 transition-colors ${
              isMuted ? 'text-red-500' : 'text-gray-400 hover:text-gray-300'
            }`}
            title={isMuted ? 'Включить микрофон' : 'Выключить микрофон'}
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className={`p-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 transition-colors ${
              isDeafened ? 'text-red-500' : 'text-gray-400 hover:text-gray-300'
            }`}
            title={isDeafened ? 'Включить наушники' : 'Выключить наушники'}
          >
            {isDeafened ? <HeadphonesIcon className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 text-gray-400 hover:text-gray-300 transition-colors"
            title="Настройки пользователя"
          >
            <Settings className="h-4 w-4" />
          </button>
          
          <button
            onClick={onSignOut}
            className="p-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 text-gray-400 hover:text-red-400 transition-colors"
            title="Выйти"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mt-2 p-2 bg-discord-dark rounded border border-gray-700">
          <h4 className="text-sm text-white font-medium mb-2">Настройки</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Звук уведомлений</span>
              <button
                onClick={() => {/* Toggle notification sound */}}
                className="w-8 h-4 bg-discord-accent rounded-full relative"
              >
                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Автозапуск</span>
              <button
                onClick={() => {/* Toggle autostart */}}
                className="w-8 h-4 bg-gray-600 rounded-full relative"
              >
                <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPanel