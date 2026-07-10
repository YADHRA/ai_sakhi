import React from 'react'
import { AlertTriangle, RefreshCw, X } from 'lucide-react'

/**
 * ErrorBanner
 * Shows a dismissible, retry-capable error message.
 * Used when the backend is unreachable or returns an error.
 */
export default function ErrorBanner({ message, onRetry, onDismiss }) {
  if (!message) return null

  return (
    <div className="error-banner fade-up" role="alert">
      <div className="error-banner-icon">
        <AlertTriangle size={18} />
      </div>

      <div className="error-banner-body">
        <p className="error-banner-title">Something didn't go through</p>
        <p className="error-banner-message">{message}</p>
      </div>

      <div className="error-banner-actions">
        {onRetry && (
          <button className="error-banner-btn" onClick={onRetry} type="button">
            <RefreshCw size={15} />
            Retry
          </button>
        )}
        {onDismiss && (
          <button
            className="error-banner-close"
            onClick={onDismiss}
            type="button"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}