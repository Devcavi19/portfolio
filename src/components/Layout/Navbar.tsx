import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const links = [
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Stack' },
    { href: '#about-me', label: 'About' },
];

const Navbar: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window === 'undefined') return 'dark';
        return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.inner}>
                <a href="#home" style={styles.logo} aria-label="Home">
                    <span style={styles.logoIcon}>H</span>
                    <span style={styles.logoText}>Herald</span>
                </a>

                <div style={styles.menu}>
                    <div className="nav-collapse" style={styles.menu}>
                        {links.map((l) => (
                            <a key={l.href} href={l.href} className="nav-link" style={styles.menuLink}>
                                {l.label}
                            </a>
                        ))}
                        <a href="#contact-me" className="btn btn-ghost" style={styles.contactBtn}>
                            Let’s talk
                        </a>
                    </div>
                    <button
                        onClick={toggleTheme}
                        style={styles.themeToggle}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'color-mix(in srgb, var(--ink) 78%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: 'var(--text-primary)',
    },
    logoIcon: {
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: 'var(--violet)',
        color: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1rem',
    },
    logoText: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: '1.05rem',
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.6rem',
    },
    menuLink: {
        fontFamily: 'var(--font-sans)',
    },
    contactBtn: {
        padding: '0.5rem 1rem',
        fontSize: '0.85rem',
    },
    themeToggle: {
        background: 'transparent',
        border: '1px solid var(--border-strong)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        borderRadius: '9px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default Navbar;
