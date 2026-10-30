# Boutique Catálogo

Catálogo web de una boutique de moda: una landing de una sola página con un hero animado y una galería de piezas (5 looks + 1 vídeo de campaña) organizadas por colección (AW24 y SS25). Diseño en negro, tipografía editorial y animaciones de scroll con GSAP.

## Qué hace

- Muestra una **pantalla de entrada (hero)** con el nombre de la boutique, animaciones de aparición y un indicador de scroll.
- Presenta el **catálogo de piezas** en una rejilla con revelado y parallax al hacer scroll; cada pieza enseña su número, colección y descripción al pasar el cursor.
- Reproduce un **vídeo de campaña** en la propia galería.
- Incluye un **pie de contacto** (cita previa y WhatsApp).
- Los datos del catálogo viven en `src/data/catalog.mjs` y pueden exportarse a JSON con `npm run export`.

No tiene carrito, pagos ni backend: es un escaparate estático generado con Vite.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev) como bundler y servidor de desarrollo
- [Tailwind CSS 4](https://tailwindcss.com) (vía plugin `@tailwindcss/vite`)
- [GSAP 3](https://gsap.com) con ScrollTrigger para las animaciones
- [Oxlint](https://oxc.rs) como linter

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev       # servidor de desarrollo en http://localhost:3001
npm run build     # comprobación de tipos + build de producción en dist/
npm run preview   # sirve el build de producción (puerto 3001)
```

El despliegue es automático: GitHub Pages compila y publica en cada push a `main` (`.github/workflows/deploy-pages.yml`), y el workflow de CI/CD construye la imagen Docker y despliega a Vercel en releases (`.github/workflows/ci.yml`).

## Estructura

```text
├── index.html                  # Punto de entrada HTML (fuentes, metadatos)
├── src/
│   ├── main.tsx                # Arranque de React
│   ├── App.tsx                 # Enruta / a la página Home
│   ├── pages/
│   │   └── Home.tsx            # Landing: hero + grid del catálogo
│   ├── data/
│   │   ├── catalog.mjs         # Datos del catálogo (piezas y colecciones)
│   │   └── catalog.d.mts       # Tipos del módulo de datos
│   └── index.css               # Tema Tailwind (colores y tipografías)
├── public/
│   └── media/                  # Looks y vídeo de campaña
├── test/
│   └── basic.test.mjs          # Tests del catálogo (node --test)
└── scripts/
    └── export.mjs              # Exporta el catálogo a JSON
```

## Scripts

| Comando           | Qué hace                                                        |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR (puerto 3001)                    |
| `npm run build`   | `tsc -b` (tipos) + build de producción de Vite                  |
| `npm run preview` | Sirve el build de producción localmente                         |
| `npm run lint`    | Análisis estático con Oxlint                                    |
| `npm run typecheck` | Comprobación de tipos de los dos proyectos TS (`tsc -b`)      |
| `npm test`        | Tests del catálogo con el test runner nativo de Node            |
| `npm run export`  | Exporta el catálogo como JSON (`--out <fichero>` para guardarlo) |

## Utilidad

- **Utilidad social:** da a una boutique pequeña un escaparate digital accesible donde enseñar sus piezas y colecciones sin necesidad de montar una tienda online completa; la persona interesada llega al catálogo y contacta directamente por WhatsApp.
- **Utilidad comercial:** funciona como vitrina y pieza de marketing de la marca (soporta la venta por cita previa), y su catálogo se expone como JSON (`npm run export`) para reutilizarse en otras webs o integraciones del ecosistema.

## Licencia

[MIT](LICENSE) © 2026 Pedro Belentani (belentani7)
