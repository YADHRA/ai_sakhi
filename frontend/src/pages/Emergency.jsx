import { useState } from 'react';

const HELPLINES = [
  {
    id: 'women-helpline',
    name: 'Women Helpline (All India)',
    number: '181',
    description: '24x7 toll-free support for women in distress.',
    icon: '📞',
  },
  {
    id: 'police',
    name: 'Police Emergency',
    number: '112',
    description: 'National emergency number for immediate police response.',
    icon: '🚨',
  },
  {
    id: 'domestic-abuse',
    name: 'Domestic Violence Helpline',
    number: '181',
    description: 'Confidential help for domestic abuse situations.',
    icon: '🏠',
  },
  {
    id: 'child-helpline',
    name: 'Child Helpline',
    number: '1098',
    description: 'For emergencies involving minors.',
    icon: '🧒',
  },
  {
    id: 'legal-aid',
    name: 'NALSA Legal Aid',
    number: '15100',
    description: 'Free legal aid services helpline.',
    icon: '⚖️',
  },
  {
    id: 'cyber-crime',
    name: 'Cyber Crime Helpline',
    number: '1930',
    description: 'Report online harassment, fraud, or cyber abuse.',
    icon: '💻',
  },
];

const SAFETY_STEPS = [
  {
    title: 'Get to safety first',
    detail: 'If you are in immediate danger, move to a safe, public, or well-lit location before doing anything else.',
  },
  {
    title: 'Call for help',
    detail: 'Use the numbers below, or ask a trusted person nearby to call on your behalf.',
  },
  {
    title: 'Preserve evidence',
    detail: 'Save messages, photos, medical records, or witness details if it is safe to do so. Do not delete anything.',
  },
  {
    title: 'Reach out to someone you trust',
    detail: 'Tell a friend, family member, or neighbor where you are and what is happening.',
  },
  {
    title: 'Talk to AiSakhi when you are safe',
    detail: 'Once you are secure, the chat assistant can help you understand your legal options and next steps.',
  },
];

export default function Emergency() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Clipboard API unavailable; the tel: link still works as a fallback.
    }
  };

  return (
    <div className="emergency-page">
      <header className="emergency-hero">
        <div className="emergency-hero-inner">
          <span className="emergency-hero-badge">🆘 Emergency Help</span>
          <h1>You are not alone. Help is one call away.</h1>
          <p>
            If you are in immediate danger, please call <strong>112</strong> right now.
            Below you'll find helplines and steps you can take to stay safe.
          </p>
          <a href="tel:112" className="emergency-hero-cta">
            Call 112 Now
          </a>
        </div>
      </header>

      <main className="emergency-body">
        <section className="emergency-section">
          <h2>Helplines</h2>
          <div className="emergency-helpline-grid">
            {HELPLINES.map((h) => (
              <div key={h.id} className="emergency-helpline-card">
                <span className="emergency-helpline-icon" aria-hidden="true">
                  {h.icon}
                </span>
                <div className="emergency-helpline-info">
                  <h3>{h.name}</h3>
                  <p>{h.description}</p>
                </div>
                <div className="emergency-helpline-actions">
                  <a href={`tel:${h.number}`} className="emergency-helpline-number">
                    {h.number}
                  </a>
                  <button
                    type="button"
                    className="emergency-helpline-copy"
                    onClick={() => handleCopy(h.id, h.number)}
                  >
                    {copiedId === h.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="emergency-section">
          <h2>What to do right now</h2>
          <ol className="emergency-steps">
            {SAFETY_STEPS.map((step, i) => (
              <li key={step.title} className="emergency-step">
                <span className="emergency-step-index">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="emergency-section emergency-note">
          <h2>A quiet reminder</h2>
          <p>
            AiSakhi is here for guidance and information, but it cannot dispatch
            emergency services. In any situation involving immediate danger,
            please contact the police or a helpline directly.
          </p>
        </section>
      </main>
    </div>
  );
}