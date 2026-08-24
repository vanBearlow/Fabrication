import React, { useState, useEffect, useCallback } from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import type { ConfidenceLevel } from '../types/scenario.ts';
import { IncidentTicket } from './IncidentTicket.tsx';
import { ArchitectureFlow } from './ArchitectureFlow.tsx';
import { VisualEvidence } from './VisualEvidence.tsx';
import { RemediationCards } from './RemediationCards.tsx';
import { AnswerReveal } from './AnswerReveal.tsx';
import { ArrowLeft, ArrowRight } from './icons/index.tsx';

const KEYS = ['1', '2', '3', '4'];

export function IncidentView() {
  const { 
    currentScenario, 
    latestAttempts, 
    submitDiagnosis, 
    navigateToDashboard,
    scenarios,
    navigateToIncident
  } = useTriage();

  const existingAttempt = currentScenario ? latestAttempts.get(currentScenario.slug) : undefined;

  const [selectedChoiceId, setSelectedChoiceId] = useState<string>('');
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAnswerReveal, setShowAnswerReveal] = useState<boolean>(false);

  useEffect(() => {
    if (existingAttempt) {
      setSelectedChoiceId(existingAttempt.selectedChoiceId);
      setConfidence(existingAttempt.confidence);
      setShowAnswerReveal(true);
    } else {
      setSelectedChoiceId('');
      setConfidence(null);
      setShowAnswerReveal(false);
    }
  }, [currentScenario?.slug, existingAttempt]);

  const handleSubmit = useCallback(async () => {
    if (!currentScenario || !selectedChoiceId || !confidence || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitDiagnosis({
        scenarioSlug: currentScenario.slug,
        selectedChoiceId,
        confidence
      });
      setShowAnswerReveal(true);
    } catch (err) {
      console.error('Failed submitting diagnosis', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [currentScenario, selectedChoiceId, confidence, isSubmitting, submitDiagnosis]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentScenario) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (!showAnswerReveal) {
        const idx = KEYS.indexOf(e.key);
        if (idx !== -1 && currentScenario.choices[idx]) {
          setSelectedChoiceId(currentScenario.choices[idx].id);
        }

        if (e.key.toLowerCase() === 'g') setConfidence('guessing');
        if (e.key.toLowerCase() === 's') setConfidence('fairly_sure');
        if (e.key.toLowerCase() === 'c') setConfidence('confident');

        if (e.key === 'Enter' && selectedChoiceId && confidence && !isSubmitting) {
          handleSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScenario, selectedChoiceId, confidence, isSubmitting, showAnswerReveal, handleSubmit]);

  if (!currentScenario) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">Scenario not found.</p>
        <button onClick={navigateToDashboard} className="btn-accent mt-4">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentIndex = scenarios.findIndex(s => s.slug === currentScenario.slug);
  const prevScenario = currentIndex > 0 ? scenarios[currentIndex - 1] : null;
  const nextScenario = currentIndex < scenarios.length - 1 ? scenarios[currentIndex + 1] : null;
  const progress = (currentScenario.caseNumber / scenarios.length) * 100;
  const diagnosticEvidence = currentScenario.evidence.filter((evidence) => evidence.stage !== 'solution');

  return (
    <div className="animate-fade-in flex flex-col gap-6 pb-16 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={navigateToDashboard}
              className="font-mono text-xs text-muted hover:text-tx transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={11} /> <span>dashboard</span>
            </button>
            <span className="text-muted2">/</span>
            <span className="font-mono text-xs text-muted truncate">
              case-{currentScenario.caseNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={!prevScenario}
              onClick={() => prevScenario && navigateToIncident(prevScenario.slug)}
              className={`font-mono text-xs flex items-center gap-1 transition-colors ${
                prevScenario ? 'text-muted hover:text-tx' : 'text-border cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={11} /> prev
            </button>
            <span className="text-border">|</span>
            <button
              disabled={!nextScenario}
              onClick={() => nextScenario && navigateToIncident(nextScenario.slug)}
              className={`font-mono text-xs flex items-center gap-1 transition-colors ${
                nextScenario ? 'text-muted hover:text-tx' : 'text-border cursor-not-allowed'
              }`}
            >
              next <ArrowRight size={11} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-muted flex-shrink-0">
            Case {currentScenario.caseNumber}/{scenarios.length}
          </span>
        </div>
      </div>

      <IncidentTicket scenario={currentScenario} />
      <ArchitectureFlow scenario={currentScenario} />
      <VisualEvidence evidenceList={diagnosticEvidence} />

      {!showAnswerReveal ? (
        <RemediationCards
          scenario={currentScenario}
          selectedChoiceId={selectedChoiceId}
          onSelectChoice={setSelectedChoiceId}
          confidence={confidence}
          onSelectConfidence={setConfidence}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        existingAttempt && (
          <div className="bg-surface border border-border rounded-lg shadow-card p-6">
            <AnswerReveal
              scenario={currentScenario}
              attempt={existingAttempt}
              onRetry={() => setShowAnswerReveal(false)}
            />
          </div>
        )
      )}
    </div>
  );
}
