/** Pure, locale-aware catalog filtering; never transmits user queries. */
export interface CatalogEntry {
  caption: string;
  collection: string;
  alt: string;
}

export function normalizeCatalogText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
}

export function filterCatalog<T extends CatalogEntry>(
  items: readonly T[],
  query: string,
  collection: string,
): T[] {
  const normalizedQuery = normalizeCatalogText(query);
  return items.filter((item) => {
    if (collection !== 'TODAS' && item.collection !== collection) return false;
    if (!normalizedQuery) return true;
    return [item.caption, item.collection, item.alt]
      .some((field) => normalizeCatalogText(field).includes(normalizedQuery));
  });
}
