import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const HorizontalScrollSection = ({ items }: HorizontalScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      <div className="absolute inset-0 flex items-center">
        <div ref={scrollContainerRef} className="flex gap-8 px-8">
          {items.map((item, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[500px] h-[600px] bg-black/50 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-2/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-sm uppercase tracking-wider">Desliza horizontalmente</span>
      </div>
    </section>
  );
};
