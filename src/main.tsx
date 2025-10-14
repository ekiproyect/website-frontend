import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Forzar scroll al inicio de manera más agresiva
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Múltiples intentos para asegurar que funcione
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// También después de un frame
requestAnimationFrame(() => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

createRoot(document.getElementById("root")!).render(<App />);
