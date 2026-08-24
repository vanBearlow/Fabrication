import React, { useState } from 'react';
import { TriageProvider, useTriage } from './context/TriageContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ReadinessPulse } from './components/ReadinessPulse.tsx';
import { DomainCards } from './components/DomainCards.tsx';
import { MisconceptionQueue } from './components/MisconceptionQueue.tsx';
import { IncidentView } from './components/IncidentView.tsx';
import { ReviewMode } from './components/ReviewMode.tsx';
import { ShortcutModal } from './components/ShortcutModal.tsx';
import { Footer } from './components/Footer.tsx';

function AppContent() {
  const { currentRoute } = useTriage();
  const [isShortcutOpen, setIsShortcutOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-bg text-tx font-sans flex flex-col">
      <Navbar onOpenShortcuts={() => setIsShortcutOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
        {currentRoute === 'dashboard' && (
          <div className="animate-fade-in flex flex-col gap-10">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-tx">Fabric Incident Triage.</h1>
              <p className="font-mono text-sm text-muted mt-2">DP-600 incident scenarios &amp; practice</p>
            </div>

            <ReadinessPulse />
            <DomainCards />
            <MisconceptionQueue />
          </div>
        )}

        {currentRoute === 'incident' && (
          <IncidentView />
        )}

        {currentRoute === 'review' && (
          <ReviewMode />
        )}
      </main>

      <Footer />
      <ShortcutModal 
        isOpen={isShortcutOpen} 
        onClose={() => setIsShortcutOpen(false)} 
      />
    </div>
  );
}

export function App() {
  return (
    <TriageProvider>
      <AppContent />
    </TriageProvider>
  );
}

export default App;
