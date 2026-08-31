import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Overview from './components/Sections/Overview';
import Education from './components/Sections/Education';
import WorkExperience from './components/Sections/WorkExperience';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Awards from './components/Sections/Awards';
import Blogs from './components/Sections/Blogs';
import Devices from './components/Sections/Devices';
import AIQueryModal from './components/AIQueryModal';
import { FiZap } from 'react-icons/fi';
import './styles/global.css';

type ActiveView = 'main' | 'blogs' | 'devices';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'blogs') return 'blogs';
      if (hash === 'devices') return 'devices';
    }
    return 'main';
  });

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Fix 1: Hash / Routing Listeners (popstate & hashchange sync for browser Back/Forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'blogs') {
        setActiveView('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'devices') {
        setActiveView('devices');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveView('main');
        if (hash) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const yOffset = -20;
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Fix 5: Keyboard shortcut (Cmd+K / Ctrl+K) listener to toggle AI Query Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAiModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setActiveView(view);
    
    if (view === 'blogs') {
      window.location.hash = 'blogs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'devices') {
      window.location.hash = 'devices';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetHash = sectionId || 'overview';
      window.location.hash = targetHash;
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const yOffset = -20;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar with CONTENTS and OTHERS groups */}
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      {/* Main View Area */}
      <main className="main-content">
        {activeView === 'main' && (
          <>
            <Overview onOpenAiModal={() => setIsAiModalOpen(true)} />
            <Education />
            <WorkExperience />
            <Projects />
            <Skills />
            <Awards />
          </>
        )}

        {activeView === 'blogs' && (
          <Blogs onBack={() => handleNavigate('main', 'overview')} />
        )}

        {activeView === 'devices' && (
          <Devices onBack={() => handleNavigate('main', 'overview')} />
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <div className="footer-inner-responsive">
            <div>
              <div style={styles.footerTitle}>Herald Carl Avila</div>
              <div style={styles.footerSub}>Full-Stack & AI Developer · Bicol, PH</div>
            </div>
            <button
              onClick={() => handleNavigate('main', 'overview')}
              className="btn-secondary"
              style={styles.backTopBtn}
            >
              Portfolio Top ↑
            </button>
          </div>
        </footer>
      </main>

      {/* Floating AI Assistant Trigger Widget */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        style={styles.floatingAiBtn}
        aria-label="Ask Portfolio AI"
        title="Ask Portfolio AI Assistant (Cmd+K)"
      >
        <FiZap size={16} style={{ color: '#ffffff' }} />
        <span style={styles.floatingAiText}>Ask AI</span>
        <span style={styles.floatingKbd}>⌘K</span>
      </button>

      {/* AI Assistant Modal */}
      <AIQueryModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
  },
  footerTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
  },
  footerSub: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginTop: '0.15rem',
  },
  backTopBtn: {
    fontSize: '0.78rem',
    padding: '0.45rem 0.85rem',
  },
  floatingAiBtn: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: 900,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.65rem 1rem',
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    border: 'none',
    borderRadius: '30px',
    boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.4), 0 8px 10px -6px rgba(124, 58, 237, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },
  floatingAiText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontWeight: 700,
  },
  floatingKbd: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.1rem 0.4rem',
    borderRadius: '4px',
  },
};

export default App;
