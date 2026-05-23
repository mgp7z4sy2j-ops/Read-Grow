/**
 * Dashboard AI recommendations — calls POST /api/recommendations
 */
const GBRecommend = (function () {
  const COVERS = ['cov-1', 'cov-2', 'cov-3', 'cov-4', 'cov-5'];
  const API = '/api/recommendations';
  const CACHE_KEY = 'gb_recs_cache';

  function saveCache(inputText, data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ inputText, data, ts: Date.now() }));
    } catch (_) {}
  }

  function loadCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function clearCache() {
    localStorage.removeItem(CACHE_KEY);
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s ?? '';
    return d.innerHTML;
  }

  function escAttr(s) {
    return esc(s).replace(/'/g, '&#39;');
  }

  function renderCard(book, index) {
    const rank = book.rank || index + 1;
    const cov = COVERS[(rank - 1) % COVERS.length];
    const tags = (book.tags || []).slice(0, 2);
    const price = typeof book.price === 'number' ? book.price.toFixed(2) : book.price;
    const isbn = book.isbn || '';
    const overBudget = typeof book.price === 'number' && book.price > 80;

    return `
      <div class="rec-card" id="rec-${rank}" data-book-id="${escAttr(book.id)}">
        <div class="rec-cover ${cov}">
          <div class="rec-rank">#${rank}</div>
          <span>${esc(book.title.length > 28 ? book.title.slice(0, 26) + '…' : book.title)}</span>
        </div>
        <div class="rec-body">
          <div class="rec-top">
            <div>
              <div class="rec-title">${esc(book.title)}</div>
              <div class="rec-author">${esc(book.author)}</div>
            </div>
            <div class="rec-score">
              <div>
                <div class="rec-pct">${book.relevance}%</div>
                <div class="rec-pct-sub">relevant</div>
              </div>
            </div>
          </div>
          <p class="rec-why">${esc(book.whyThisFits)}</p>
          <div class="rec-problem"><strong>Problem it solves:</strong> ${esc(book.problemItSolves)}</div>
          <div class="rec-meta">
            <div class="rec-meta-item">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${esc(book.difficulty)}
            </div>
            <span class="rec-meta-sep">·</span>
            <div class="rec-meta-item">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${esc(book.readingTime)}
            </div>
            ${tags.map((t) => `<span class="rec-meta-sep">·</span><span class="tag tag-amber">${esc(t)}</span>`).join('')}
          </div>
          <div class="rec-actions">
            <span class="rec-price">$${price}</span>
            ${
              overBudget
                ? `<span class="rec-budget-bad">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Over $80 budget
            </span>`
                : `<span class="rec-budget-ok">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              Within budget
            </span>`
            }
            <button type="button" class="btn btn-amber btn-select" id="selectBtn-${rank}"
              data-id="${escAttr(book.id)}"
              data-title="${escAttr(book.title)}"
              data-author="${escAttr(book.author)}"
              data-price="${price}"
              data-isbn="${escAttr(isbn)}"
              ${overBudget ? 'disabled title="Over the $80 quarterly budget"' : ''}
              onclick="selectBook(${rank}, this.dataset.title, this.dataset.author, parseFloat(this.dataset.price), this.dataset.id, this.dataset.isbn)">
              ${overBudget ? 'Not eligible' : 'Select this book'}
            </button>
          </div>
        </div>
      </div>`;
  }

  function setLoading(isLoading) {
    const btn = document.getElementById('aiSubmitBtn');
    const state = document.getElementById('aiState');
    if (!btn) return;
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML =
        '<span style="width:14px;height:14px;border:2px solid rgba(15,17,71,.3);border-top-color:var(--navy);border-radius:50%;animation:spin .7s linear infinite;display:inline-block"></span> Finding matches…';
      if (state) {
        state.innerHTML =
          '<span style="width:14px;height:14px;border:2px solid rgba(22,233,215,.3);border-top-color:var(--cyan);border-radius:50%;animation:spin .7s linear infinite;display:inline-block"></span> Analyzing…';
      }
    } else {
      btn.disabled = false;
      btn.innerHTML =
        'Re-run <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>';
    }
  }

  function setState(count, mode) {
    const state = document.getElementById('aiState');
    const meta = document.getElementById('recsMeta');
    if (state) {
      state.innerHTML =
        '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> ' +
        `${count} book${count !== 1 ? 's' : ''} matched`;
    }
    if (meta && mode) {
      meta.textContent =
        mode === 'claude'
          ? 'Ranked by Claude · Select one to request'
          : 'Ranked by AI relevance · Select one to request';
    }
  }

  function showError(msg) {
    const list = document.getElementById('recsList');
    if (!list) return;
    list.innerHTML = `
      <div class="rec-error">
        <p><strong>Could not load recommendations</strong></p>
        <p>${esc(msg)}</p>
        <p style="margin-top:12px;font-size:12px;color:var(--gb-light)">Make sure the server is running: <code style="background:var(--paper-2);padding:2px 6px;border-radius:4px">cd server && npm start</code></p>
      </div>`;
    setState(0);
  }

  async function fetchRecommendations(inputText, context) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputText,
        department: context?.department,
        company: context?.company,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  function render(books, mode) {
    const list = document.getElementById('recsList');
    if (!list) return;
    if (!books?.length) {
      list.innerHTML = '<div class="rec-empty">No books matched. Try describing your challenge in more detail.</div>';
      setState(0);
      return;
    }
    list.innerHTML = books.map((b, i) => renderCard(b, i)).join('');
    setState(books.length, mode);
    if (typeof window.onRecsRendered === 'function') window.onRecsRendered(books);
  }

  async function run(inputText, context) {
    const list = document.getElementById('recsList');
    if (list) {
      list.innerHTML =
        '<div class="rec-loading"><span></span><span></span><span></span> Finding your best matches…</div>';
    }
    setLoading(true);
    try {
      const data = await fetchRecommendations(inputText, context);
      saveCache(inputText, data);
      render(data.books, data.mode);
      return data;
    } catch (err) {
      showError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function renderFromCache() {
    const cached = loadCache();
    if (!cached) return false;
    const textarea = document.getElementById('aiTextarea');
    if (textarea) textarea.value = cached.inputText;
    render(cached.data.books, cached.data.mode);
    const state = document.getElementById('aiState');
    if (state) {
      const age = Math.round((Date.now() - cached.ts) / 60000);
      const label = age < 1 ? 'just now' : age < 60 ? `${age}m ago` : `${Math.round(age / 60)}h ago`;
      state.innerHTML =
        '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> ' +
        `${cached.data.books.length} book${cached.data.books.length !== 1 ? 's' : ''} matched · cached ${label}`;
    }
    return true;
  }

  return { run, render, fetchRecommendations, renderFromCache, clearCache, loadCache };
})();
