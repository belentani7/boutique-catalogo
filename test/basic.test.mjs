import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGES, formatItemNumber } from '../src/data/catalog.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('el catálogo tiene las 6 piezas declaradas con ids únicos', () => {
  assert.equal(IMAGES.length, 6, 'debe haber 6 piezas (5 looks + 1 vídeo)');
  const ids = IMAGES.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, 'los ids deben ser únicos');
});

test('cada pieza tiene src, alt, caption y collection no vacíos', () => {
  for (const item of IMAGES) {
    assert.ok(typeof item.src === 'string' && item.src.startsWith('/media/'), `src inválido en pieza ${item.id}`);
    assert.ok(item.alt.length > 0, `alt vacío en pieza ${item.id}`);
    assert.ok(item.caption.length > 0, `caption vacío en pieza ${item.id}`);
    assert.ok(item.collection.length > 0, `collection vacía en pieza ${item.id}`);
  }
});

test('los ficheros de media referenciados existen en public/', () => {
  for (const item of IMAGES) {
    const file = path.join(repoRoot, 'public', item.src.replace(/^\//, ''));
    assert.ok(existsSync(file), `no existe el fichero de la pieza ${item.id}: ${item.src}`);
  }
});

test('formatItemNumber rellena el número de pieza a 2 dígitos', () => {
  assert.equal(formatItemNumber(1), '01');
  assert.equal(formatItemNumber(6), '06');
  assert.equal(formatItemNumber(12), '12');
});
