import Home from './pages/Home';

/**
 * La app tiene una única ruta: el catálogo (`/`). App la enruta a la
 * landing `pages/Home`. Se sirve en la raíz con Vite/Vercel y bajo
 * `/boutique-catalogo/` en GitHub Pages (build con `--base=./`, ver
 * `.github/workflows/deploy-pages.yml`), por eso no se usa una librería
 * de routing: habría una sola ruta declarada.
 */
function App() {
  return <Home />;
}

export default App;
