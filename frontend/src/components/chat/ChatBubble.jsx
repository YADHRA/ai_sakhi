import React from 'react'
import {
  Scale,
  ShieldCheck,
  ListChecks,
  FileSearch,
  PhoneCall,
  Sparkles,
} from 'lucide-react'

/**
 * ChatBubble
 * Renders a single message. Assistant messages can be either plain text
 * or a "structured" AI response (laws, rights, action plan, evidence, helplines).
 */
export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-row ${isUser ? 'chat-row-user' : 'chat-row-assistant'} fade-up`}>
      <div className={`chat-avatar ${isUser ? 'chat-avatar-user' : 'chat-avatar-assistant'}`}>
        {isUser ? 'You' : '✦'}
      </div>

      <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}>
        {message.type === 'structured' ? (
          <StructuredResponse content={message.content} data={message.raw} />
        ) : (
          <p className="bubble-text">{message.content}</p>
        )}
      </div>
    </div>
  )
}

function StructuredResponse({ content, data }) {
  const { laws, rights, actionPlan, evidence, helplines } = data || {}

  return (
    <div className="structured-response">
      {content && <p className="bubble-text structured-summary">{content}</p>}

      {Array.isArray(rights) && rights.length > 0 && (
        <Section icon={<ShieldCheck size={16} />} title="Your Rights" tone="purple">
          <ul className="tag-list">
            {rights.map((r, i) => (
              <li key={i} className="tag-pill">{r}</li>
            ))}
          </ul>
        </Section>
      )}

      {Array.isArray(laws) && laws.length > 0 && (
        <Section icon={<Scale size={16} />} title="Applicable Laws" tone="purple">
          <div className="law-list">
            {laws.map((law, i) => (
              <div key={i} className="law-card">
                <div className="law-card-head">
                  <span className="law-title">{law.title}</span>
                  {law.section && <span className="law-section">{law.section}</span>}
                  {law.confidence && law.confidence !== 'certain' && (
                    <span className={`law-confidence law-confidence-${law.confidence}`}>
                      {law.confidence}
                    </span>
                  )}
                </div>
                {law.description && <p className="law-desc">{law.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {Array.isArray(actionPlan) && actionPlan.length > 0 && (
        <Section icon={<ListChecks size={16} />} title="Recommended Action Plan" tone="success">
          <ol className="step-list">
            {actionPlan.map((item, i) => {
              const text = typeof item === 'string' ? item : item.step
              const urgency = typeof item === 'string' ? null : item.urgency_bucket
              return (
                <li key={i} className="step-item">
                  <span className="step-number">{i + 1}</span>
                  <span>{text}</span>
                  {urgency && <span className={`step-urgency step-urgency-${urgency}`}>{urgency.replace('_', ' ')}</span>}
                </li>
              )
            })}
          </ol>
        </Section>
      )}

      {Array.isArray(evidence) && evidence.length > 0 && (
        <Section icon={<FileSearch size={16} />} title="Evidence To Collect" tone="neutral">
          <ul className="check-list">
            {evidence.map((item, i) => (
              <li key={i} className="check-item">{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {Array.isArray(helplines) && helplines.length > 0 && (
        <Section icon={<PhoneCall size={16} />} title="Helplines You Can Call" tone="emergency">
          <div className="helpline-list">
            {helplines.map((h, i) => (
              <a key={i} href={`tel:${h.number}`} className="helpline-chip">
                <PhoneCall size={13} />
                <span>{h.name}</span>
                <strong>{h.number}</strong>
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({ icon, title, tone = 'neutral', children }) {
  return (
    <div className={`response-section tone-${tone}`}>
      <div className="response-section-head">
        <span className="response-section-icon">{icon}</span>
        <span className="response-section-title">{title}</span>
      </div>
      {children}
    </div>
  )
}