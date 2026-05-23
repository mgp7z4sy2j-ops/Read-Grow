import { test, expect } from '@playwright/test';

const EMPLOYEE = {
  email: 'kevin.wang@startrader.com',
  password: 'demo123',
};

const ADMIN = {
  email: 'jessica.liu@startrader.com',
  password: 'admin123',
};

test.describe('Good Book Program — full flow', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await page.evaluate(() => localStorage.clear());
  });

  test('landing nav: Register, Sign in, Admin only', async ({ page }) => {
    await page.goto('/index.html');

    const nav = page.locator('.nav-right');
    await expect(nav.getByRole('link', { name: 'Create account' })).toHaveAttribute('href', './register.html');
    await expect(nav.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', './login.html');
    await expect(nav.getByRole('link', { name: 'Admin' })).toHaveAttribute('href', './admin-login.html');

    const navLinks = nav.locator('a');
    await expect(navLinks).toHaveCount(3);
    await expect(nav.getByRole('link', { name: 'Dashboard' })).toHaveCount(0);
    await expect(nav.getByRole('link', { name: 'My books' })).toHaveCount(0);
  });

  test('employee: login → AI recommendations → select book → submit to HR', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', EMPLOYEE.email);
    await page.fill('#password', EMPLOYEE.password);
    await page.locator('#loginForm button[type="submit"]').click();

    await page.waitForURL('**/dashboard.html');
    await expect(page.locator('.tb-greeting-main')).toContainText(/Good (morning|afternoon|evening)/);

    await expect(page.locator('#recsList .rec-card, #recsList .rec-empty, #recsList .rec-error').first()).toBeVisible({
      timeout: 60_000,
    });

    const cards = page.locator('#recsList .rec-card');
    const cardCount = await cards.count();
    if (cardCount === 0) {
      test.skip(true, 'No recommendation cards returned (API unavailable)');
    }

    const firstSelect = page.locator('#recsList .btn-select').first();
    await firstSelect.click();

    await expect(page.locator('#stickyBar')).toHaveClass(/show/);
    await expect(page.locator('#stickyTitle')).not.toHaveText('—');

    const submitBtn = page.locator('#submitToHR');
    await submitBtn.click();

    await expect(submitBtn).toContainText('Submitted!', { timeout: 30_000 });

    const pending = await page.evaluate(() => localStorage.getItem('gb_pending_order'));
    expect(pending).toBeTruthy();
  });

  test('admin: login → book library loads 100 titles', async ({ page }) => {
    await page.goto('/admin-login.html');
    await page.fill('#email', ADMIN.email);
    await page.fill('#password', ADMIN.password);
    await page.locator('#adminForm button[type="submit"]').click();

    await page.waitForURL('**/admin-dashboard.html');
    await expect(page.locator('#tbTitle')).toHaveText('Overview');

    await page.locator('.sb-item[data-tab="library"]').click();
    await expect(page.locator('#tbTitle')).toHaveText('Book Library');
    await expect(page.locator('#tab-library.active')).toBeVisible();

    const rows = page.locator('#libraryTbody tr');
    await expect(rows.first()).toBeVisible({ timeout: 15_000 });
    await expect(rows).toHaveCount(100, { timeout: 15_000 });
    await expect(page.locator('#libraryCountSub')).toContainText('100 titles');
  });

  test('API: orders over $80 budget are blocked', async ({ request }) => {
    const res = await request.post('/api/orders/submit', {
      data: {
        title: 'Over Budget Test Book',
        author: 'E2E Test',
        price: 99.99,
        isbn: '9780000000000',
        employee: 'E2E Tester',
        email: 'e2e@startrader.com',
        quarter: 'Q2 2026',
      },
    });

    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.error).toBe('budget_exceeded');
    expect(body.withinBudget).toBe(false);
    expect(body.maxBudgetUsd).toBe(80);
  });

  test('register → dashboard redirect', async ({ page }) => {
    const unique = Date.now();
    await page.goto('/register.html');

    for (const [selector, value] of [
      ['#firstName', 'E2E'],
      ['#lastName', 'Tester'],
      ['#email', `e2e.${unique}@startrader.com`],
      ['#password', 'demo123'],
      ['#confirm', 'demo123'],
    ] as const) {
      const field = page.locator(selector);
      await field.fill(value);
      await field.dispatchEvent('input');
      await field.dispatchEvent('blur');
    }

    await page.selectOption('#department', 'sales');
    await page.evaluate(() => {
      const terms = document.getElementById('terms') as HTMLInputElement;
      terms.checked = true;
    });

    await page.locator('#registerForm button[type="submit"]').click();

    await page.waitForURL('**/dashboard.html', { timeout: 15_000 });
    await expect(page.locator('.sb-user-name')).toContainText('E2E Tester');
  });
});
