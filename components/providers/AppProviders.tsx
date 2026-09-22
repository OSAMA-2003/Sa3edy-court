'use client';

import React from 'react';
import { LanguageProvider } from '../../i18n/LanguageContext';
import { AuthProvider } from '../../context/AuthContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
};
