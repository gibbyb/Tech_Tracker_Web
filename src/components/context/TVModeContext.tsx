"use client";
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TVModeContextProps {
  tvMode: boolean;
  toggleTVMode: () => void;
}

const TVModeContext = createContext<TVModeContextProps | undefined>(undefined);

export const TVModeProvider = ({ children }: { children: ReactNode }) => {
  const [tvMode, setTVMode] = useState(false);
  
  const toggleTVMode = () => {
    setTVMode((prev) => !prev);
  };

  return (
    <TVModeContext.Provider value={{ tvMode, toggleTVMode }}>
      {children}
    </TVModeContext.Provider>
  );
};

export const useTVMode = () => {
  const context = useContext(TVModeContext);
  if (!context) {
    throw new Error('useTVMode must be used within a TVModeProvider');
  }
  return context;
};
