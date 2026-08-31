import React, { useState } from 'react';
import { FiClock, FiArrowUpRight, FiArrowLeft } from 'react-icons/fi';
import { profile, type BlogItem } from '../../data/profile';

interface BlogsProps {
  onBack?: () => void;
}

const Blogs: React.FC<BlogsProps> = ({ onBack }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <div className="portfolio-section" style={{ paddingTop: '1rem' }}>
      {onBack && (
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{ marginBottom: '1.5rem', fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
        >
          <FiArrowLeft size={14} /> Back to Portfolio
        </button>
      )}

      <div className="section-label">OTHERS // BLOGS</div>
      <h2 className="section-title">Articles & Engineering Insights</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '60ch' }}>
        Technical notes, AI architecture breakdowns, performance optimizations, and dev workflow guides.
      </p>

      <div style={styles.grid}>
        {profile.blogs.map((blog) => (
          <article key={blog.id} className="clean-card" style={styles.card}>
            <div style={styles.metaRow}>
              <span className="pill-tag-dark">{blog.category}</span>
              <div style={styles.timeInfo}>
                <FiClock size={12} /> {blog.readTime}
              </div>
            </div>

            <h3 style={styles.title}>{blog.title}</h3>
            <p style={styles.summary}>{blog.summary}</p>

            <div style={styles.footer}>
              <span style={styles.date}>{blog.date}</span>
              <button
                onClick={() => setSelectedBlog(blog)}
                className="btn-primary"
                style={styles.readBtn}
              >
                Read Note <FiArrowUpRight size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal for Article Reading */}
      {selectedBlog && (
        <div style={styles.modalBackdrop} onClick={() => setSelectedBlog(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalMeta}>
              <span className="pill-tag-dark">{selectedBlog.category}</span>
              <span style={styles.modalDate}>{selectedBlog.date} · {selectedBlog.readTime}</span>
            </div>

            <h3 style={styles.modalTitle}>{selectedBlog.title}</h3>
            
            <div style={styles.modalBody}>
              <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>{selectedBlog.summary}</p>
              {selectedBlog.content && (
                <div style={styles.articleContentBox}>
                  <p>{selectedBlog.content}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button onClick={() => setSelectedBlog(null)} className="btn-secondary">
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.15rem',
  },
  timeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
    lineHeight: 1.35,
  },
  summary: {
    fontSize: '0.92rem',
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
    marginBottom: '1.5rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  date: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  readBtn: {
    fontSize: '0.78rem',
    padding: '0.45rem 0.85rem',
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1.5rem',
  },
  modalCard: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    maxWidth: '650px',
    width: '100%',
    padding: '2rem',
    boxShadow: 'var(--shadow-hover)',
  },
  modalMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  modalDate: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },
  modalTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '1rem',
    lineHeight: 1.3,
  },
  modalBody: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
  },
  articleContentBox: {
    padding: '1.25rem',
    backgroundColor: 'var(--bg-muted)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontFamily: 'var(--font-sans)',
  },
};

export default Blogs;
