import React, { useEffect, useRef, useState } from 'react';
import { retrieve, suggestions, corpus, type Doc } from '../../lib/retrieval';

type Phase = 'retrieving' | 'answering' | 'done';

const kindLabel: Record<Doc['kind'], string> = {
    project: 'project',
    capstone: 'capstone',
    stack: 'stack',
    focus: 'ai focus',
    credentials: 'certs',
    availability: 'status',
    about: 'about',
};

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return reduced;
};

const AskTerminal: React.FC = () => {
    const reduceMotion = usePrefersReducedMotion();
    const initialRes = retrieve('strongest project');
    const [input, setInput] = useState('');
    const [question, setQuestion] = useState('What is your strongest project?');
    const [sources, setSources] = useState<Doc[]>(initialRes.sources);
    const [fullAnswer, setFullAnswer] = useState(initialRes.answer);
    const [typed, setTyped] = useState(initialRes.answer);
    const [phase, setPhase] = useState<Phase>('done');
    const timers = useRef<number[]>([]);

    const clearTimers = () => {
        timers.current.forEach((t) => window.clearTimeout(t));
        timers.current = [];
    };

    const ask = (q: string) => {
        const query = q.trim();
        if (!query) return;
        clearTimers();
        setQuestion(query);
        setSources([]);
        setTyped('');
        setFullAnswer('');
        setPhase('retrieving');

        const reveal = () => {
            const res = retrieve(query);
            setSources(res.sources);
            setFullAnswer(res.answer);
            if (reduceMotion) {
                setTyped(res.answer);
                setPhase('done');
            } else {
                setPhase('answering');
            }
        };
        timers.current.push(window.setTimeout(reveal, reduceMotion ? 0 : 480));
    };

    // Typewriter for the answer.
    useEffect(() => {
        if (phase !== 'answering') return;
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTyped(fullAnswer.slice(0, i));
            if (i >= fullAnswer.length) {
                window.clearInterval(id);
                setPhase('done');
            }
        }, 15);
        return () => window.clearInterval(id);
    }, [phase, fullAnswer]);

    // Seed an answered state on mount so the demo reads as "alive" instantly.
    useEffect(() => {
        return clearTimers;
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        ask(input);
        setInput('');
    };

    return (
        <div style={s.shell} aria-label="Ask my portfolio — a live retrieval demo">
            <div style={s.header}>
                <span style={s.headerName}>ask.herald()</span>
                <span style={s.headerStatus}>
                    <span style={s.dot} className="dot-live" />
                    runs in your browser · no API
                </span>
            </div>

            <div style={s.body}>
                <div style={s.qRow}>
                    <span style={s.qCaret}>›</span>
                    <span style={s.qText}>{question}</span>
                </div>

                {phase === 'retrieving' ? (
                    <div style={s.retrieving}>
                        <span style={s.retrievingLabel}>
                            <span style={s.dot} className="dot-live" /> retrieving from {corpus.length} chunks
                        </span>
                        <span className="skeleton" style={{ ...s.skel, width: '92%' }} />
                        <span className="skeleton" style={{ ...s.skel, width: '74%' }} />
                    </div>
                ) : (
                    <>
                        {sources.length > 0 && (
                            <div style={s.sources} className="fade-up">
                                <span style={s.sourcesLabel}>sources</span>
                                <div style={s.chipRow}>
                                    {sources.map((src) => (
                                        <span key={src.id} style={s.sourceChip}>
                                            <span style={s.sourceKind}>{kindLabel[src.kind]}</span>
                                            {src.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p style={s.answer} aria-live="polite">
                            {typed}
                            {phase === 'answering' && <span className="caret">.</span>}
                        </p>
                    </>
                )}
            </div>

            <div style={s.footer}>
                <form style={s.form} onSubmit={onSubmit}>
                    <label htmlFor="ask-input" style={s.srOnly}>
                        Ask a question about Herald
                    </label>
                    <input
                        id="ask-input"
                        style={s.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about my work, stack, or availability…"
                        autoComplete="off"
                    />
                    <button type="submit" style={s.send} aria-label="Send question">
                        ▸
                    </button>
                </form>
                <div style={s.suggestRow}>
                    {suggestions.map((q) => (
                        <button
                            key={q}
                            type="button"
                            className="suggest-chip"
                            style={s.suggestChip}
                            onClick={() => ask(q)}
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const s: { [k: string]: React.CSSProperties } = {
    shell: {
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-glow)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backdropFilter: 'blur(6px)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.85rem 1.1rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--ink-2)',
    },
    headerName: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: 'var(--violet)',
        fontWeight: 600,
    },
    headerStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--text-faint)',
    },
    dot: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: 'var(--signal)',
        display: 'inline-block',
        flexShrink: 0,
    },
    body: {
        padding: '1.2rem 1.25rem 1.3rem',
        minHeight: '212px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.95rem',
    },
    qRow: {
        display: 'flex',
        gap: '0.6rem',
        alignItems: 'baseline',
    },
    qCaret: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--violet)',
        fontWeight: 700,
        flexShrink: 0,
    },
    qText: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.92rem',
        color: 'var(--text-primary)',
        lineHeight: 1.4,
    },
    retrieving: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
    },
    retrievingLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        color: 'var(--signal)',
    },
    skel: {
        height: '0.7rem',
        display: 'block',
    },
    sources: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    sourcesLabel: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.64rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-faint)',
    },
    chipRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    sourceChip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.32rem 0.6rem',
        borderRadius: '7px',
        background: 'var(--signal-soft)',
        border: '1px solid color-mix(in srgb, var(--signal) 35%, transparent)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.76rem',
    },
    sourceKind: {
        color: 'var(--signal)',
        fontSize: '0.6rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    answer: {
        fontSize: '1.02rem',
        lineHeight: 1.62,
        color: 'var(--text-primary)',
        margin: 0,
    },
    footer: {
        padding: '0 1.25rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
    },
    form: {
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        padding: '0.7rem 0.9rem',
        borderRadius: '10px',
        border: '1px solid var(--border-strong)',
        background: 'var(--ink-2)',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
    },
    send: {
        width: '44px',
        borderRadius: '10px',
        border: 'none',
        background: 'var(--violet)',
        color: 'var(--ink)',
        fontSize: '1.1rem',
        cursor: 'pointer',
        fontWeight: 700,
    },
    suggestRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.45rem',
    },
    suggestChip: {
        padding: '0.4rem 0.7rem',
        borderRadius: '999px',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        cursor: 'pointer',
    },
    srOnly: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
    },
};

export default AskTerminal;
