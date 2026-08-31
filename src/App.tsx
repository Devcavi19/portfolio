import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Overview from './components/Sections/Overview';
import Education from './components/Sections/Education';
import WorkExperience from './components/Sections/WorkExperience';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Awards from './components/Sections/Awards';
import Blogs from './components/Sections/Blogs';
import Devices from './components/Sections/Devices';
import './styles/global.css';

type ActiveView = 'main' | 'blogs' | 'devices';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#blogs') return 'blogs';
      if (hash === '#devices') return 'devices';
    }
    return 'main';
  });

  const handleNavigate = (view: ActiveView, sectionId?: string) => {
    setActiveView(view);
    
    if (view === 'blogs') {
      window.location.hash = 'blogs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'devices') {
      window.location.hash = 'devices';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = sectionId || 'overview';
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
            <Overview />
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
          <div style={styles.footerInner}>
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
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
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
};

export default App;
