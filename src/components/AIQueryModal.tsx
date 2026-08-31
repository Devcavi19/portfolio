import React, { useState, useEffect, useRef } from 'react';
import {
  FiX,
  FiSend,
  FiArrowRight,
  FiTerminal,
  FiZap,
  FiSearch
} from 'react-icons/fi';
import { profile } from '../data/profile';

interface AIQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'main' | 'blogs' | 'devices', sectionId?: string) => void;
}

interface QAAnswer {
  reply: string;
  sectionId?: string;
  viewId?: 'main' | 'blogs' | 'devices';
  actionText?: string;
  actionUrl?: string;
  tags?: string[];
}

const PRESET_QUESTIONS = [
  "What RAG & AI systems has Herald built?",
  "Tell me about Herald's 100/100 Lighthouse Shopify theme.",
  "What is Herald's academic background & GWA?",
  "What experience does he have with Naga City Govt?",
  "What certifications and skills does Herald possess?"
];

const getAIResponse = (query: string): QAAnswer => {
  const q = query.toLowerCase();

  if (q.includes('rag') || q.includes('ai') || q.includes('llm') || q.includes('qdrant') || q.includes('vector') || q.includes('thesis') || q.includes('chatbot')) {
    return {
      reply: `Herald specializes in Applied AI & NLP Engineering. He co-developed an award-winning RAG Chatbot (Best Paper & Presenter at 9th Bicol ICT Research Colloquium) using FAISS, LangChain, and Gemini 2.5 Flash for thesis retrieval at CSPC. Additionally, during his Software Developer Internship at Naga City Govt, he built and deployed a production WordPress RAG plugin integrated with Qdrant vector search and multi-LLM routing (Gemini, OpenAI, Mistral).`,
      sectionId: 'projects',
      viewId: 'main',
      actionText: 'View RAG Project Details',
      tags: ['RAG Architecture', 'Vector Search', 'Multi-LLM', 'Best Paper Award']
    };
  }

  if (q.includes('shopify') || q.includes('loam') || q.includes('lighthouse') || q.includes('performance') || q.includes('liquid')) {
    return {
      reply: `Herald architected 'Loam', a custom Shopify furniture storefront built on Liquid and vanilla JS. It achieved 100/100 Lighthouse scores across Performance, Accessibility, Best Practices, and SEO. Key features include 'Shop the Room' interactive hotspots via AJAX Cart API and admin-editable metafields.`,
      sectionId: 'projects',
      viewId: 'main',
      actionText: 'View Loam Shopify Project',
      tags: ['Shopify Liquid', '100/100 Lighthouse', 'AJAX Cart API']
    };
  }

  if (q.includes('education') || q.includes('gwa') || q.includes('school') || q.includes('cspc') || q.includes('degree') || q.includes('college')) {
    return {
      reply: `Herald graduated with a Bachelor's Degree in Computer Science from Camarines Sur Polytechnic Colleges (2022–2026) with an outstanding Academic GWA of 1.5. His capstone thesis focused on retrieval-augmented generation for literature search and library thesis retrieval.`,
      sectionId: 'education',
      viewId: 'main',
      actionText: 'View Academic Credentials',
      tags: ['BS Computer Science', '1.5 GWA', 'CSPC']
    };
  }

  if (q.includes('naga') || q.includes('intern') || q.includes('government') || q.includes('work') || q.includes('experience') || q.includes('job')) {
    return {
      reply: `As a Software Developer Intern at City Government of Naga (I-Governance Office, Feb-Mar 2026), Herald engineered a production RAG chatbot plugin using PHP, WordPress, Qdrant Vector Store, and Supabase. He implemented prompt-injection mitigations, SSRF validation, rate limiting, and dual-write chat history fallback.`,
      sectionId: 'experience',
      viewId: 'main',
      actionText: 'View Work Experience',
      tags: ['Naga City Govt', 'WordPress Plugin', 'Supabase', 'AI Security']
    };
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('react') || q.includes('certif') || q.includes('tool')) {
    return {
      reply: `Herald's technical stack spans Python, React, TypeScript, PHP, SQL, Supabase, Qdrant/FAISS, and Flask. He holds 6+ industry certifications including GitHub Foundations, GitHub Copilot Certification, OCI Generative AI Professional '25, IBM AI Fundamentals, and Cisco Data Science Essentials.`,
      sectionId: 'skills',
      viewId: 'main',
      actionText: 'View Skills & Tech Stack',
      tags: ['Python', 'React', 'TypeScript', 'GitHub Copilot Cert', 'OCI GenAI']
    };
  }

  if (q.includes('award') || q.includes('vibe') || q.includes('champion') || q.includes('colloquium') || q.includes('winner')) {
    return {
      reply: `Herald won 1st Place Champion at the AI4AI FAIR Vibe Coding Competition (June 2026) at Albay Institute for AI. He also won Best Paper and Best Presenter at the 9th Bicol ICT Research Colloquium for his RAG thesis work.`,
      sectionId: 'awards',
      viewId: 'main',
      actionText: 'View Awards & Honors',
      tags: ['Vibe Coding Champion', 'Best Paper', 'Best Presenter']
    };
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('resume') || q.includes('github') || q.includes('linkedin') || q.includes('location')) {
    return {
      reply: `Herald is based in Bicol, Philippines (${profile.location}) and is available for hire for Full-Stack and AI Developer roles. You can contact him directly at heraldcarlavila@gmail.com, or view his résumé and GitHub profile.`,
      actionText: 'Send Email to Herald',
      actionUrl: `mailto:${profile.email}`,
      tags: ['Available for Hire', 'Bicol PH', 'Full-Stack & AI']
    };
  }

  // Fallback answer
  return {
    reply: `Herald Carl Avila is a Computer Science graduate (GWA 1.5) specializing in Applied AI/NLP Engineering, RAG Architectures, and Full-Stack web development. He has shipped production RAG chatbots for city government clients and won 1st place in AI vibe coding competitions.`,
    sectionId: 'overview',
    viewId: 'main',
    actionText: 'Explore Portfolio Overview',
    tags: ['Applied AI', 'Full-Stack Developer', 'RAG Specialist']
  };
};

