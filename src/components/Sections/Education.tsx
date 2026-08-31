import React from 'react';
import { FiBookOpen, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { profile } from '../../data/profile';

const Education: React.FC = () => {
  return (
    <section id="education" className="portfolio-section">
      <div className="section-label">02 / EDUCATION</div>
      <h2 className="section-title">Academic Background</h2>

      <div style={styles.list}>
        {profile.education.map((item, index) => (
          <div key={index} className="clean-card" style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.degreeRow}>
                  <FiBookOpen size={18} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                  <h3 style={styles.degree}>{item.degree}</h3>
                </div>
                <div style={styles.school}>{item.school}</div>
              </div>
              <div style={styles.gwaBadge}>
                ⭐ GWA {item.gwa}
              </div>
            </div>

            <div style={styles.metaRow}>
              <span className="pill-tag">📅 {item.period}</span>
              <span className="pill-tag">📍 {item.location}</span>
            </div>

            <p style={styles.description}>{item.description}</p>

            {item.thesis && (
              <div style={styles.thesisBox}>
                <div style={styles.thesisHeader}>
                  <FiFileText size={15} />
                  <span style={styles.thesisLabel}>CAPSTONE RESEARCH THESIS</span>
                </div>
                <p style={styles.thesisTitle}>"{item.thesis}"</p>
                <div style={styles.thesisTags}>
                  <span className="pill-tag-dark">RAG Architecture</span>
                  <span className="pill-tag-dark">FAISS Vector Search</span>
                  <span className="pill-tag-dark">Supabase Auth/DB</span>
                  <span className="pill-tag-dark">Google Gemini API</span>
                </div>
              </div>
            )}

            <div style={styles.courseworkBox}>
              <div style={styles.courseworkTitle}>KEY COMPUTER SCIENCE SUBJECTS:</div>
              <div className="coursework-grid-responsive">
                {[
                  'Data Structures & Algorithms',
                  'Software Engineering & OOP',
                  'Database Systems & SQL',
                  'Machine Learning & AI Principles',
                  'Web Application Architecture',
                  'Human-Computer Interaction (HCI)'
                ].map((course, i) => (
                  <div key={i} style={styles.courseItem}>
                    <FiCheckCircle size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
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
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '0.85rem',
  },
  degreeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.2rem',
  },
  degree: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  school: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
  },
  gwaBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#09090b',
    color: '#ffffff',
    padding: '0.35rem 0.75rem',
    borderRadius: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.82rem',
    fontWeight: 700,
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
    marginBottom: '1.25rem',
  },
  thesisBox: {
    padding: '1.15rem',
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    marginBottom: '1.25rem',
  },
  thesisHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    marginBottom: '0.4rem',
    color: 'var(--text-primary)',
  },
  thesisLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
  },
  thesisTitle: {
    fontSize: '0.98rem',
    fontWeight: 700,
    fontStyle: 'italic',
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
    lineHeight: 1.45,
  },
  thesisTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  courseworkBox: {
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  courseworkTitle: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.65rem',
    letterSpacing: '0.08em',
  },
  courseworkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '0.6rem',
  },
  courseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.86rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
};

export default Education;
