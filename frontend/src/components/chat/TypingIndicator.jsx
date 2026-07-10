import React from 'react'

/**
 * TypingIndicator
 * Three-dot "AiSakhi is thinking" bubble shown while waiting for the backend.
 */
export default function TypingIndicator() {
  return (
    <div className="chat-row chat-row-assistant fade-up" aria-live="polite" aria-label="AiSakhi is typing">
      <div className="chat-avatar chat-avatar-assistant">✦</div>
      <div className="typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}