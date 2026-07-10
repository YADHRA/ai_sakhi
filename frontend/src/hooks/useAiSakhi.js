import { useCallback, useRef, useState } from 'react'
import { sendChatMessage } from '../services/api.js'

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`

/**
 * useAiSakhi
 * Encapsulates all chat state + logic for talking to the AiSakhi backend:
 * messages, loading state, error state, and send/retry/clear actions.
 */
export function useAiSakhi() {
  const [messages, setMessages] = useState([
    {
      id: nextId(),
      role: 'assistant',
      type: 'text',
      content:
        "Namaste 🙏 I'm AiSakhi, your AI legal companion. Tell me what's happening — in your own words — and I'll help you understand your rights, the laws that apply, and what steps you can take next.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const lastMessageRef = useRef(null)

  const buildHistory = useCallback((msgList) => {
    return msgList
      .filter((m) => m.type === 'text' || m.type === 'structured')
      .map((m) => ({
        role: m.role,
        content: m.type === 'structured' ? m.raw?.reply || '' : m.content,
      }))
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setError(null)
      lastMessageRef.current = trimmed

      const userMsg = { id: nextId(), role: 'user', type: 'text', content: trimmed }
      setMessages((prev) => [...prev, userMsg])
      setIsLoading(true)

      try {
        const history = buildHistory(messages)
        const data = await sendChatMessage(trimmed, history)

        const isStructured =
          data && (data.laws || data.rights || data.actionPlan || data.evidence || data.helplines)

        const assistantMsg = {
          id: nextId(),
          role: 'assistant',
          type: isStructured ? 'structured' : 'text',
          content: data?.reply || "Here's what I found.",
          raw: data,
        }

        setMessages((prev) => [...prev, assistantMsg])
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, buildHistory]
  )

  const retryLast = useCallback(() => {
    if (lastMessageRef.current) {
      sendMessage(lastMessageRef.current)
    }
  }, [sendMessage])

  const clearError = useCallback(() => setError(null), [])

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: nextId(),
        role: 'assistant',
        type: 'text',
        content: "Chat cleared. What would you like help with?",
      },
    ])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLast,
    clearError,
    clearChat,
  }
}

export default useAiSakhi