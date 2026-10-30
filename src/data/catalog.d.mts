/** Una pieza del catálogo (look fotográfico o vídeo de campaña). */
export interface ImageItem {
  id: number;
  /** Ruta absoluta servida desde `public/` (ej. `/media/look1.png`). */
  src: string;
  alt: string;
  caption: string;
  /** Colección a la que pertenece (AW24, SS25, HERO). */
  collection: string;
  /** true si el archivo es vídeo en lugar de imagen. */
  isVideo?: boolean;
}

export declare const IMAGES: ImageItem[];

/** Número de pieza con ceros a la izquierda a 2 dígitos (1 → "01"). */
export declare function formatItemNumber(id: number): string;
