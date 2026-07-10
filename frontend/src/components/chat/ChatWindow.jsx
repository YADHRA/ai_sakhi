import React, { useEffect, useRef } from 'react'
import ChatBubble from './ChatBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

/**
 * ChatWindow
 * Scrollable message list. Auto-scrolls to the latest message
 * whenever messages change or the assistant is typing.
 */
export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isLoading])

  return (
    <div className="chat-window">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}

      {isLoading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}