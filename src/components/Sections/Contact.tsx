import React from 'react';
import { FiMail, FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profile } from '../../data/profile';

const Contact: React.FC = () => {
    return (
        <>
            <section id="contact-me" className="section" style={styles.section}>
                <div className="container">
                    <div style={styles.card}>
                        <div style={styles.glow} aria-hidden="true" />
                        <span className="eyebrow" style={styles.eyebrow}>
                            {profile.availability}
                        </span>
                        <h2 style={styles.title}>
                            Let’s build something <span style={styles.accent}>worth shipping.</span>
                        </h2>
                        <p style={styles.text}>
                            I’m looking for an internship where I can grow as an AI and full-stack
                            developer. Have a role, a project, or a question? My inbox is open.
                        </p>

                        <div style={styles.actions}>
                            <a href={`mailto:${profile.email}`} className="btn btn-primary">
                                <FiMail size={16} /> {profile.email}
                            </a>
                            <div style={styles.socials}>
                                <a
                                    href={profile.links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost"
                                >
                                    <FaLinkedinIn size={16} /> LinkedIn <FiArrowUpRight />
                                </a>
                                <a
                                    href={profile.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost"
                                >
                                    <FaGithub size={16} /> GitHub <FiArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={styles.footer}>
                <div className="container" style={styles.footerInner}>
                    <div style={styles.logoRow}>
                        <span style={styles.logo}>H</span>
                        <span>Herald Carl Avila</span>
                    </div>
                    <span style={styles.copy}>© 2026 · Built with React, TypeScript &amp; a tiny RAG engine</span>
                </div>
            </footer>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        paddingBottom: '3rem',
    },
    card: {
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '4rem 2rem',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
    },
    glow: {
        position: 'absolute',
        top: '-160px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '560px',
        height: '380px',
        background: 'radial-gradient(circle, var(--violet-soft) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    eyebrow: {
        position: 'relative',
        justifyContent: 'center',
    },
    title: {
        position: 'relative',
        fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
        color: 'var(--text-primary)',
        lineHeight: 1.08,
        marginBottom: '1.1rem',
    },
    accent: {
        color: 'var(--violet)',
    },
    text: {
        position: 'relative',
        color: 'var(--text-secondary)',
        fontSize: '1.05rem',
        lineHeight: 1.65,
        maxWidth: '48ch',
        margin: '0 auto 2.2rem',
    },
    actions: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    socials: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem',
    },
    footer: {
        borderTop: '1px solid var(--border)',
        padding: '1.75rem 0',
    },
    footerInner: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--text-faint)',
    },
    logoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        color: 'var(--text-secondary)',
    },
    logo: {
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        background: 'var(--violet)',
        color: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '0.8rem',
    },
    copy: {},
};

export default Contact;
