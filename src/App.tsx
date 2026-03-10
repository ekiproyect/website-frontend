import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "./components/SmoothScroll";
import { Suspense, lazy } from 'react';
const App = () => {
  const Home = lazy(() => import('./pages/Home')); // O el nombre de tu Home
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
  return (
    <>
      <ErrorBoundary>
        <SmoothScroll>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            
            <BrowserRouter>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Cargando...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipo" element={<About />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          
            </Suspense>
            </BrowserRouter>
          </TooltipProvider>
          </SmoothScroll>
      </ErrorBoundary>
    </>
  );
};

export default App;
