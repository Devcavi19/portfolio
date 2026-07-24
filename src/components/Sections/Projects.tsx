import React, { useState, useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa6';
import { profile } from '../../data/profile';
import SectionHeader from '../Layout/SectionHeader';

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 2800);
        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) {
        return <div style={styles.terminalIcon}>&gt;_</div>;
    }

    return (
        <div style={styles.sliderContainer}>
            <div
                style={{
                    ...styles.sliderTrack,
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <img key={index} src={image} alt="" style={styles.sliderImage} />
                ))}
            </div>
            {images.length > 1 && (
                <div style={styles.dots}>
                    {images.map((_, i) => (
                        <span
                            key={i}
                            style={{
                                ...styles.dotNav,
                                background:
                                    i === currentIndex ? 'var(--violet)' : 'rgba(255,255,255,0.35)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <SectionHeader
                    eyebrow="Selected work"
                    title={<>Things I&apos;ve <em>shipped.</em></>}
                    aside={
                        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" style={styles.viewAll}>
                            All repos <FiArrowUpRight />
                        </a>
                    }
                />

                <div style={styles.grid}>
                    {profile.projects.map((project, index) => {
                        const isCapstone = /adal/i.test(project.title);
                        return (
                            <article key={index} className="lift" style={styles.card}>
                                <div style={styles.imageWrap}>
                                    <ImageSlider images={project.images || []} />
                                    {isCapstone && <span style={styles.capstone}>Capstone</span>}
                                </div>
                                <div style={styles.content}>
                                    <h3 style={styles.title}>{project.title}</h3>
                                    <p style={styles.description}>{project.description}</p>
                                    <div style={styles.techStack}>
                                        {project.tech.map((tech, i) => (
                                            <span key={i} style={styles.techTag}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={styles.buttonContainer}>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={styles.liveLink}
                                            >
                                                Live demo <FiArrowUpRight />
                                            </a>
                                        )}
                                        {project.repo && (
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-icon"
                                                aria-label={`${project.title} source code`}
                                                style={styles.repoLink}
                                            >
                                                <FaGithub size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    viewAll: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    imageWrap: {
        position: 'relative',
        height: '180px',
        background: 'var(--ink-2)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    capstone: {
        position: 'absolute',
        top: '0.75rem',
        left: '0.75rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '999px',
        background: 'var(--signal-soft)',
        border: '1px solid color-mix(in srgb, var(--signal) 40%, transparent)',
        color: 'var(--signal)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.66rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        backdropFilter: 'blur(4px)',
    },
    sliderContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    sliderTrack: {
        display: 'flex',
        height: '100%',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    },
    sliderImage: {
        minWidth: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    dots: {
        position: 'absolute',
        bottom: '0.7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.35rem',
    },
    dotNav: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        transition: 'background 0.3s ease',
    },
    terminalIcon: {
        fontSize: '2rem',
        color: 'var(--violet)',
        fontFamily: 'var(--font-mono)',
    },
    content: {
        padding: '1.4rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: 'var(--text-primary)',
        fontSize: '1.3rem',
        marginBottom: '0.5rem',
    },
    description: {
        color: 'var(--text-secondary)',
        fontSize: '0.92rem',
        lineHeight: 1.55,
        marginBottom: '1.1rem',
    },
    techStack: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginBottom: '1.4rem',
    },
    techTag: {
        fontSize: '0.7rem',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        padding: '0.22rem 0.55rem',
        borderRadius: '6px',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginTop: 'auto',
    },
    liveLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: 'var(--violet)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.84rem',
        fontWeight: 500,
    },
    repoLink: {
        marginLeft: 'auto',
    },
};

export default Projects;
