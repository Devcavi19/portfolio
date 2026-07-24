import React from 'react';

type Props = {
    eyebrow: string;
    title: React.ReactNode;
    aside?: React.ReactNode;
};

const SectionHeader: React.FC<Props> = ({ eyebrow, title, aside }) => (
    <div style={styles.wrap}>
        <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
        </div>
        {aside && <div style={styles.aside}>{aside}</div>}
    </div>
);

const styles: { [k: string]: React.CSSProperties } = {
    wrap: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        marginBottom: '3rem',
    },
    aside: {
        flexShrink: 0,
    },
};

export default SectionHeader;
