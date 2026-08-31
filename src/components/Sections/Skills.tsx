import React from 'react';
import { profile } from '../../data/profile';
import { FaPython, FaReact, FaGitAlt, FaBrain } from 'react-icons/fa';
import {
    SiTypescript, SiSupabase, SiShopify, SiTailwindcss, SiNodedotjs, SiVite
} from 'react-icons/si';
import { BsTerminal, BsChatSquareQuote } from 'react-icons/bs';
import { RiFilePaper2Line } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi';
import { FiCpu, FiCheck } from 'react-icons/fi';

const getSkillIcon = (skillName: string) => {
    const key = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    switch (true) {
        case key.includes('python'): return <FaPython />;
        case key.includes('typescript'): return <SiTypescript />;
        case key.includes('react'): return <FaReact />;
        case key.includes('supabase'): return <SiSupabase />;
        case key.includes('tailwind'): return <SiTailwindcss />;
        case key.includes('shopify') || key.includes('liquid'): return <SiShopify />;
        case key.includes('node'): return <SiNodedotjs />;
        case key.includes('vite'): return <SiVite />;
        case key.includes('git'): return <FaGitAlt />;
        case key.includes('artificialintelligence'): return <FaBrain />;
        case key.includes('rag') || key.includes('retrieval'): return <RiFilePaper2Line />;
        case key.includes('prompt'): return <BsTerminal />;
        case key.includes('vector') || key.includes('faiss'): return <FiCpu />;
        case key.includes('llm'): return <BsChatSquareQuote />;
        case key.includes('accessibility') || key.includes('ui'): return <HiSparkles />;
        default: return <FiCpu />;
    }
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="portfolio-section">
            <div className="section-label">05 / SKILLS & TECH STACK</div>
            <h2 className="section-title">Technical Toolchain & Skills</h2>

            <div style={styles.groups}>
                {/* Primary Technical Stack */}
                <div>
                    <h3 style={styles.groupHeader}>PRIMARY DEVELOPMENT STACK</h3>
                    <div className="skills-grid-container">
                        {profile.skills.technical.map((skill, index) => (
                            <div key={index} className="clean-card" style={styles.tile}>
                                <span style={styles.icon}>{getSkillIcon(skill)}</span>
                                <span style={styles.skillName}>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI & RAG Specialties */}
                <div>
                    <h3 style={styles.groupHeader}>AI & SPECIALIZED ARCHITECTURES</h3>
                    <div className="skills-grid-container">
                        {profile.skills.advanced.map((skill, index) => (
                            <div key={index} className="clean-card" style={styles.tile}>
                                <span style={styles.icon}>{getSkillIcon(skill)}</span>
                                <span style={styles.skillName}>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Certifications */}
                <div>
                    <h3 style={styles.groupHeader}>
                        VERIFIED CERTIFICATIONS ({profile.skills.certifications.length})
                    </h3>
                    <div className="cert-grid-container">
                        {profile.skills.certifications.map((cert, index) => (
                            <div key={index} className="clean-card" style={styles.certCard}>
                                <div style={styles.checkWrapper}>
                                    <FiCheck size={13} strokeWidth={3} />
                                </div>
                                <span style={styles.certName}>{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    groups: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    groupHeader: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        marginBottom: '0.85rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '0.75rem',
    },
    tile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.55rem',
        padding: '1.15rem 0.65rem',
        textAlign: 'center',
    },
    icon: {
        fontSize: '1.6rem',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    skillName: {
        fontSize: '0.8rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
    },
    certGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '0.65rem',
    },
    certCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.75rem 0.85rem',
    },
    checkWrapper: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#09090b',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    certName: {
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
    },
};

export default Skills;
