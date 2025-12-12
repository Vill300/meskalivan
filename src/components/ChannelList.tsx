import React from 'react'
import { Hash, Volume2 } from 'lucide-react'

interface Channel {
  id: string
  name: string
  type: 'text' | 'voice'
}

interface ChannelListProps {
  selectedChannel: string
  onChannelSelect: (channelId: string) => void
}

const ChannelList: React.FC<ChannelListProps> = ({ selectedChannel, onChannelSelect }) => {
  const channels: Channel[] = [
    { id: 'general', name: 'общий', type: 'text' },
    { id: 'random', name: 'случайный', type: 'text' },
    { id: 'games', name: 'игры', type: 'text' },
    { id: 'music', name: 'музыка', type: 'voice' },
    { id: 'voice1', name: 'Голосовой канал 1', type: 'voice' },
  ]

  return (
    <div className="p-2">
      <div className="mb-4">
        <h3 className="text-discord-light text-xs font-semibold uppercase tracking-wide mb-2">
          Текстовые каналы
        </h3>
        <div className="space-y-0.5">
          {channels
            .filter(channel => channel.type === 'text')
            .map((channel) => (
              <button
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                className={`w-full flex items-center px-2 py-1.5 rounded text-left hover:bg-discord-light hover:bg-opacity-10 transition-colors duration-150 ${
                  selectedChannel === channel.id ? 'bg-discord-light bg-opacity-10 text-white' : 'text-discord-light'
                }`}
              >
                <Hash className="h-4 w-4 mr-2" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-discord-light text-xs font-semibold uppercase tracking-wide mb-2">
          Голосовые каналы
        </h3>
        <div className="space-y-0.5">
          {channels
            .filter(channel => channel.type === 'voice')
            .map((channel) => (
              <button
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                className={`w-full flex items-center px-2 py-1.5 rounded text-left hover:bg-discord-light hover:bg-opacity-10 transition-colors duration-150 ${
                  selectedChannel === channel.id ? 'bg-discord-light bg-opacity-10 text-white' : 'text-discord-light'
                }`}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ChannelList