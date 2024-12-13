'use client';
import { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

// Динамическая загрузка gsap и плагинов
const loadGSAP = async () => {
  const { default: gsap } = await import('gsap');
  const { ScrollSmoother } = await import('gsap/ScrollSmoother');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

  return { gsap, ScrollSmoother, ScrollTrigger };
};

export const ScrollSmootherInit = ({ children }: IProps) => {
  useEffect(() => {
    let smoother: ScrollSmoother | null = null;

    loadGSAP().then(({ ScrollSmoother }) => {
      smoother = ScrollSmoother.create({
        wrapper: '#smoother-wrapper',
        content: '#smoother-content',
        smooth: 1.5,
        smoothTouch: 0.1,
        effects: true,
      });
    });

    return () => {
      // Уничтожаем ScrollSmoother при размонтировании
      smoother?.kill();
    };
  }, []);

  return (
    <div id="smoother-wrapper">
      <div id="smoother-content">{children}</div>
    </div>
  );
};
