import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { profile } from '../../data/profile';
import SectionHeader from '../Layout/SectionHeader';

const About: React.FC = () => {
    const edu = profile.education[0];
    const award = profile.awards[0];

    return (
        <section id="about-me" className="section">
            <div className="container">
                <SectionHeader
                    eyebrow="Profile"
                    title={<>The person <em>behind the code.</em></>}
                />

                <div className="about-grid" style={styles.container}>
                    <div style={styles.imageColumn}>
                        <div style={styles.imageWrapper}>
                            <span style={styles.imageFrame} aria-hidden="true" />
                            <img src="/me1.png" alt={profile.name} width={320} height={400} style={styles.aboutImage} />
                        </div>
                        {award && (
                            <div style={styles.award}>
                                <span style={styles.awardTag}>Award</span>
                                <span style={styles.awardTitle}>{award.title}</span>
                            </div>
                        )}
                    </div>

                    <div style={styles.textColumn}>
                        <p style={styles.bio}>{profile.bio}</p>

                        <div style={styles.eduCard}>
                            <h3 style={styles.eduDegree}>{edu.degree}</h3>
                            <p style={styles.eduSchool}>{edu.school}</p>
                            <p style={styles.eduMeta}>
                                {edu.period} · {edu.location} · GWA {edu.gwa}
                            </p>
                            <div style={styles.thesis}>
                                <span style={styles.thesisLabel}>Thesis</span>
                                <p style={styles.thesisText}>{edu.thesis}</p>
                            </div>
                        </div>

                        <a
                            href="/Herald_Avila_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={styles.resumeBtn}
                        >
                            <FiDownload size={16} /> Download résumé
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        alignItems: 'start',
    },
    imageColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: '320px',
    },
    imageFrame: {
        position: 'absolute',
        inset: '14px -14px -14px 14px',
        border: '1px solid var(--violet)',
        borderRadius: '16px',
        opacity: 0.5,
    },
    aboutImage: {
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        display: 'block',
        zIndex: 1,
    },
    award: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
        padding: '0.85rem 1rem',
        border: '1px solid var(--border)',
        borderLeft: '2px solid var(--signal)',
        borderRadius: '10px',
        background: 'var(--surface)',
        maxWidth: '320px',
    },
    awardTag: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--signal)',
    },
    awardTitle: {
        fontSize: '0.86rem',
        color: 'var(--text-primary)',
        lineHeight: 1.4,
    },
    textColumn: {
        minWidth: 0,
    },
    bio: {
        fontSize: '1.05rem',
        lineHeight: 1.75,
        color: 'var(--text-primary)',
        marginBottom: '1.8rem',
    },
    eduCard: {
        padding: '1.4rem 1.5rem',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        background: 'var(--surface)',
        marginBottom: '1.8rem',
    },
    eduDegree: {
        fontSize: '1.15rem',
        color: 'var(--text-primary)',
        marginBottom: '0.2rem',
    },
    eduSchool: {
        color: 'var(--violet)',
        fontSize: '0.92rem',
        marginBottom: '0.35rem',
    },
    eduMeta: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.76rem',
        color: 'var(--text-faint)',
        marginBottom: '1.1rem',
    },
    thesis: {
        paddingTop: '1.1rem',
        borderTop: '1px solid var(--border)',
    },
    thesisLabel: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.64rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
    },
    thesisText: {
        marginTop: '0.45rem',
        fontStyle: 'italic',
        color: 'var(--text-secondary)',
        fontSize: '0.92rem',
        lineHeight: 1.55,
    },
    resumeBtn: {
        textDecoration: 'none',
    },
};

export default About;
