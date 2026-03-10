import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary - Captura errores en el árbol de componentes
 * 
 * Uso:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * Features:
 * - UI amigable con opción de reload
 * - Log de errores para debugging
 * - Botón para volver al home
 * - Responsive y accesible
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar estado para mostrar fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error para debugging
    console.error('🚨 ErrorBoundary capturó un error:', error);
    console.error('📍 Component stack:', errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Enviar a servicio de logging (Sentry, LogRocket, etc.)
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Usar fallback customizado si se provee
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      // Fallback UI por defecto
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 px-6">
          <div className="max-w-2xl w-full">
            {/* Card principal */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8 md:p-12 shadow-2xl">
              {/* Icono de error */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full p-6 border border-red-500/30">
                    <AlertTriangle className="w-12 h-12 text-red-400" />
                  </div>
                </div>
              </div>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl font-black text-center mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Algo salió mal
              </h1>

              {/* Descripción */}
              <p className="text-gray-400 text-center mb-8 text-lg">
                Lo sentimos, ocurrió un error inesperado. Puedes intentar recargar la página o volver al inicio.
              </p>

              {/* Detalles técnicos (solo en dev) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 bg-black/40 rounded-lg border border-red-500/20 p-4">
                  <summary className="cursor-pointer text-red-300 font-medium mb-2 hover:text-red-200 transition-colors">
                    🐛 Detalles técnicos (solo visible en desarrollo)
                  </summary>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Error:</p>
                      <code className="block text-xs text-red-400 bg-black/50 p-3 rounded overflow-x-auto">
                        {this.state.error.toString()}
                      </code>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Component Stack:</p>
                        <code className="block text-xs text-gray-400 bg-black/50 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </code>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleReload}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
                >
                  <RefreshCw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Recargar página
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Volver al inicio
                </Button>
              </div>

              {/* Footer con info adicional */}
              <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                <p className="text-gray-500 text-sm">
                  Si el problema persiste, contáctanos en{' '}
                  <a 
                    href="mailto:contacto@ekiproyect.com" 
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    contacto@ekiproyect.com
                  </a>
                </p>
              </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
