import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "./components/SmoothScroll";
import Contact from "./pages/Contact";
const App = () => {
  return (
    <>
      <ErrorBoundary>
        <SmoothScroll>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipo" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/proyectos" element={<Projects />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </SmoothScroll>
      </ErrorBoundary>
    </>
  );
};

export default App;
