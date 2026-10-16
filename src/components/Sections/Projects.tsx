import React, { useState, useEffect } from 'react';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiLayers, FiCheck } from 'react-icons/fi';
import { profile } from '../../data/profile';

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3200);
        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) {
        return (
            <div style={styles.placeholderContainer}>
                <FiLayers size={32} style={{ color: 'var(--text-muted)' }} />
                <span style={styles.placeholderText}>LIVE DEMO</span>
            </div>
        );
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
                    <img key={index} src={image} alt="Project Screenshot" style={styles.sliderImage} />
                ))}
            </div>
            {images.length > 1 && (
                <div style={styles.dots}>
                    {images.map((_, i) => (
                        <span
                            key={i}
                            style={{
                                ...styles.dotNav,
                                backgroundColor: i === currentIndex ? '#09090b' : '#d4d4d8',
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
        <section id="projects" className="portfolio-section">
            <div className="section-label">04 / PROJECTS</div>
            
            <div className="section-title-row">
                <h2 className="section-title">Featured Projects</h2>
                <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                >
                    View All GitHub Repos <FiArrowUpRight size={14} />
                </a>
            </div>

            <div className="responsive-grid-cards">
                {profile.projects.map((project, index) => {
                    const isCapstone = /adal/i.test(project.title);
                    const badgeText = project.badge || (isCapstone ? 'AI CAPSTONE' : null);
                    return (
                        <article key={index} className="clean-card" style={styles.card}>
                            <div style={styles.imageWrap}>
                                <ImageSlider images={project.images || []} />
                                {badgeText && (
                                    <span className="pill-tag-dark" style={styles.capstoneBadge}>
                                        {badgeText}
                                    </span>
                                )}
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.title}>{project.title}</h3>
                                {project.subtitle && (
                                    <p style={styles.subtitle}>{project.subtitle}</p>
                                )}
                                <p style={styles.description}>{project.description}</p>

                                {project.highlights && project.highlights.length > 0 && (
                                    <div style={styles.highlightsBox}>
                                        <div style={styles.highlightsTitle}>KEY FEATURES & ENGINEERING HIGHLIGHTS:</div>
                                        <ul style={styles.highlightsList}>
                                            {project.highlights.map((highlight, hIndex) => (
                                                <li key={hIndex} style={styles.highlightItem}>
                                                    <FiCheck size={13} style={styles.highlightCheck} />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div style={styles.techStack}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="pill-tag">
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
                                            className="btn-primary"
                                            style={styles.actionBtn}
                                        >
                                            Live Demo <FiExternalLink size={13} />
                                        </a>
                                    )}
                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary"
                                            style={styles.actionBtn}
                                            aria-label={`${project.title} source code`}
                                        >
                                            Source Code <FiGithub size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    imageWrap: {
        position: 'relative',
        height: '190px',
        backgroundColor: 'var(--bg-muted)',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
    },
    placeholderText: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
    },
    capstoneBadge: {
        position: 'absolute',
        top: '0.75rem',
        left: '0.75rem',
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
        transition: 'transform 0.4s ease-in-out',
    },
    sliderImage: {
        minWidth: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    dots: {
        position: 'absolute',
        bottom: '0.65rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.35rem',
    },
    dotNav: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        transition: 'background-color 0.3s ease',
    },
    content: {
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        color: 'var(--text-primary)',
        fontSize: '1.25rem',
        fontWeight: 800,
        marginBottom: '0.35rem',
    },
    subtitle: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        marginBottom: '0.75rem',
        lineHeight: 1.4,
    },
    description: {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        lineHeight: 1.55,
        marginBottom: '1rem',
    },
    highlightsBox: {
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--bg-muted)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        marginBottom: '1.15rem',
    },
    highlightsTitle: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: 'var(--text-muted)',
        marginBottom: '0.55rem',
    },
    highlightsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.45rem',
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
    highlightItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        fontSize: '0.82rem',
        color: 'var(--text-primary)',
        lineHeight: 1.45,
    },
    highlightCheck: {
        color: '#10b981',
        flexShrink: 0,
        marginTop: '2px',
    },
    techStack: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginBottom: '1.35rem',
    },
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.55rem',
        marginTop: 'auto',
    },
    actionBtn: {
        padding: '0.5rem 0.85rem',
        fontSize: '0.78rem',
    },
};

export default Projects;
