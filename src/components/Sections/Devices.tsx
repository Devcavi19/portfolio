import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface DevicesProps {
  onBack?: () => void;
}

const Devices: React.FC<DevicesProps> = ({ onBack }) => {
  return (
    <div className="portfolio-section" style={{ paddingTop: '1rem', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
      {onBack && (
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{ marginBottom: '1.5rem', fontSize: '0.8rem', padding: '0.45rem 0.85rem', alignSelf: 'flex-start' }}
        >
          <FiArrowLeft size={14} /> Back to Portfolio
        </button>
      )}

      <div style={styles.centeredContent}>
        <h2 style={styles.title}>Coming Soon...</h2>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  centeredContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
  },
};

export default Devices;

