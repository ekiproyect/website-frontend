import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-8xl mb-8">🤖</div>
        <h1 className="text-6xl font-bold mb-4 text-accent">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">
          ¡Oops! Esta página no existe
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Parece que te has perdido. La página que buscas no se encuentra disponible.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-accent to-tech-blue text-accent-foreground hover:shadow-lg hover:scale-105 transform h-10 px-8 py-2"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
