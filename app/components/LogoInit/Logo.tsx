'use client';
import { useMobileContext } from '@/app/utils/MobileContext/MobileContext';
import LogoSVG from '@/public/logo.svg';

export const Logo = () => {
  const { isMobile } = useMobileContext();
  if (isMobile) return <p>Лого показывается только на компьютере</p>;
  return <LogoSVG style={{ width: '50px', height: '50px', fill: '#000' }} />;
};
