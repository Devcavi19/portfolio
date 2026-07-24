import { profile } from '../data/profile';

/**
 * A tiny, fully client-side retrieval engine.
 *
 * It's deliberately small but real: it builds a corpus of "chunks" from the
 * profile data, scores them against a free-text query with token + tag
 * overlap, and returns the best-matching chunks as cited sources alongside a
 * composed answer. No network, no API — the same idea behind Herald's RAG
 * capstone, shrunk down to run in a recruiter's browser tab.
 */

export type Doc = {
    id: string;
    label: string;
    kind: 'project' | 'capstone' | 'stack' | 'focus' | 'credentials' | 'availability' | 'about';
    tags: string[];
    text: string;
    meta?: string;
};

export type RetrievalResult = {
    answer: string;
    sources: Doc[];
    matched: boolean;
};

const STOPWORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'do', 'does', 'did', 'you', 'your', 'yours',
    'what', 'whats', 'who', 'how', 'can', 'could', 'would', 'me', 'my', 'i',
    'of', 'to', 'in', 'on', 'for', 'with', 'and', 'or', 'have', 'has', 'about',
    'tell', 'show', 'give', 'any', 'some', 'whatis', 'be', 'best', 'most',
]);

const tokenize = (s: string): string[] =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 1 && !STOPWORDS.has(t));

/** Build the corpus once from the single source of truth. */
const buildCorpus = (): Doc[] => {
    const docs: Doc[] = [];

    profile.projects.forEach((p, i) => {
        const isCapstone = /adal/i.test(p.title);
        docs.push({
            id: `project-${i}`,
            label: p.title,
            kind: isCapstone ? 'capstone' : 'project',
            tags: [
                ...tokenize(p.title),
                ...p.tech.map((t) => t.toLowerCase()),
                'project', 'projects', 'work', 'built', 'build', 'app',
                ...(isCapstone ? ['capstone', 'thesis', 'rag', 'retrieval', 'chatbot', 'research'] : []),
            ],
            text: p.description,
            meta: p.tech.join(' · '),
        });
    });

    const edu = profile.education[0];
    docs.push({
        id: 'capstone-thesis',
        label: 'Capstone Thesis',
        kind: 'capstone',
        tags: [
            'capstone', 'thesis', 'rag', 'retrieval', 'research', 'llm', 'llms',
            'chatbot', 'semantic', 'search', 'study', 'studying', 'education',
            'degree', 'school', 'university', 'college', 'paper', 'library',
        ],
        text: `My capstone, "${edu.thesis}", is a retrieval-augmented chatbot that helps students find relevant theses and literature in the CSPC library through semantic search.`,
        meta: `${edu.degree} · ${edu.school}`,
    });

    docs.push({
        id: 'stack',
        label: 'Core Stack',
        kind: 'stack',
        tags: [
            ...profile.skills.technical.map((s) => s.toLowerCase()),
            'stack', 'tech', 'technologies', 'tools', 'languages', 'frontend',
            'backend', 'fullstack', 'full', 'code', 'coding', 'frameworks',
        ],
        text: `My core stack is ${profile.skills.technical.join(', ')} — I work full-stack, from React + TypeScript front ends to Python and Flask services.`,
    });

    docs.push({
        id: 'focus',
        label: 'AI Focus',
        kind: 'focus',
        tags: [
            ...profile.skills.advanced.map((s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')),
            'ai', 'ml', 'rag', 'nlp', 'genai', 'generative', 'machine', 'learning',
            'llm', 'llms', 'prompt', 'cybersecurity', 'security', 'focus', 'specialty',
            'specialize', 'strength', 'good',
        ],
        text: `I focus on applied AI: ${profile.skills.advanced.slice(0, 6).join(', ')} — building retrieval and generative systems that solve real problems.`,
    });

    docs.push({
        id: 'credentials',
        label: 'Certifications',
        kind: 'credentials',
        tags: [
            'certification', 'certifications', 'certificate', 'certs', 'credential',
            'credentials', 'oracle', 'oci', 'ibm', 'cisco', 'github', 'copilot',
            'qualified', 'qualification', 'course', 'courses', 'trained',
        ],
        text: `I hold ${profile.skills.certifications.length} certifications, including OCI Generative AI Professional, OCI AI Foundations, and IBM AI Fundamentals with Capstone.`,
    });

    docs.push({
        id: 'availability',
        label: 'Availability',
        kind: 'availability',
        tags: [
            'internship', 'intern', 'available', 'availability', 'hire', 'hiring',
            'job', 'opportunity', 'opportunities', 'open', 'work', 'remote',
            'contact', 'reach', 'email', 'start', 'freelance',
        ],
        text: `Yes — I'm ${profile.availability.toLowerCase()} and currently based in ${profile.location}. The fastest way to reach me is ${profile.email}.`,
    });

    docs.push({
        id: 'about',
        label: 'About Herald',
        kind: 'about',
        tags: [
            'about', 'background', 'herald', 'yourself', 'introduce', 'introduction',
            'student', 'study', 'studying', 'passion', 'passionate', 'who',
        ],
        text: profile.bio.replace(/\s+/g, ' ').trim(),
    });

    return docs;
};

export const corpus: Doc[] = buildCorpus();

/** Suggested prompts that map cleanly onto the corpus. */
export const suggestions: string[] = [
    'What is your strongest project?',
    'Do you know RAG?',
    'What is your tech stack?',
    'Are you available for hire?',
];

const scoreDoc = (queryTokens: string[], doc: Doc): number => {
    const tagSet = new Set(doc.tags);
    const textTokens = new Set(tokenize(doc.text + ' ' + (doc.meta ?? '')));
    let score = 0;

    for (const qt of queryTokens) {
        if (tagSet.has(qt)) {
            score += 2.5;
        } else if (textTokens.has(qt)) {
            score += 1;
        } else {
            // partial / stem-ish match against tags
            for (const tag of tagSet) {
                if (tag.length > 3 && (tag.includes(qt) || qt.includes(tag))) {
                    score += 0.6;
                    break;
                }
            }
        }
    }

    // Capstone is the headline answer to broad AI / "best work" questions.
    if (doc.kind === 'capstone') score *= 1.08;
    return score;
};

export const retrieve = (query: string): RetrievalResult => {
    const tokens = tokenize(query);

    if (tokens.length === 0) {
        return {
            answer:
                "Ask me something — try my strongest project, my stack, RAG experience, or whether I'm open to an internship.",
            sources: [],
            matched: false,
        };
    }

    const ranked = corpus
        .map((doc) => ({ doc, score: scoreDoc(tokens, doc) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score);

    if (ranked.length === 0) {
        return {
            answer:
                "I don't have a chunk on that yet. I can speak to my projects, my tech stack, my RAG/AI focus, certifications, or availability — try one of those.",
            sources: [],
            matched: false,
        };
    }

    const top = ranked[0];
    const sources = [top.doc];
    // Include a strong runner-up if it's clearly relevant.
    if (ranked[1] && ranked[1].score >= top.score * 0.6) {
        sources.push(ranked[1].doc);
    }

    return { answer: top.doc.text, sources, matched: true };
};
