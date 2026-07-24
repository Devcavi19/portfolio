import React from 'react';
import { profile } from '../../data/profile';
import {
    FaPython, FaReact, FaGitAlt,
    FaBrain, FaRobot, FaShieldAlt, FaCloud, FaBalanceScale,
} from 'react-icons/fa';
import {
    SiFlask, SiTypescript, SiSupabase, SiVercel, SiNumpy,
    SiTensorflow, SiShopify
} from 'react-icons/si';
import { BsChatSquareQuote, BsTerminal } from 'react-icons/bs';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { RiFilePaper2Line } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi';
import { FiCheck } from 'react-icons/fi';
import SectionHeader from '../Layout/SectionHeader';

const getSkillIcon = (skillName: string) => {
    const key = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    switch (true) {
        case key.includes('python'): return <FaPython />;
        case key.includes('typescript'): return <SiTypescript />;
        case key.includes('react'): return <FaReact />;
        case key.includes('flask'): return <SiFlask />;
        case key.includes('supabase'): return <SiSupabase />;
        case key.includes('vercel'): return <SiVercel />;
        case key.includes('git'): return <FaGitAlt />;
        case key.includes('numpy') || key.includes('pandas'): return <SiNumpy />;
        case key.includes('artificialintelligence'): return <FaBrain />;
        case key.includes('generativeai'): return <FaRobot />;
        case key.includes('nlp'): return <BiMessageRoundedDots />;
        case key.includes('rag'): return <RiFilePaper2Line />;
        case key.includes('machinelearning'): return <SiTensorflow />;
        case key.includes('prompt'): return <BsTerminal />;
        case key.includes('chatbot'): return <FaRobot />;
        case key.includes('cybersecurity'): return <FaShieldAlt />;
        case key.includes('llm'): return <BsChatSquareQuote />;
        case key.includes('cloud'): return <FaCloud />;
        case key.includes('ethics'): return <FaBalanceScale />;
        case key.includes('shopify'): return <SiShopify />;
        case key.includes('copilot'): return <FaRobot />;
        case key.includes('vibe'): return <HiSparkles />;
        default: return <span>#</span>;
    }
};

const Skills: React.FC = () => {
    return (
        <section id="skills" className="section" style={styles.section}>
            <div className="container">
                <SectionHeader
                    eyebrow="Toolkit"
                    title={<>The stack I <em>build with.</em></>}
                />

                <div style={styles.groups}>
                    <div style={styles.group}>
                        <h3 style={styles.subHeading}>Technical</h3>
                        <div style={styles.grid}>
                            {profile.skills.technical.map((skill, index) => (
                                <div key={index} className="tile" style={styles.item}>
                                    <span style={styles.iconWrapper}>{getSkillIcon(skill)}</span>
                                    <span style={styles.name}>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.group}>
                        <h3 style={styles.subHeading}>AI focus areas</h3>
                        <div style={styles.grid}>
                            {profile.skills.advanced.map((skill, index) => (
                                <div key={index} className="tile" style={styles.item}>
                                    <span style={styles.iconWrapper}>{getSkillIcon(skill)}</span>
                                    <span style={styles.name}>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.group}>
                        <h3 style={styles.subHeading}>
                            Certifications
                            <span style={styles.count}>{profile.skills.certifications.length}</span>
                        </h3>
                        <div style={styles.certGrid}>
                            {profile.skills.certifications.map((cert, index) => (
                                <div key={index} className="tile" style={styles.certItem}>
                                    <span style={styles.certCheck}>
                                        <FiCheck size={13} strokeWidth={3} />
                                    </span>
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        background: 'var(--ink-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
    },
    groups: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2.75rem',
    },
    group: {},
    subHeading: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: 'var(--text-secondary)',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        marginBottom: '1.3rem',
    },
    count: {
        color: 'var(--signal)',
        fontSize: '0.72rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(118px, 1fr))',
        gap: '0.85rem',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.7rem',
        padding: '1.25rem 0.75rem',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'default',
    },
    iconWrapper: {
        fontSize: '1.9rem',
        color: 'var(--violet)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '38px',
    },
    name: {
        fontSize: '0.8rem',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
    },
    certGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '0.7rem',
    },
    certItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '0.85rem 1rem',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        borderRadius: '10px',
        fontSize: '0.86rem',
        color: 'var(--text-primary)',
        cursor: 'default',
    },
    certCheck: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'var(--signal-soft)',
        color: 'var(--signal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
};

export default Skills;
