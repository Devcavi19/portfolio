import React from 'react';
import { FiBriefcase, FiCheck, FiMapPin, FiCalendar } from 'react-icons/fi';
import { profile } from '../../data/profile';

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="portfolio-section">
      <div className="section-label">03 / WORK EXPERIENCE</div>
      <h2 className="section-title">Work Experience</h2>

      <div style={styles.list}>
        {profile.experience.map((exp, index) => (
          <div key={index} className="clean-card" style={styles.card}>
            <div style={styles.header}>
              <div>
                <div style={styles.roleRow}>
                  <FiBriefcase size={17} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                  <h3 style={styles.role}>{exp.role}</h3>
                </div>
                <div style={styles.company}>{exp.company}</div>
              </div>

              <span className="pill-tag-dark">{exp.type}</span>
            </div>

            <div style={styles.metaRow}>
              <span className="pill-tag">
                <FiCalendar size={12} /> {exp.period}
              </span>
              <span className="pill-tag">
                <FiMapPin size={12} /> {exp.location}
              </span>
            </div>

            <p style={styles.description}>{exp.description}</p>

            <div style={styles.achievementsBox}>
              <div style={styles.achievementsTitle}>KEY DELIVERABLES & OUTCOMES:</div>
              <ul style={styles.achievementsList}>
                {exp.achievements.map((item, i) => (
                  <li key={i} style={styles.achievementItem}>
                    <FiCheck size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.techRow}>
              {exp.tech.map((t, i) => (
                <span key={i} className="pill-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  card: {
    padding: '1.75rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '0.85rem',
    marginBottom: '0.75rem',
  },
  roleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    marginBottom: '0.2rem',
  },
  role: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  company: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
  },
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.45rem',
    marginBottom: '1.15rem',
  },
  description: {
    fontSize: '0.93rem',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
    marginBottom: '1.15rem',
  },
  achievementsBox: {
    padding: '1.15rem',
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    marginBottom: '1.15rem',
  },
  achievementsTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    marginBottom: '0.65rem',
  },
  achievementsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  achievementItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.55rem',
    fontSize: '0.88rem',
    color: 'var(--text-primary)',
    lineHeight: 1.5,
  },
  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.45rem',
  },
};

export default WorkExperience;
