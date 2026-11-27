// Views for DealHunt: the deal grid and the single-deal page.
// Every card shows the product, store, sale price, usual price, discount,
// savings, when the price was checked and where it was read, plus a link
// to the product at its store. Nothing here is a placeholder.

import { CHECKED_ON, discountPct, verdict } from './data.js';

export function money(n) {
  return '$' + n.toFixed(2).replace(/\.00$/, '');
}

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function dealCard(d) {
  const p = discountPct(d);
  const v = verdict(d);
  const save = d.was - d.sale;
  return `
  <article class="card">
    <div class="card-top">
      <span class="store">${esc(d.store)}</span>
      <span class="cat">${esc(d.category)}</span>
      <span class="pct pct-${v.cls}">−${p}%</span>
    </div>
    <h3><a href="#/deal/${d.id}">${esc(d.name)}</a></h3>
    <p class="note">${esc(d.note)}</p>
    <div class="prices">
      <span class="sale">${money(d.sale)}${d.perMonth ? '<small>/mo</small>' : ''}</span>
      <span class="was">${money(d.was)}</span>
      <span class="save">save ${money(save)}</span>
    </div>
    <div class="verdict verdict-${v.cls}">${v.label} · ${p}% off</div>
    <p class="checked">Checked ${CHECKED_ON} · ${esc(d.source)}</p>
    <div class="card-actions">
      <a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">View at ${esc(d.store)} ↗</a>
      <a class="details" href="#/deal/${d.id}">Details</a>
    </div>
  </article>`;
}

export function dealList(deals, total) {
  if (deals.length === 0) {
    return `<p class="empty">No deals match those filters. Try clearing the search or lowering the minimum discount.</p>`;
  }
  return `
  <p class="count">Showing <strong>${deals.length}</strong> of ${total} verified deals — sorted as chosen below.</p>
  <div class="grid">${deals.map(dealCard).join('')}</div>`;
}

export function dealDetail(d) {
  const p = discountPct(d);
  const v = verdict(d);
  const save = d.was - d.sale;
  return `
  <p class="back"><a href="#/">← All deals</a></p>
  <article class="detail">
    <div class="card-top">
      <span class="store">${esc(d.store)}</span>
      <span class="cat">${esc(d.category)}</span>
      <span class="pct pct-${v.cls}">−${p}%</span>
    </div>
    <h2>${esc(d.name)}</h2>
    <p class="note">${esc(d.note)}</p>
    <div class="detail-prices">
      <div><span class="lbl">Black Friday price</span><span class="sale big">${money(d.sale)}${d.perMonth ? '<small>/mo</small>' : ''}</span></div>
      <div><span class="lbl">Usual price</span><span class="was big">${money(d.was)}</span></div>
      <div><span class="lbl">You save</span><span class="save big">${money(save)} (${p}%)</span></div>
    </div>
    <p class="verdict verdict-${v.cls}">${v.label}: ${p}% off the usual price — ${p >= 50 ? 'one of the deepest cuts in this finder.' : p >= 20 ? 'a genuine saving, not a token cut.' : 'a small but real saving.'}</p>
    <dl class="facts">
      <div><dt>Store</dt><dd>${esc(d.store)}</dd></div>
      <div><dt>Category</dt><dd>${esc(d.category)}</dd></div>
      <div><dt>Price checked</dt><dd>${CHECKED_ON}</dd></div>
      <div><dt>Price source</dt><dd>${esc(d.source)}</dd></div>
    </dl>
    <p class="fineprint">Prices were live when checked on ${CHECKED_ON}. Retailers can change them — the store page is the final word.</p>
    <div class="card-actions">
      <a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">View at ${esc(d.store)} ↗</a>
      <a class="details" href="#/">← Back to all deals</a>
    </div>
  </article>`;
}

export function notFound(id) {
  return `<p class="empty">No deal with id “${esc(id)}” in this finder. <a href="#/">See all deals</a>.</p>`;
}
