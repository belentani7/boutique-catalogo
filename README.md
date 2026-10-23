# BOUTIQUE CATÁLOGO

Catálogo editorial de moda con dirección de arte monocromática, tipografía Cormorant Garamond / Outfit / Space Mono, cuadrícula de looks y vídeo de campaña. Es una experiencia de presentación; **no es una tienda ni un sistema de pagos**.

## Lo que ofrece el producto

- Portada de marca con una identidad negro / gris / blanco y navegación visual basada en scroll.
- Galería responsive de cinco looks editoriales y una pieza de vídeo.
- Búsqueda local de prendas y selector de colección, con resultados anunciados a lectores de pantalla y estado vacío.
- Vídeo con reproducción voluntaria y controles, y mensaje de error si falla una imagen o vídeo.
- Fichas con colección, título y número; información accesible en pantallas táctiles, ratón y teclado.
- Animaciones progresivas con GSAP y respeto a `prefers-reduced-motion`.
- Metadatos iniciales, título, idioma español y estructura semántica.

## Desarrollo

Requiere Node.js 22 o superior y npm. Instala y arranca:

```bash
npm ci
npm run dev
```

## Control de calidad

```bash
npm run typecheck
npm run lint
npm run build
node --experimental-strip-types --test tests/catalog-filter.test.mjs
```

La rama de release incluye un flujo de GitHub Actions para estos tres controles. **No se debe publicar una versión con un control fallido.**

## Contenido editorial

Las piezas están declaradas en `src/App.tsx`; los medios referenciados se sirven en `public/media/`:

| Recurso | Tipo | Función |
| --- | --- | --- |
| `look1.png` a `look5.png/jpg` | Imagen | Looks 01–05 |
| `hero.mp4` | Vídeo | Sexta pieza de la galería |

Verifica que las piezas y sus derechos de uso estén aprobados antes de activar un dominio público. Los nombres de colección AW24/SS25 son referencias editoriales del contenido actual, no afirmaciones de stock real. La experiencia no recoge datos de clientes ni promete compra o disponibilidad.

## Publicación

Puede publicarse como sitio estático en Vercel: framework Vite, `npm run build`, directorio de salida `dist`. Configura dominio, analítica y enlaces comerciales **solo** cuando exista un servicio verificable. No usar números de teléfono ficticios. Antes de anunciar el lanzamiento: comprobar carga de imágenes y vídeo, navegación a teclado, responsive, consola y rendimiento en dispositivo real.

## Preservación

La rama de mejora no retira componentes visuales, productos, animaciones, medios ni funcionalidad existente. Cualquier nueva sección comercial requiere catálogo real, precios, políticas y contacto autorizado.

## Publicación bajo control

La rama de mejora exige variables de repositorio explícitas para habilitar publicación desde GitHub Actions: `BOUTIQUE_ENABLE_PREVIEW`, `BOUTIQUE_ENABLE_PRODUCTION` y `BOUTIQUE_ENABLE_IMAGE_PUSH` deben establecerse en `true` por separado. Por defecto, las tareas de publicación no se ejecutan. Una variable habilitada no sustituye las pruebas, revisión de derechos de imágenes/vídeo, protección del destino ni verificación de coste cero. El sitio sigue siendo privado y no se ha autorizado publicar material de terceros.

## Comprobaciones pendientes

No se ha verificado en esta rama una copia offsite cifrada/restaurada, ni derechos de cada fotografía/vídeo, ni un destino Vercel conectado. No considerar el PR publicado ni plenamente validado hasta ejecutar `npm ci`, lint, typecheck, build, pruebas de navegador 320/375/768/1280px y CI con runner.
