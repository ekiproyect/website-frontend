import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Technologies from "./pages/Technologies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {

  return (
    <>
      {/* Loading Screen - Mostrar solo al inicio */}


      {/* App principal */}
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/technologies" element={<Technologies />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
