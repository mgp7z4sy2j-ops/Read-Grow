const { getEligibleBooks } = require('./catalog');
const { MAX_BUDGET_USD } = require('./constants');

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';

async function loadCatalog() {
  return getEligibleBooks();
}

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreBook(book, words, context) {
  const haystack = [
    book.title,
    book.author,
    book.category,
    book.difficulty,
    ...(book.tags || []),
    ...(book.keywords || []),
  ]
    .join(' ')
    .toLowerCase();

  let score = 0;
  for (const w of words) {
    if (haystack.includes(w)) score += 3;
  }

  if (context.department) {
    const dept = context.department.toLowerCase();
    const deptMap = {
      sales: ['sales', 'negotiation', 'influence', 'persuasion', 'pipeline'],
      technology: ['technology', 'engineering', 'devops', 'software', 'architecture', 'code'],
      product: ['product', 'discovery', 'roadmap', 'startup', 'innovation'],
      marketing: ['marketing', 'persuasion', 'contagious', 'messaging', 'growth'],
      finance: ['finance', 'money', 'decision', 'bias', 'risk', 'economics'],
      operations: ['operations', 'remote', 'systems', 'execution', 'flow'],
      'hr & people': ['leadership', 'culture', 'feedback', 'teams', 'trust'],
      engineering: ['technology', 'engineering', 'devops', 'software', 'management'],
    };
    for (const kw of deptMap[dept] || []) {
      if (haystack.includes(kw)) score += 2;
    }
  }

  score += (book.keywords?.length || 0) * 0.05;
  return score;
}

async function localRecommend(inputText, context) {
  const books = await loadCatalog();
  const words = tokenize(inputText);
  const ranked = books
    .map((book) => ({ book, score: scoreBook(book, words, context) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked.slice(0, 5);
  const maxScore = top[0]?.score || 1;

  return {
    mode: 'local',
    books: top.map(({ book, score }, i) => ({
      ...book,
      rank: i + 1,
      relevance: Math.min(99, Math.max(62, Math.round(88 - i * 6 + (score / maxScore) * 12))),
      whyThisFits: buildLocalWhy(book, inputText, context),
      problemItSolves: buildLocalProblem(book, inputText),
    })),
  };
}

function buildLocalWhy(book, inputText, context) {
  const topic = book.tags?.[0] || book.category;
  const dept = context.department ? ` As someone in ${context.department},` : '';
  return `${book.title} directly addresses ${topic.toLowerCase()} — one of the clearest matches in our catalogue for what you described.${dept} this book gives practical frameworks you can apply to your current situation, not just theory.`;
}

function buildLocalProblem(book, inputText) {
  const kw = book.keywords?.slice(0, 2).join(' and ') || book.category.toLowerCase();
  return `Building capability in ${kw} when your day-to-day challenges need structured guidance, not ad-hoc fixes.`;
}

async function claudeRecommend(inputText, context) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) return null;

  const books = await loadCatalog();
  const catalogSummary = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    price: b.price,
    category: b.category,
    difficulty: b.difficulty,
    tags: b.tags,
  }));

  const userContext = [
    context.department && `Department: ${context.department}`,
    context.company && `Company: ${context.company}`,
  ]
    .filter(Boolean)
    .join('\n');

  const prompt = `You are the AI book recommendation engine for the STARTRADER Reading Growth Program.

An employee described their work challenge or learning goal:
"""
${inputText}
"""
${userContext ? `\nEmployee context:\n${userContext}\n` : ''}

From the catalogue below, pick exactly 5 books ranked by relevance. Rules:
- Only use book IDs from the catalogue
- All books are already under $${MAX_BUDGET_USD}
- Return valid JSON only, no markdown

Catalogue:
${JSON.stringify(catalogSummary)}

Respond with this JSON shape:
{
  "books": [
    {
      "id": "book-id-from-catalogue",
      "rank": 1,
      "relevance": 97,
      "whyThisFits": "2-3 sentences tailored to the employee's input",
      "problemItSolves": "One sentence stating the specific challenge this book addresses"
    }
  ]
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.content?.find((c) => c.type === 'text')?.text || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude returned non-JSON response');

  const parsed = JSON.parse(jsonMatch[0]);
  const byId = Object.fromEntries(books.map((b) => [b.id, b]));

  const merged = (parsed.books || [])
    .slice(0, 5)
    .map((rec, i) => {
      const base = byId[rec.id];
      if (!base) return null;
      return {
        ...base,
        rank: rec.rank || i + 1,
        relevance: Math.min(99, Math.max(60, rec.relevance || 90 - i * 5)),
        whyThisFits: rec.whyThisFits || buildLocalWhy(base, inputText, context),
        problemItSolves: rec.problemItSolves || buildLocalProblem(base, inputText),
      };
    })
    .filter(Boolean);

  if (merged.length < 5) {
    const used = new Set(merged.map((b) => b.id));
    for (const book of books) {
      if (merged.length >= 5) break;
      if (!used.has(book.id)) {
        merged.push({
          ...book,
          rank: merged.length + 1,
          relevance: 70 - merged.length * 3,
          whyThisFits: buildLocalWhy(book, inputText, context),
          problemItSolves: buildLocalProblem(book, inputText),
        });
      }
    }
  }

  return { mode: 'claude', books: merged.slice(0, 5) };
}

async function recommend(inputText, context = {}) {
  try {
    const claude = await claudeRecommend(inputText, context);
    if (claude?.books?.length) return claude;
  } catch (err) {
    console.warn('[recommend] Claude failed, using local fallback:', err.message);
  }
  return localRecommend(inputText, context);
}

module.exports = { recommend, loadCatalog };
