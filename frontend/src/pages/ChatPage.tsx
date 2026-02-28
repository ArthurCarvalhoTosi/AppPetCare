import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Search, Send, Phone, MoreVertical, Image, Smile } from 'lucide-react'

// TODO: Integrar com API real e SignalR para tempo real

const mockConversations = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'M',
    lastMessage: 'A Luna está ótima! Acabei de enviar as fotos.',
    time: '14:30',
    unread: 2,
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'J',
    lastMessage: 'Confirmado para amanhã às 10h!',
    time: '12:15',
    unread: 0,
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'A',
    lastMessage: 'Obrigada pela visita, a Mel adorou!',
    time: 'Ontem',
    unread: 0,
  },
]

const mockMessages = [
  { id: '1', senderId: 'other', text: 'Olá! Tudo bem?', time: '14:20' },
  { id: '2', senderId: 'me', text: 'Oi! Tudo sim, e você?', time: '14:22' },
  { id: '3', senderId: 'other', text: 'Estou bem! A Luna está ótima, super animada hoje!', time: '14:25' },
  { id: '4', senderId: 'other', text: 'A Luna está ótima! Acabei de enviar as fotos.', time: '14:30' },
]

export default function ChatPage() {
  const { conversationId } = useParams()
  const [selectedConversation, setSelectedConversation] = useState(conversationId || mockConversations[0].id)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const currentConversation = mockConversations.find(c => c.id === selectedConversation)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // TODO: Enviar mensagem para API
    console.log('Enviando:', message)
    setMessage('')
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
            Mensagens
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                selectedConversation === conv.id ? 'bg-primary-50' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-semibold">
              {currentConversation?.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{currentConversation?.name}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  msg.senderId === 'me'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'text-white/70' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button type="button" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
