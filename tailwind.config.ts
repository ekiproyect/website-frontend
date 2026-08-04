import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Space Grotesk", 'sans-serif' ],
				heading: ['Syne', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				accent: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'tech-blue': 'hsl(var(--tech-blue))',
				'tech-purple': 'hsl(var(--tech-purple))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Modal de proyectos. Los keyframes que sí animan transform
				// llevan el translate(-50%,-50%) completo, porque el panel se
				// centra por transform y animarlo lo pisaría.
				'overlay-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'overlay-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'panel-in': {
					from: { opacity: '0', transform: 'translate(-50%, calc(-50% + 24px))' },
					to: { opacity: '1', transform: 'translate(-50%, -50%)' }
				},
				'panel-out': {
					from: { opacity: '1', transform: 'translate(-50%, -50%)' },
					to: { opacity: '0', transform: 'translate(-50%, calc(-50% + 12px))' }
				},
				// Entrada escalonada del contenido del modal.
				rise: {
					from: { opacity: '0', transform: 'translateY(14px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				// Relevo al cambiar de proyecto o de slide, donde no hay Flip.
				fade: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Mismo easing que el menú móvil (FloatingNav). `both` es
				// necesario: sin él los elementos escalonados se ven antes de
				// que arranque su animation-delay.
				'overlay-in': 'overlay-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
				'overlay-out': 'overlay-out 200ms cubic-bezier(0.22, 1, 0.36, 1) both',
				'panel-in': 'panel-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
				'panel-out': 'panel-out 220ms cubic-bezier(0.22, 1, 0.36, 1) both',
				rise: 'rise 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
				fade: 'fade 300ms cubic-bezier(0.22, 1, 0.36, 1) both'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
