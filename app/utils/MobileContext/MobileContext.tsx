'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useWindowResize } from '../useWindowResize';

interface IProps {
  children: React.ReactNode;
  initialIsMobile: boolean;
}

interface MobileContextProps {
  isMobile: boolean;
}

const MobileContext = createContext<MobileContextProps | undefined>(undefined);

export const MobileProvider: React.FC<IProps> = ({
  children,
  initialIsMobile,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(initialIsMobile);
  const { width } = useWindowResize();

  useEffect(() => setIsMobile(width <= 768), [width]);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobileContext must be used within a MobileProvider');
  }
  return context;
};
