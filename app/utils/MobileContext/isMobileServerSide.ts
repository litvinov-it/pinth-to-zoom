import { headers } from 'next/headers';

const isMobile = (userAgent: string | null | undefined): boolean => {
  return /Mobi|Android/i.test(userAgent || '');
};

export const isMobileServerSide = async (): Promise<boolean> => {
  const userAgent = await headers().then((header) => header.get('user-agent'));
  return isMobile(userAgent);
};
