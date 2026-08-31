import React from 'react';
import { FiMail, FiMapPin, FiArrowDown, FiDownload, FiZap, FiCheckCircle } from 'react-icons/fi';
import { profile } from '../../data/profile';

interface OverviewProps {
  onOpenAiModal?: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onOpenAiModal }) => {
  return (
    <section id="overview" className="portfolio-section">
      <div className="section-label">01 / OVERVIEW</div>
      
      <div className="clean-card hero-card">
        <div style={styles.headerRow}>
          <div>
            <div style={styles.availabilityPill}>
              <span className="dot-green" />
              <span>Available for Hire & Roles</span>
            </div>
            
            <h1 style={styles.headline}>
              Full-Stack Developer & AI Specialist
            </h1>
            
            <p style={styles.tagline}>
              {profile.tagline}
            </p>
          </div>
        </div>

        <div style={styles.pillsRow}>
          <span className="pill-tag">
            <FiMapPin size={12} /> {profile.location}
          </span>
          <span className="pill-tag">
            🎓 BS Computer Science (CSPC)
          </span>
          <span className="pill-tag">
            <FiCheckCircle size={12} style={{ color: '#10b981' }} /> Available Remote & On-site
          </span>
          <span className="pill-tag">
            🤖 Production RAG & AI Security
          </span>
        </div>

        <div style={styles.bioBox}>
          <p style={styles.bioText}>{profile.bio}</p>
        </div>

        {/* Highlight Stats / Quick Facts Grid - Non-redundant concrete metrics */}
        <div className="stats-grid-container">
          <div style={styles.statCard}>
            <div style={styles.statVal}>1.5</div>
            <div style={styles.statLabel}>Academic GWA</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statVal}>100%</div>
            <div style={styles.statLabel}>Lighthouse Score</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statVal}>1st Place</div>
            <div style={styles.statLabel}>Vibe Coding Champion</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statVal}>6+</div>
            <div style={styles.statLabel}>Tech Certifications</div>
          </div>
        </div>

        <div className="cta-row-container">
          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="btn-primary"
              style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
            >
              <FiZap size={15} /> Ask Portfolio AI [Cmd+K]
            </button>
          )}
          <a href={`mailto:${profile.email}`} className="btn-secondary">
            <FiMail size={15} /> Contact Herald
          </a>
          <a href="#projects" className="btn-secondary">
            View Selected Projects <FiArrowDown size={14} />
          </a>
          <a
            href="/Herald_Avila_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FiDownload size={14} /> Résumé
          </a>
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  heroCard: {
    padding: '2.25rem',
  },
  headerRow: {
    marginBottom: '1.25rem',
  },
  availabilityPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#047857',
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    padding: '0.25rem 0.65rem',
    borderRadius: '20px',
    marginBottom: '0.85rem',
  },
  headline: {
    fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
    lineHeight: 1.15,
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
  },
  tagline: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
    maxWidth: '65ch',
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  bioBox: {
    padding: '1.25rem',
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  bioText: {
    fontSize: '0.94rem',
    lineHeight: 1.65,
    color: 'var(--text-primary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '0.85rem',
    marginBottom: '1.75rem',
  },
  statCard: {
    padding: '0.85rem 1rem',
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statVal: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  statLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    marginTop: '0.15rem',
  },
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
};

export default Overview;
