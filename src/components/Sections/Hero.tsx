import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profile } from '../../data/profile';
import AskTerminal from '../Hero/AskTerminal';

const Hero: React.FC = () => {
    return (
        <section id="home" style={styles.section}>
            <div style={styles.glow} aria-hidden="true" />
            <div className="container">
                <div className="hero-grid">
                    {/* Identity — the thesis */}
                    <div>
                        <span className="eyebrow fade-up">
                            Full-Stack · E-commerce · AI
                        </span>
                        <h1 style={styles.headline} className="fade-up">
                            I build digital products that{' '}
                            <span style={styles.headlineAccent}>drive results.</span>
                        </h1>
                        <p style={styles.tagline} className="fade-up">
                            {profile.tagline}
                        </p>

                        <div style={styles.meta} className="fade-up">
                            <span>BS Computer Science</span>
                            <span style={styles.metaDivider}>/</span>
                            <span>{profile.location}</span>
                            <span style={styles.metaDivider}>/</span>
                            <span>{profile.skills.certifications.length} certifications</span>
                        </div>

                        <div style={styles.ctaRow} className="fade-up">
                            <a href="#projects" className="btn btn-primary">
                                View work <span aria-hidden="true">↓</span>
                            </a>
                            <a
                                href="/Herald_Avila_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ghost"
                            >
                                Résumé
                            </a>
                        </div>

                        <div style={styles.footRow} className="fade-up">
                            <span style={styles.availability}>
                                <span style={styles.availDot} className="dot-live" />
                                {profile.availability}
                            </span>
                            <span style={styles.socials}>
                                <a
                                    href={profile.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="GitHub"
                                >
                                    <FaGithub size={20} />
                                </a>
                                <a
                                    href={profile.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn size={19} />
                                </a>
                            </span>
                        </div>
                    </div>

                    {/* Proof — the signature */}
                    <div className="fade-up" style={styles.demoCol}>
                        <AskTerminal />
                        <p style={styles.demoCaption}>
                            ↑ A real retrieval engine over my own data — built, not stubbed. Ask it anything.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
    },
    glow: {
        position: 'absolute',
        top: '-180px',
        left: '-120px',
        width: '620px',
        height: '620px',
        background:
            'radial-gradient(circle, var(--violet-soft) 0%, transparent 68%)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    headline: {
        fontSize: 'clamp(2.4rem, 5.4vw, 3.9rem)',
        lineHeight: 1.04,
        color: 'var(--text-primary)',
        margin: '0 0 1.4rem',
        maxWidth: '12ch',
    },
    headlineAccent: {
        color: 'var(--violet)',
    },
    tagline: {
        fontSize: '1.08rem',
        lineHeight: 1.6,
        color: 'var(--text-secondary)',
        maxWidth: '46ch',
        marginBottom: '1.6rem',
    },
    meta: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.6rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--text-faint)',
        marginBottom: '2rem',
    },
    metaDivider: {
        color: 'var(--violet)',
        opacity: 0.55,
    },
    ctaRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.8rem',
        marginBottom: '2.2rem',
    },
    footRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1.5rem',
    },
    availability: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
    },
    availDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--signal)',
        display: 'inline-block',
    },
    socials: {
        display: 'inline-flex',
        gap: '1rem',
        alignItems: 'center',
    },
    demoCol: {
        position: 'relative',
        zIndex: 1,
    },
    demoCaption: {
        marginTop: '0.95rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        color: 'var(--text-faint)',
        lineHeight: 1.5,
        textAlign: 'center',
    },
};

export default Hero;
