import React from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import { ShieldAlert, Layers, Keyboard } from './icons/index.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface NavbarProps {
  onOpenShortcuts: () => void;
}

export function Navbar({ onOpenShortcuts }: NavbarProps) {
  const { 
    currentRoute, 
    navigateToDashboard, 
    navigateToReview, 
    dangerousMisconceptions,
    overallReadiness,
    currentScenario
  } = useTriage();
  const weakSpotCount =
    overallReadiness.dangerousMisconceptionCount +
    overallReadiness.needsReviewCount +
    overallReadiness.knowledgeGapCount +
    overallReadiness.luckyHitCount;

  return (
    <header className="sticky top-0 z-20 bg-bg/85 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={navigateToDashboard}
            className="font-mono text-sm font-semibold text-tx hover:text-accent transition-colors flex items-center gap-0.5"
          >
            <span>fabric triage</span>
            <span className="text-accent">.</span>
          </button>

          <span className="text-muted2">/</span>
          <span className="font-mono text-xs text-muted">dp-600</span>

          {currentRoute === 'incident' && currentScenario && (
            <>
              <span className="text-muted2">/</span>
              <span className="font-mono text-xs text-muted truncate">
                case-{currentScenario.caseNumber}
              </span>
            </>
          )}

          {currentRoute === 'review' && (
            <>
              <span className="text-muted2">/</span>
              <span className="font-mono text-xs text-muted">
                weak-spots
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={navigateToDashboard}
            className={`font-mono text-xs transition-colors flex items-center gap-1.5 ${
              currentRoute === 'dashboard' ? 'text-accent font-semibold' : 'text-muted hover:text-tx'
            }`}
          >
            <Layers size={13} />
            <span>overview</span>
          </button>

          <button
            onClick={navigateToReview}
            className={`font-mono text-xs transition-colors flex items-center gap-1.5 ${
              currentRoute === 'review' ? 'text-accent font-semibold' : 'text-muted hover:text-tx'
            }`}
          >
            <ShieldAlert size={13} color={dangerousMisconceptions.length > 0 ? 'rgb(var(--danger))' : 'currentColor'} />
            <span>weak spots</span>
            {weakSpotCount > 0 && (
              <span className="bg-danger text-bg rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                {weakSpotCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenShortcuts}
            title="Keyboard shortcuts"
            className="font-mono text-xs text-muted hover:text-tx transition-colors flex items-center"
          >
            <Keyboard size={14} />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
