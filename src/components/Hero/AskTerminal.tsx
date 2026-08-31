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
        timers.current.push(window.setTimeout(reveal, reduceMotion ? 0 : 400));
    };

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
        }, 12);
        return () => window.clearInterval(id);
    }, [phase, fullAnswer]);

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
                    <span className="dot-live-black" />
                    Browser Retrieval Engine ({corpus.length} Chunks)
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
                            Indexing vectors & retrieving relevance...
                        </span>
                        <div style={s.skelLine} />
                    </div>
                ) : (
                    <>
                        {sources.length > 0 && (
                            <div style={s.sources}>
                                <span style={s.sourcesLabel}>CITED SOURCES</span>
                                <div style={s.chipRow}>
                                    {sources.map((src) => (
                                        <span key={src.id} className="stark-chip">
                                            <span style={s.sourceKind}>{kindLabel[src.kind]}</span>
                                            {src.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p style={s.answer} aria-live="polite">
                            {typed}
                            {phase === 'answering' && <span style={s.caret}>_</span>}
                        </p>
                    </>
                )}
            </div>

            <div style={s.footer}>
                <form style={s.form} onSubmit={onSubmit}>
                    <input
                        id="ask-input"
                        style={s.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Herald's work, stack, or thesis..."
                        autoComplete="off"
                    />
                    <button type="submit" className="btn-stark-primary" style={s.send}>
                        Ask
                    </button>
                </form>
                <div style={s.suggestRow}>
                    {suggestions.map((q) => (
                        <button
                            key={q}
                            type="button"
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
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--border-stark)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-stark)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        borderBottom: '2px solid var(--border-stark)',
        backgroundColor: 'var(--bg-muted)',
    },
    headerName: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--accent-black)',
        fontWeight: 700,
    },
    headerStatus: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
    },
    body: {
        padding: '1.25rem',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    qRow: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
        backgroundColor: 'var(--bg-muted)',
        border: '1.5px solid var(--border-stark)',
        borderRadius: '6px',
    },
    qCaret: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--accent-black)',
        fontWeight: 800,
        fontSize: '1.1rem',
    },
    qText: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.88rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
    },
    retrieving: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    retrievingLabel: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
    },
    skelLine: {
        height: '8px',
        backgroundColor: 'var(--border-stark)',
        borderRadius: '4px',
        width: '80%',
    },
    sources: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
    },
    sourcesLabel: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.14em',
        color: 'var(--text-muted)',
        fontWeight: 700,
    },
    chipRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
    },
    sourceKind: {
        color: 'var(--text-muted)',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
    },
    answer: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
    },
    caret: {
        fontWeight: 800,
        fontFamily: 'var(--font-mono)',
        marginLeft: '2px',
    },
    footer: {
        padding: '0 1.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    form: {
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        padding: '0.65rem 0.85rem',
        borderRadius: '6px',
        border: '2px solid var(--border-stark)',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        outline: 'none',
    },
    send: {
        padding: '0.65rem 1.2rem',
    },
    suggestRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
    },
    suggestChip: {
        padding: '0.3rem 0.6rem',
        borderRadius: '4px',
        border: '1.5px solid var(--border-stark)',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 600,
        cursor: 'pointer',
    },
};

export default AskTerminal;
