
import { useState, useEffect } from 'react'
import { Chat, Message } from './lib/types'
import { ChatMessage } from './components/chat-message'
import { ChatInput } from './components/chat-input'

function App() {
  const [chat, setChat] = useState<Chat>(() => {
    const saved = localStorage.getItem('chat')
    return saved ? JSON.parse(saved) : {
      id: '1',
      title: 'New Chat',
      messages: []
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chat))
  }, [chat])

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    }

    setChat(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }))

    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Hello! I'm a simulated AI assistant. I can help you with various tasks, answer questions, and engage in conversations. What would you like to discuss?"
      }

      setChat(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage]
      }))
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[100vh] bg-background text-foreground">
      <header className="border-b p-4">
        <h1 className="font-semibold">Chat Interface</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {chat.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Start a conversation...</p>
          </div>
        ) : (
          chat.messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </main>

      <footer className="border-t">
        <ChatInput onSend={handleSend} disabled={loading} />
      </footer>
    </div>
  )
}

export default App