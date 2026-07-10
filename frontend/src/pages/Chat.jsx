import { useEffect, useRef } from 'react';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import ErrorBanner from '../components/common/ErrorBanner';
import useAiSakhi from '../hooks/useAiSakhi';
import logo from '../assets/logo.png';

export default function Chat() {
  const { messages, sendMessage, isLoading, error, clearError } = useAiSakhi();
  const hasGreeted = useRef(false);

  useEffect(() => {
    // Optional: seed a friendly opening message once, only if the
    // conversation is empty when the page first mounts.
    if (!hasGreeted.current && messages.length === 0) {
      hasGreeted.current = true;
    }
  }, [messages.length]);

  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    sendMessage(text.trim());
  };

  return (
    <div className="chat-page">
      <header className="chat-page-header">
        <div className="chat-page-header-inner">
          <div className="chat-page-title">
            <img src={logo} alt="" aria-hidden="true" className="chat-page-avatar" />
            <div>
              <h1>AiSakhi</h1>
              <p>Your confidential legal companion</p>
            </div>
          </div>
          <a href="/emergency" className="chat-page-emergency-link">
            Need urgent help?
          </a>
        </div>
      </header>

      <main className="chat-page-body">
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={clearError}
          />
        )}

        <ChatWindow messages={messages} />

        {isLoading && <TypingIndicator />}
      </main>

      <footer className="chat-page-footer">
        <ChatInput onSend={handleSend} disabled={isLoading} />
        <p className="chat-page-disclaimer">
          AiSakhi provides general legal information, not a substitute for a licensed lawyer.
        </p>
      </footer>
    </div>
  );
}