export const AIQueryModal: React.FC<AIQueryModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [activeAnswer, setActiveAnswer] = useState<QAAnswer | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveAnswer(null);
      setTypedText('');
      setIsTyping(false);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleAsk = (userQuery: string) => {
    if (!userQuery.trim()) return;
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    setQuery(userQuery);
    const result = getAIResponse(userQuery);
    setActiveAnswer(result);
    setIsTyping(true);
    setTypedText('');

    // Stream text animation
    let index = 0;
    const fullText = result.reply;
    typingTimerRef.current = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 2));
        index += 2;
      } else {
        setTypedText(fullText);
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 12);
  };

  const handleActionClick = () => {
    if (!activeAnswer) return;
    onClose();

    if (activeAnswer.actionUrl) {
      window.open(activeAnswer.actionUrl, '_blank');
    } else if (activeAnswer.sectionId || activeAnswer.viewId) {
      onNavigate(activeAnswer.viewId || 'main', activeAnswer.sectionId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-responsive" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="modal-card-responsive"
        style={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <div style={styles.aiBadge}>
              <FiZap size={16} style={{ color: '#7c3aed' }} />
              <span style={styles.aiBadgeText}>Portfolio RAG Assistant</span>
            </div>
            <span style={styles.kbdHint}>
              Press <kbd style={styles.kbd}>Esc</kbd> to exit
            </span>
          </div>

          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close AI Assistant Modal"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          style={styles.form}
        >
          <div style={styles.inputWrapper}>
            <FiSearch size={18} style={{ color: 'var(--text-muted)', marginLeft: '0.85rem' }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask anything about Herald's projects, RAG experience, or tech stack..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.input}
            />
            <button
              type="submit"
              className="btn-primary"
              style={styles.sendBtn}
              aria-label="Submit Query"
            >
              <FiSend size={14} />
            </button>
          </div>
        </form>

        {/* Quick Question Chips */}
        {!activeAnswer && (
          <div style={styles.presetSection}>
            <div style={styles.presetLabel}>SUGGESTED QUESTIONS:</div>
            <div style={styles.presetGrid}>
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(q)}
                  style={styles.presetChip}
                >
                  <FiZap size={12} style={{ color: '#7c3aed' }} />
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Answer Stream Output */}
        {activeAnswer && (
          <div style={styles.answerContainer}>
            <div style={styles.answerHeader}>
              <FiTerminal size={15} style={{ color: '#7c3aed' }} />
              <span style={styles.answerHeaderTitle}>AI SYNTHESIS RESPONSE</span>
              {isTyping && <span className="dot-green" title="Indexing Knowledge Base..." />}
            </div>

            <div style={styles.answerBody}>
              <p style={styles.answerText}>
                {typedText}
                {isTyping && <span style={styles.cursor}>▌</span>}
              </p>

              {activeAnswer.tags && (
                <div style={styles.tagsRow}>
                  {activeAnswer.tags.map((t, idx) => (
                    <span key={idx} className="pill-tag" style={{ fontSize: '0.72rem' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Jump Button */}
            {!isTyping && activeAnswer.actionText && (
              <div style={styles.actionRow}>
                <button
                  onClick={handleActionClick}
                  className="btn-primary"
                  style={styles.actionBtn}
                >
                  {activeAnswer.actionText} <FiArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  modalCard: {
    maxWidth: '680px',
    backgroundColor: '#ffffff',
    border: '1px solid var(--border-color)',
    borderRadius: '14px',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  aiBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    backgroundColor: '#f3e8ff',
    border: '1px solid #d8b4fe',
    padding: '0.25rem 0.65rem',
    borderRadius: '20px',
  },
  aiBadgeText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#6b21a8',
  },
  kbdHint: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
  },
  kbd: {
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    padding: '0.1rem 0.35rem',
    fontSize: '0.7rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: '1.25rem',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '0.25rem',
    transition: 'border-color 0.15s ease',
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '0.65rem 0.85rem',
    fontSize: '0.92rem',
    fontFamily: 'var(--font-sans)',
    color: 'var(--text-primary)',
    outline: 'none',
  },
  sendBtn: {
    padding: '0.55rem 0.85rem',
    minHeight: '36px',
    borderRadius: '7px',
  },
  presetSection: {
    marginTop: '0.5rem',
  },
  presetLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    marginBottom: '0.65rem',
  },
  presetGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.45rem',
  },
  presetChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    padding: '0.6rem 0.85rem',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  answerContainer: {
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '1.25rem',
  },
  answerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  answerHeaderTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
  },
  answerBody: {
    marginBottom: '1rem',
  },
  answerText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.93rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
    marginBottom: '0.85rem',
  },
  cursor: {
    color: '#7c3aed',
    marginLeft: '2px',
    animation: 'pulse 1s infinite',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '0.5rem',
  },
  actionBtn: {
    padding: '0.55rem 1.1rem',
    fontSize: '0.82rem',
  },
};

export default AIQueryModal;
