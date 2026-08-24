import React, { useState } from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import { RotateCcw } from './icons/index.tsx';

export function Footer() {
  const { clearAllAttempts, seedDemoAttempts, overallReadiness } = useTriage();
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const handleReset = async () => {
    if (window.confirm('Reset all triage attempts and calibration history for this session?')) {
      setIsResetting(true);
      await clearAllAttempts();
      setIsResetting(false);
    }
  };

  return (
    <footer className="border-t border-border bg-bg px-6 py-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="font-mono text-sm font-semibold text-tx">
              fabric triage<span className="text-accent">.</span>
            </span>
            <span className="font-mono text-xs block text-muted2 mt-0.5">
              DP-600 incident scenarios &amp; practice · <a href="https://outskill.it" target="_blank" rel="noreferrer" className="text-accent hover:underline font-semibold">outskill.it</a> by G.J. van Berlo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                setIsResetting(true);
                await seedDemoAttempts();
                setIsResetting(false);
              }}
              disabled={isResetting}
              className="py-1.5 px-3 rounded font-mono text-xs text-muted border border-border hover:border-muted hover:text-tx transition-colors cursor-pointer"
              title="Pre-populate calibrated attempts for demo and evaluation"
            >
              <span>load demo data</span>
            </button>

            {overallReadiness.totalAttempted > 0 && (
              <button
                onClick={handleReset}
                disabled={isResetting}
                className="py-1.5 px-3 rounded font-mono text-xs text-danger border border-border hover:border-danger hover:bg-danger/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all triage attempts and start fresh"
              >
                <RotateCcw size={11} />
                <span>{isResetting ? 'resetting...' : 'reset progress'}</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted2 leading-relaxed">
          Original practice scenarios based on publicly documented Microsoft Fabric DP-600 skills. All scenarios and logs are fictional.
        </p>
      </div>
    </footer>
  );
}
