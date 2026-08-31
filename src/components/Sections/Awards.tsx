import React from 'react';
import { FiAward } from 'react-icons/fi';
import { profile } from '../../data/profile';

const Awards: React.FC = () => {
  return (
    <section id="awards" className="portfolio-section">
      <div className="section-label">06 / AWARDS</div>
      <h2 className="section-title">Honors & Recognitions</h2>

      <div className="responsive-grid-cards">
        {profile.awards.map((award, index) => (
          <div key={index} className="clean-card" style={styles.card}>
            <div style={styles.badgeRow}>
              <div style={styles.awardIcon}>
                <FiAward size={20} />
              </div>
              <span className="pill-tag-dark">{award.date}</span>
            </div>

            <h3 style={styles.title}>{award.title}</h3>
            <div style={styles.organization}>Issued by: {award.entry}</div>
            
            {award.description && (
              <p style={styles.description}>{award.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
    gap: '1.35rem',
  },
  card: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  badgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  awardIcon: {
    width: '38px',
    height: '38px',
    backgroundColor: 'var(--bg-muted)',
    color: 'var(--text-primary)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '1.18rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '0.25rem',
  },
  organization: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.85rem',
  },
  description: {
    fontSize: '0.9rem',
    lineHeight: 1.55,
    color: 'var(--text-primary)',
    marginTop: 'auto',
  },
};

export default Awards;
