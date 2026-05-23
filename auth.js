/**
 * Good Book Program — demo session helpers (localStorage)
 * Replace with real JWT auth when backend is ready.
 */
const GBAuth = (function () {
  const SESSION_KEY = 'gb_member_session';
  const ORDER_KEY = 'gb_pending_order';
  const VALID_DOMAINS = ['startrader.com', 'starprime.com'];

  const DEPT_LABELS = {
    sales: 'Sales',
    technology: 'Technology',
    product: 'Product',
    operations: 'Operations',
    marketing: 'Marketing',
    finance: 'Finance',
    hr: 'HR & People',
    legal: 'Legal & Compliance',
    executive: 'Executive',
    other: 'Other',
  };

  function companyFromEmail(email) {
    const domain = (email.split('@')[1] || '').toLowerCase();
    return domain === 'starprime.com' ? 'StarPrime' : 'StarTrader';
  }

  function isValidEmail(email) {
    const domain = (email.split('@')[1] || '').toLowerCase();
    return VALID_DOMAINS.includes(domain);
  }

  function initials(firstName, lastName) {
    const a = (firstName || '').trim()[0] || '';
    const b = (lastName || '').trim()[0] || '';
    return (a + b).toUpperCase() || '?';
  }

  function parseNameFromEmail(email) {
    const local = (email.split('@')[0] || '').replace(/[._-]/g, ' ');
    const parts = local.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return {
        firstName: capitalize(parts[0]),
        lastName: parts.slice(1).map(capitalize).join(' '),
      };
    }
    return { firstName: parts[0] ? capitalize(parts[0]) : 'Member', lastName: '' };
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, loggedInAt: Date.now() }));
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function buildUserFromRegister({ firstName, lastName, email, department }) {
    const fn = firstName.trim();
    const ln = lastName.trim();
    return {
      firstName: fn,
      lastName: ln,
      email: email.trim().toLowerCase(),
      department: DEPT_LABELS[department] || department,
      company: companyFromEmail(email),
      initials: initials(fn, ln),
    };
  }

  function buildUserFromLogin(email) {
    const normalized = email.trim().toLowerCase();
    const existing = getSession();
    if (existing && existing.email === normalized) return existing;

    const { firstName, lastName } = parseNameFromEmail(normalized);
    return {
      firstName,
      lastName,
      email: normalized,
      department: existing?.department || 'Sales',
      company: companyFromEmail(normalized),
      initials: initials(firstName, lastName),
    };
  }

  function requireAuth(loginPath) {
    loginPath = loginPath || './login.html';
    const session = getSession();
    if (!session) {
      window.location.replace(loginPath);
      return null;
    }
    return session;
  }

  function redirectIfAuthed(dashboardPath) {
    dashboardPath = dashboardPath || './dashboard.html';
    if (getSession()) window.location.replace(dashboardPath);
  }

  function signOut(loginPath) {
    clearSession();
    window.location.href = loginPath || './login.html';
  }

  function greetingName(user) {
    return user.firstName || parseNameFromEmail(user.email).firstName;
  }

  function applyToDashboard(user) {
    const name = greetingName(user);
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    const main = document.querySelector('.tb-greeting-main');
    if (main) main.textContent = `${greet}, ${name}.`;

    const uname = document.querySelector('.sb-user-name');
    if (uname) uname.textContent = `${user.firstName} ${user.lastName}`.trim();

    const role = document.querySelector('.sb-user-role');
    if (role) role.textContent = `${user.department} · ${user.company}`;

    document.querySelectorAll('.sb-avatar, .tb-avatar').forEach((el) => {
      el.textContent = user.initials;
    });

    document.querySelectorAll('.lb-name').forEach((el) => {
      if (el.textContent.includes('(you)')) {
        el.innerHTML = `${user.firstName} ${user.lastName} <span style="font-size:11px;color:var(--amber)">(you)</span>`;
      }
    });
  }

  function switchDashboardTab(tab) {
    const item = document.querySelector(`.sb-item[data-tab="${tab}"]`);
    if (!item) return;
    document.querySelectorAll('.sb-item').forEach((i) => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + tab);
    if (panel) panel.classList.add('active');
    const content = document.querySelector('.content');
    if (content) content.scrollTop = 0;
  }

  function savePendingOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify({ ...order, submittedAt: Date.now() }));
  }

  function getPendingOrder() {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function applyPendingOrderUI() {
    const pending = getPendingOrder();
    if (!pending) return;

    const chip = document.querySelector('.sb-q-chip');
    if (chip) {
      chip.textContent = 'SUBMITTED';
      chip.style.background = 'rgba(16,185,129,.15)';
      chip.style.color = '#34D399';
    }

    const sub = document.querySelector('.sb-q-sub');
    if (sub) sub.textContent = `Pending HR approval · ${pending.title}`;

    const greetSub = document.querySelector('.tb-greeting-sub');
    if (greetSub) {
      greetSub.textContent = `Your Q2 request for "${pending.title}" is awaiting HR review.`;
    }

    const ringFill = document.getElementById('ringFill');
    if (ringFill) {
      const circ = 2 * Math.PI * 38;
      ringFill.style.strokeDashoffset = circ * 0.15;
    }
  }

  return {
    VALID_DOMAINS,
    DEPT_LABELS,
    isValidEmail,
    saveSession,
    getSession,
    clearSession,
    buildUserFromRegister,
    buildUserFromLogin,
    requireAuth,
    redirectIfAuthed,
    signOut,
    applyToDashboard,
    savePendingOrder,
    getPendingOrder,
    applyPendingOrderUI,
    switchDashboardTab,
    greetingName,
  };
})();
