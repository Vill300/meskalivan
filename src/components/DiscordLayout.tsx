import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ChannelList from './ChannelList'
import ChatArea from './ChatArea'
import UserList from './UserList'
import UserPanel from './UserPanel'

const DiscordLayout: React.FC = () => {
  const { user, signOut } = useAuth()
  const [selectedChannel, setSelectedChannel] = useState('general')

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="h-screen w-screen bg-discord-dark flex">
      {/* Server List */}
      <div className="bg-discord-darkest w-18 flex flex-col items-center py-3 space-y-2">
        <div className="w-12 h-12 bg-discord-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:rounded-xl transition-all duration-200">
          M
        </div>
        <div className="w-8 h-0.5 bg-discord-light rounded-full"></div>
        <div className="w-12 h-12 bg-discord-darker rounded-2xl flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:rounded-xl transition-all duration-200">
          +
        </div>
      </div>

      {/* Channel List */}
      <div className="sidebar w-60 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-lg">Meskalivan Server</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ChannelList 
            selectedChannel={selectedChannel} 
            onChannelSelect={setSelectedChannel}
          />
        </div>
        
        <UserPanel user={user} onSignOut={handleSignOut} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <ChatArea channelId={selectedChannel} />
        <UserList />
      </div>
    </div>
  )
}

export default DiscordLayout
