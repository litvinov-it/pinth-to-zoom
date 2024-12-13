import { headers } from 'next/headers';

const isMobile = (userAgent: string | null | undefined): boolean => {
  return /Mobi|Android/i.test(userAgent || '');
};

export const isMobileServerSide = (): boolean => {
  const userAgent: string | null = headers().get('user-agent');
  return isMobile(userAgent);
};
