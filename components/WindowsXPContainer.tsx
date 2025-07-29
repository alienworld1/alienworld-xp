'use client';

import { useState } from 'react';
import BootAnimation from './BootAnimation';
import LogonUI from './LogonUI';

type AppState = 'booting' | 'logon' | 'desktop';

export default function WindowsXPContainer() {
  const [appState, setAppState] = useState<AppState>('booting');

  const handleBootComplete = () => {
    setAppState('logon');
  };

  const handleLogin = () => {
    setAppState('desktop');
  };

  switch (appState) {
    case 'booting':
      return <BootAnimation onBootComplete={handleBootComplete} />;

    case 'logon':
      return <LogonUI onLogin={handleLogin} />;

    case 'desktop':
      return (
        <div className="min-h-screen bg-green-500 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">
            desktop is still in development
          </div>
        </div>
      );

    default:
      return null;
  }
}
