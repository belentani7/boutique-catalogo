# BOUTIQUE CATÁLOGO

Catálogo editorial de moda con dirección de arte monocromática, tipografía Cormorant Garamond / Outfit / Space Mono, cuadrícula de looks y vídeo de campaña. Es una experiencia de presentación; **no es una tienda ni un sistema de pagos**.

## Lo que ofrece el producto

- Portada de marca con una identidad negro / gris / blanco y navegación visual basada en scroll.
- Galería responsive de cinco looks editoriales y una pieza de vídeo.
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
