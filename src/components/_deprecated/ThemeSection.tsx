import type { ReactNode } from 'react';

interface ThemeSectionProps {
  theme?: 'light' | 'dark' | 'dark-soft';
  className?: string;
  children: ReactNode;
}

const themeClasses = {
  light: 'bg-zinc-50 text-zinc-900',
  dark: 'bg-zinc-950 text-white',
  'dark-soft': 'bg-[#111214] text-white',
};

export function ThemeSection({
  theme = 'light',
  className = '',
  children,
}: ThemeSectionProps) {
  return (
    <section className={`${themeClasses[theme]} ${className}`}>
      {children}
    </section>
  );
}