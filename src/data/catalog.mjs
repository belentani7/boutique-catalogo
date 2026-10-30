/**
 * Datos del catálogo de la boutique.
 *
 * Módulo ESM puro (JS + declaración `catalog.d.mts`) para que los mismos
 * datos sirvan a la app (Vite/React), a los tests (`node --test`) y a los
 * scripts de export (`scripts/export.mjs`) sin necesitar TypeScript.
 */

/** @typedef {import('./catalog.d.mts').ImageItem} ImageItem */

/**
 * Piezas del catálogo en orden de aparición.
 * Los `src` son rutas absolutas servidas desde `public/`.
 * @type {ImageItem[]}
 */
export const IMAGES = [
  { id: 1, src: '/media/look1.png', alt: 'Look 1', caption: 'Abrigo seda twill', collection: 'AW24' },
  { id: 2, src: '/media/look2.png', alt: 'Look 2', caption: 'Traje cachemir blend', collection: 'AW24' },
  { id: 3, src: '/media/look3.png', alt: 'Look 3', caption: 'Vestido lana crepe', collection: 'SS25' },
  { id: 4, src: '/media/look4.jpg', alt: 'Look 4', caption: 'Blazer lana técnica', collection: 'SS25' },
  { id: 5, src: '/media/look5.png', alt: 'Look 5', caption: 'Camisa algodón orgánico', collection: 'SS25' },
  { id: 6, src: '/media/hero.mp4', alt: 'Hero Video', caption: 'Video campaña', collection: 'HERO', isVideo: true },
];

/**
 * Formatea el número de pieza con ceros a la izquierda (2 dígitos),
 * como se muestra en la esquina de cada tarjeta del catálogo.
 * @param {number} id
 * @returns {string}
 */
export function formatItemNumber(id) {
  return String(id).padStart(2, '0');
}
