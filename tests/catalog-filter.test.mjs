import test from 'node:test';
import assert from 'node:assert/strict';
import { filterCatalog, normalizeCatalogText } from '../src/catalog-filter.ts';

const items = [
  { id: 1, caption: 'Abrigo seda twill', collection: 'AW24', alt: 'Look 1' },
  { id: 2, caption: 'Vestido algodón orgánico', collection: 'SS25', alt: 'Look 2' },
  { id: 3, caption: 'Blazer lana técnica', collection: 'SS25', alt: 'Look 3' },
];

test('normalizes Spanish diacritics and casing', () => {
  assert.equal(normalizeCatalogText('  ALGODÓN  '), 'algodon');
});
test('search matches accents and case', () => {
  assert.deepEqual(filterCatalog(items, 'algodon', 'TODAS').map((item) => item.id), [2]);
  assert.deepEqual(filterCatalog(items, 'BLAZER', 'TODAS').map((item) => item.id), [3]);
});
test('collection filter works independently and together with search', () => {
  assert.deepEqual(filterCatalog(items, '', 'AW24').map((item) => item.id), [1]);
  assert.deepEqual(filterCatalog(items, 'lana', 'SS25').map((item) => item.id), [3]);
  assert.deepEqual(filterCatalog(items, 'abrigo', 'SS25'), []);
});
test('blank query retains original order and never mutates data', () => {
  const before = JSON.stringify(items);
  assert.deepEqual(filterCatalog(items, ' ', 'TODAS'), items);
  assert.equal(JSON.stringify(items), before);
});

test('search tolerates multiple spaces and tabs within a garment name', () => {
  assert.equal(normalizeCatalogText('  VESTIDO  \t ALGODÓN   '), 'vestido algodon');
  assert.deepEqual(filterCatalog(items, ' vestido   ALGODON ', 'TODAS').map((item) => item.id), [2]);
});

test('search matches terms across garment and collection in either order', () => {
  assert.deepEqual(filterCatalog(items, 'SS25 vestido', 'TODAS').map((item) => item.id), [2]);
  assert.deepEqual(filterCatalog(items, 'técnica ss25', 'TODAS').map((item) => item.id), [3]);
  assert.deepEqual(filterCatalog(items, 'AW24 vestido', 'TODAS'), []);
});

test('all search terms must match; collection selector remains restrictive', () => {
  assert.deepEqual(filterCatalog(items, 'algodon inexistente', 'TODAS'), []);
  assert.deepEqual(filterCatalog(items, 'ss25 vestido', 'AW24'), []);
});
