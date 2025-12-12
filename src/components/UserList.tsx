import React from 'react'
import { MicOff, Headphones } from 'lucide-react'

interface OnlineUser {
  id: string
  username: string
  status: 'online' | 'away' | 'dnd' | 'offline'
  isSpeaking?: boolean
  isMuted?: boolean
  isDeafened?: boolean
}

const UserList: React.FC = () => {
  const onlineUsers: OnlineUser[] = [
    { id: '1', username: 'Admin', status: 'online', isMuted: false, isDeafened: false },
    { id: '2', username: 'User123', status: 'online', isMuted: true, isDeafened: false },
    { id: '3', username: 'Developer', status: 'away', isMuted: false, isDeafened: true },
    { id: '4', username: 'Designer', status: 'online', isMuted: false, isDeafened: false },
    { id: '5', username: 'Gamer', status: 'dnd', isMuted: false, isDeafened: false },
  ]

  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'bg-discord-green'
      case 'away':
        return 'bg-yellow-500'
      case 'dnd':
        return 'bg-red-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online':
        return 'В сети'
      case 'away':
        return 'Отошёл'
      case 'dnd':
        return 'Не беспокоить'
      case 'offline':
        return 'Не в сети'
      default:
        return 'Неизвестно'
    }
  }

  return (
    <div className="user-list">
      <div className="px-2">
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <h3 className="text-discord-light text-xs font-semibold uppercase tracking-wide">
              В сети — {onlineUsers.filter(u => u.status === 'online').length}
            </h3>
          </div>
          
          <div className="space-y-0.5">
            {onlineUsers
              .filter(user => user.status === 'online')
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center px-2 py-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-discord-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-darker ${getStatusColor(user.status)}`}></div>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="text-sm text-white font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500">{getStatusText(user.status)}</div>
                  </div>
                  
                  {user.isMuted && (
                    <MicOff className="h-4 w-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  {user.isDeafened && (
                    <Headphones className="h-4 w-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <h3 className="text-discord-light text-xs font-semibold uppercase tracking-wide">
              Отошли — {onlineUsers.filter(u => u.status === 'away').length}
            </h3>
          </div>
          
          <div className="space-y-0.5">
            {onlineUsers
              .filter(user => user.status === 'away')
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center px-2 py-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-darker ${getStatusColor(user.status)}`}></div>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="text-sm text-gray-400 font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500">{getStatusText(user.status)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-2 py-1">
            <h3 className="text-discord-light text-xs font-semibold uppercase tracking-wide">
              Не беспокоить — {onlineUsers.filter(u => u.status === 'dnd').length}
            </h3>
          </div>
          
          <div className="space-y-0.5">
            {onlineUsers
              .filter(user => user.status === 'dnd')
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center px-2 py-1.5 rounded hover:bg-discord-light hover:bg-opacity-10 cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-darker ${getStatusColor(user.status)}`}></div>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="text-sm text-gray-400 font-medium">{user.username}</div>
                    <div className="text-xs text-gray-500">{getStatusText(user.status)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
