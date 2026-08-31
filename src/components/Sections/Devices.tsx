import React from 'react';
import { FiMonitor, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { profile } from '../../data/profile';

interface DevicesProps {
  onBack?: () => void;
}

const Devices: React.FC<DevicesProps> = ({ onBack }) => {
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

      <div className="section-label">OTHERS // DEVICES</div>
      <h2 className="section-title">Hardware & Workstation Setup</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '60ch' }}>
        The physical machines, developer software toolchain, IDE plugins, and vector database engines used to build and deploy applications.
      </p>

      <div className="responsive-grid-cards">
        {profile.devices.map((cat, index) => (
          <div key={index} className="clean-card" style={styles.card}>
            <div style={styles.catHeader}>
              <FiMonitor size={18} style={{ color: 'var(--text-primary)' }} />
              <h3 style={styles.catTitle}>{cat.category}</h3>
            </div>

            <div style={styles.itemList}>
              {cat.items.map((item, i) => (
                <div key={i} style={styles.itemBox}>
                  <div style={styles.itemTitleRow}>
                    <FiCheck size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span style={styles.itemName}>{item.name}</span>
                    {item.spec && (
                      <span className="pill-tag" style={styles.specChip}>
                        {item.spec}
                      </span>
                    )}
                  </div>
                  <p style={styles.itemDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
  catHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    paddingBottom: '1rem',
    marginBottom: '1.25rem',
    borderBottom: '1px solid var(--border-color)',
  },
  catTitle: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  itemTitleRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  itemName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.96rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  specChip: {
    fontSize: '0.7rem',
    padding: '0.15rem 0.45rem',
    backgroundColor: 'var(--bg-muted)',
  },
  itemDesc: {
    fontSize: '0.88rem',
    lineHeight: 1.55,
    color: 'var(--text-secondary)',
    paddingLeft: '1.4rem',
  },
};

export default Devices;
