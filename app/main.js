// DealHunt main: state, search + filters + sort, hash routing.
// Runs entirely in the browser from static files; no network requests.

import { CATEGORIES, CHECKED_ON, DEALS, STORES, discountPct } from './data.js';
import { dealDetail, dealList, notFound } from './views.js';

const app = document.getElementById('app');
const searchInput = document.getElementById('search');
const categoryBox = document.getElementById('categories');
const storeSelect = document.getElementById('store');
const discountSelect = document.getElementById('discount');
const sortSelect = document.getElementById('sort');

const state = {
  query: '',
  category: 'All',
  store: 'All',
  minDiscount: 0,
  sort: 'discount',
};

function buildFilters() {
  const all = document.createElement('button');
  all.type = 'button';
  all.className = 'chip active';
  all.textContent = 'All';
  all.dataset.cat = 'All';
  categoryBox.appendChild(all);
  for (const c of CATEGORIES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = c;
    b.dataset.cat = c;
    categoryBox.appendChild(b);
  }
  for (const s of STORES) {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    storeSelect.appendChild(o);
  }
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  let list = DEALS.filter((d) => {
    if (state.category !== 'All' && d.category !== state.category) return false;
    if (state.store !== 'All' && d.store !== state.store) return false;
    if (discountPct(d) < state.minDiscount) return false;
    if (q && !(d.name + ' ' + d.store + ' ' + d.category).toLowerCase().includes(q)) return false;
    return true;
  });
  const by = {
    discount: (a, b) => discountPct(b) - discountPct(a),
    savings: (a, b) => b.was - b.sale - (a.was - a.sale),
    priceAsc: (a, b) => a.sale - b.sale,
    priceDesc: (a, b) => b.sale - a.sale,
    name: (a, b) => a.name.localeCompare(b.name),
  }[state.sort];
  return list.sort(by);
}

function renderStats() {
  const pcts = DEALS.map(discountPct);
  const best = Math.max(...pcts);
  const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
  const saved = DEALS.reduce((a, d) => a + (d.was - d.sale), 0);
  document.getElementById('stat-deals').textContent = String(DEALS.length);
  document.getElementById('stat-avg').textContent = avg + '%';
  document.getElementById('stat-best').textContent = '−' + best + '%';
  document.getElementById('stat-saved').textContent =
    '$' + Math.round(saved).toLocaleString('en-US');
}

function applyHashParams() {
  // Shareable filtered views: #/?cat=Tech&min=40&sort=discount&q=airpods
  const q = (location.hash.split('?')[1] || '');
  const params = new URLSearchParams(q);
  const cat = params.get('cat');
  const store = params.get('store');
  const min = params.get('min');
  const sort = params.get('sort');
  const query = params.get('q');
  if (cat && (cat === 'All' || CATEGORIES.includes(cat))) state.category = cat;
  if (store && (store === 'All' || STORES.includes(store))) state.store = store;
  if (min !== null && ['0', '20', '40', '50'].includes(min)) state.minDiscount = Number(min);
  if (sort && ['discount', 'savings', 'priceAsc', 'priceDesc', 'name'].includes(sort)) state.sort = sort;
  if (query !== null) state.query = query;
  searchInput.value = state.query;
  storeSelect.value = state.store;
  discountSelect.value = String(state.minDiscount);
  sortSelect.value = state.sort;
  syncChips();
}

function render() {
  const hash = location.hash || '#/';
  const m = hash.match(/^#\/deal\/([\w-]+)/);
  if (m) {
    const d = DEALS.find((x) => x.id === m[1]);
    app.innerHTML = d ? dealDetail(d) : notFound(m[1]);
    document.title = d ? d.name + ' — DealHunt' : 'Deal not found — DealHunt';
    window.scrollTo(0, 0);
    return;
  }
  document.title = 'DealHunt — Real Black Friday Deals 2026';
  app.innerHTML = dealList(filtered(), DEALS.length);
}

function syncChips() {
  for (const b of categoryBox.querySelectorAll('.chip')) {
    b.classList.toggle('active', b.dataset.cat === state.category);
  }
}

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  render();
});
categoryBox.addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b) return;
  state.category = b.dataset.cat;
  syncChips();
  render();
});
storeSelect.addEventListener('change', () => {
  state.store = storeSelect.value;
  render();
});
discountSelect.addEventListener('change', () => {
  state.minDiscount = Number(discountSelect.value);
  render();
});
sortSelect.addEventListener('change', () => {
  state.sort = sortSelect.value;
  render();
});
window.addEventListener('hashchange', render);

document.getElementById('checked-on').textContent = CHECKED_ON;
buildFilters();
applyHashParams();
renderStats();
render();
