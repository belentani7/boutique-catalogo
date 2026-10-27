/** Pure, locale-aware catalog filtering; never transmits user queries. */
export interface CatalogEntry {
  caption: string;
  collection: string;
  alt: string;
}

export function normalizeCatalogText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim().replace(/\s+/g, ' ');
}

export function filterCatalog<T extends CatalogEntry>(
  items: readonly T[],
  query: string,
  collection: string,
): T[] {
  const terms = normalizeCatalogText(query).split(' ').filter(Boolean);
  return items.filter((item) => {
    if (collection !== 'TODAS' && item.collection !== collection) return false;
    if (terms.length === 0) return true;
    const searchable = normalizeCatalogText([item.caption, item.collection, item.alt].join(' '));
    return terms.every((term) => searchable.includes(term));
  });
}
