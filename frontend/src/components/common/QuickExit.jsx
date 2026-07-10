import React, { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

const EXIT_URL = 'https://weather.com'

export default function QuickExit() {
  const exit = useCallback(() => {
    try {
      sessionStorage.clear()
      localStorage.removeItem('aisakhi_messages')
      localStorage.removeItem('aisakhi_chat_history')
    } catch (e) {
      // ignore storage errors, exiting is the priority
    }
    window.location.replace(EXIT_URL)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') exit()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [exit])

  return (
    <button
      type="button"
      className="quick-exit-btn"
      onClick={exit}
      aria-label="Quick exit — leave this site immediately"
      title="Quick exit (Esc)"
    >
      <X size={18} strokeWidth={2.5} />
    </button>
  )
}