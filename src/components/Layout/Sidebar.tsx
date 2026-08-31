import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiFolder,
  FiCpu,
  FiAward,
  FiFileText,
  FiMonitor,
  FiMenu,
  FiX,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUpRight
} from 'react-icons/fi';
import { profile } from '../../data/profile';

const contentNavItems = [
  { id: 'overview', label: 'Overview', icon: FiUser },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'experience', label: 'Work Experience', icon: FiBriefcase },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'skills', label: 'Skills & Tech Stack', icon: FiCpu },
  { id: 'awards', label: 'Awards', icon: FiAward },
];

const otherNavItems = [
  { id: 'blogs', label: 'Blogs', icon: FiFileText, page: 'blogs' as const },
  { id: 'devices', label: 'Devices', icon: FiMonitor, page: 'devices' as const },
];

interface SidebarProps {
  activeView: 'main' | 'blogs' | 'devices';
  onNavigate: (view: 'main' | 'blogs' | 'devices', sectionId?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll lock and Escape key listener for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (activeView !== 'main') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = contentNavItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(contentNavItems[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(contentNavItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleContentNav = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    onNavigate('main', id);
  };

  const handleOtherNav = (page: 'blogs' | 'devices') => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <>
      {/* Mobile Sticky Header */}
      <header className="mobile-header">
        <div style={styles.mobileBrand}>
          <img src="/me1.png" alt={profile.name} style={styles.avatarMini} />
          <div>
            <div style={styles.mobileName}>{profile.name}</div>
            <div style={styles.mobileRole}>Full-Stack & AI Developer</div>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={styles.mobileToggleBtn}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Desktop & Mobile Drawer Sidebar */}
      <aside className={`sidebar-desktop ${mobileOpen ? 'mobile-open' : ''}`}>
        <div style={styles.sidebarInner}>
          {/* Profile Header */}
          <div style={styles.profileHeader}>
            <div style={styles.avatarWrapper}>
              <img src="/me1.png" alt={profile.name} style={styles.avatar} />
              <span style={styles.statusDot} title="Available for roles">
                <span className="dot-green" />
              </span>
            </div>
            
            <h1 style={styles.name}>{profile.name}</h1>
            <p style={styles.role}>Full-Stack & AI Developer</p>
            <div style={styles.location}>📍 {profile.location}</div>
          </div>

          {/* Navigation Links */}
          <nav style={styles.navMenu} aria-label="Main Navigation">
            {/* CONTENTS Group */}
            <div style={styles.navHeaderLabel}>CONTENTS</div>
            {contentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === 'main' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleContentNav(item.id)}
                  style={{
                    ...styles.navLink,
                    ...(isActive ? styles.navLinkActive : {})
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? '#09090b' : '#71717a' }} />
                  <span style={styles.navLabel}>{item.label}</span>
                </button>
              );
            })}

            {/* OTHERS Group */}
            <div style={{ ...styles.navHeaderLabel, marginTop: '1.25rem' }}>OTHERS</div>
            {otherNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.page;
              return (
                <button
                  key={item.id}
                  onClick={() => handleOtherNav(item.page)}
                  style={{
                    ...styles.navLink,
                    ...(isActive ? styles.navLinkActive : {})
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? '#09090b' : '#71717a' }} />
                  <span style={styles.navLabel}>{item.label}</span>
                  <span style={styles.badgeNew}>Page</span>
                </button>
              );
            })}
          </nav>

          {/* Footer Socials & Resume */}
          <div style={styles.sidebarFooter}>
            <a
              href="/Herald_Avila_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={styles.resumeBtn}
            >
              Download Résumé <FiArrowUpRight size={14} />
            </a>

            <div style={styles.socialRow}>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialBtn}
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FiGithub size={17} />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialBtn}
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FiLinkedin size={17} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                style={styles.socialBtn}
                aria-label="Send Email"
                title="Email Herald"
              >
                <FiMail size={17} />
              </a>
            </div>

            <div style={styles.copyright}>
              © {new Date().getFullYear()} Herald Carl Avila
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mobileHeader: {
    display: 'none',
    position: 'sticky',
    top: 0,
    zIndex: 900,
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border-color)',
    padding: '0.75rem 1.25rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatarMini: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid var(--border-color)',
  },
  mobileName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '0.98rem',
    color: 'var(--text-primary)',
  },
  mobileRole: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  mobileToggleBtn: {
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  sidebar: {
    width: 'var(--sidebar-width)',
    height: '100vh',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--bg-sidebar)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    zIndex: 800,
  },
  sidebarInner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1.75rem 1.25rem',
    overflowY: 'auto',
  },
  profileHeader: {
    marginBottom: '1.5rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid var(--border-color)',
  },
  avatarWrapper: {
    position: 'relative',
    width: '64px',
    height: '64px',
    marginBottom: '0.85rem',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--border-color)',
  },
  statusDot: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    padding: '2px',
    display: 'flex',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '0.2rem',
    lineHeight: 1.2,
  },
  role: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    marginBottom: '0.4rem',
  },
  location: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navHeaderLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    paddingLeft: '0.5rem',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.55rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.85rem',
    fontWeight: 500,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    width: '100%',
  },
  navLinkActive: {
    backgroundColor: '#e4e4e7',
    color: '#09090b',
    fontWeight: 700,
  },
  navLabel: {
    flex: 1,
  },
  badgeNew: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-mono)',
    padding: '0.1rem 0.4rem',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-muted)',
  },
  sidebarFooter: {
    paddingTop: '1.25rem',
    marginTop: 'auto',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  resumeBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '0.55rem 0.85rem',
    fontSize: '0.82rem',
  },
  socialRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  socialBtn: {
    flex: 1,
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
  },
  copyright: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  mobileBackdrop: {
    display: 'none',
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 750,
  },
};

export default Sidebar;
