import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const FEATURES = [
  {
    icon: '⚖️',
    title: 'Know your rights',
    description: 'Get clear, plain-language explanations of the laws that protect you.',
  },
  {
    icon: '📝',
    title: 'Action plans',
    description: 'Step-by-step guidance on what to do next, tailored to your situation.',
  },
  {
    icon: '🔒',
    title: 'Confidential by design',
    description: 'Your conversations stay private. Ask freely, without judgment.',
  },
  {
    icon: <img src={logo} alt="" className="home-feature-icon-img" />,
    title: 'Always available',
    description: 'AiSakhi is here any time, day or night, whenever you need it.',
  },
];

const TOPICS = [
  'Domestic violence & abuse',
  'Workplace harassment',
  'Divorce & maintenance',
  'Property & inheritance rights',
  'Cyber harassment & stalking',
  'Dowry-related issues',
];

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-hero">
        <div className="home-hero-inner">
          <span className="home-hero-badge">
            <img src={logo} alt="" className="home-hero-badge-icon" />
            <span className="home-hero-badge-text">AiSakhi</span>
          </span>
          <h1>A gentle, knowledgeable friend for your legal questions.</h1>
          <p>
            AiSakhi helps women understand their legal rights, explore their
            options, and take confident next steps — in plain language, free
            of judgment.
          </p>
          <div className="home-hero-actions">
            <Link to="/chat" className="home-hero-cta-primary">
              Start a conversation
            </Link>
            <Link to="/emergency" className="home-hero-cta-secondary">
              I need urgent help
            </Link>
          </div>
        </div>
      </header>

      <main className="home-body">
        <section className="home-section">
          <h2>How AiSakhi helps</h2>
          <div className="home-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="home-feature-card">
                <span className="home-feature-icon" aria-hidden="true">
                  {f.icon}
                </span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section home-topics-section">
          <h2>Ask about topics like</h2>
          <div className="home-topics-list">
            {TOPICS.map((topic) => (
              <span key={topic} className="home-topic-chip">
                {topic}
              </span>
            ))}
          </div>
          <Link to="/chat" className="home-topics-cta">
            Ask AiSakhi about your situation →
          </Link>
        </section>

        <section className="home-section home-disclaimer">
          <h2>A quiet note</h2>
          <p>
            AiSakhi provides general legal information to help you understand
            your options. It is not a substitute for advice from a licensed
            lawyer, and in an emergency, please contact the police or a
            helpline directly.
          </p>
        </section>
      </main>
    </div>
  );
}