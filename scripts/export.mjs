#!/usr/bin/env node
/**
 * Protocolo 11 — Export por proyecto.
 *
 * Genera el contenido principal del proyecto (el catálogo de piezas) como
 * JSON consumible por otros sistemas del ecosistema Belentani.
 *
 * Uso:
 *   npm run export                # imprime el JSON por stdout
 *   node scripts/export.mjs --out catalogo.json
 */
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { IMAGES } from '../src/data/catalog.mjs';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const args = process.argv.slice(2);
const outIndex = args.indexOf('--out');
const outPath = outIndex !== -1 ? args[outIndex + 1] : null;

const payload = {
  proyecto: pkg.name,
  version: pkg.version,
  generado: new Date().toISOString(),
  totalPiezas: IMAGES.length,
  colecciones: [...new Set(IMAGES.map((item) => item.collection))],
  piezas: IMAGES,
};

const json = JSON.stringify(payload, null, 2) + '\n';

if (outPath) {
  writeFileSync(outPath, json, 'utf8');
  console.error(`Export escrito en ${outPath} (${payload.totalPiezas} piezas)`);
} else {
  process.stdout.write(json);
}
