import React from 'react';
import type { Scenario, ConfidenceLevel } from '../types/scenario.ts';
import { renderFormattedText } from '../utils/codeHighlighter.tsx';

const KEYS = ['1', '2', '3', '4'];
const CODES = ['A', 'B', 'C', 'D'];

interface RemediationCardsProps {
  scenario: Scenario;
  selectedChoiceId: string;
  onSelectChoice: (id: string) => void;
  confidence: ConfidenceLevel | null;
  onSelectConfidence: (level: ConfidenceLevel) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function RemediationCards({
  scenario,
  selectedChoiceId,
  onSelectChoice,
  confidence,
  onSelectConfidence,
  onSubmit,
  isSubmitting
}: RemediationCardsProps) {
  return (
    <div className="bg-surface border border-border rounded-xl shadow-card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
              Operational Triage
            </span>
            <span className="text-muted2 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-muted">Incident Remediation Console</span>
          </div>
          <h3 className="font-display text-base font-bold text-tx mt-1">
            Evaluate proposed architectural fixes and deploy the definitive patch:
          </h3>
        </div>

        <span className="font-mono text-xs text-muted2">
          Select [1-4] or Click • Press [G/S/C] to rate confidence
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {scenario.choices.map((choice, idx) => {
          const isSelected = selectedChoiceId === choice.id;
          const layer = choice.layer;

          return (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice.id)}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-3 relative ${
                isSelected
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-sm'
                  : 'border-border bg-surface hover:border-muted hover:bg-surface2/30'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    isSelected
                      ? 'bg-accent text-bg border-accent'
                      : 'bg-surface2 text-muted border-border'
                  }`}>
                    PROPOSAL {CODES[idx]} [{KEYS[idx]}]
                  </span>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface2/70 border border-border font-mono text-[11px] text-muted">
                    <img
                      src={layer.iconSrc}
                      alt=""
                      className="w-3.5 h-3.5 object-contain flex-shrink-0"
                    />
                    <span className="font-semibold text-tx">{layer.label}</span>
                    <span className="text-muted2">•</span>
                    <span className="text-muted text-[10px] uppercase tracking-wider">{layer.category}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="font-mono text-[11px] font-bold text-accent flex items-center gap-1">
                    ● Active Selection
                  </span>
                )}
              </div>

              <div className="text-sm font-medium text-tx leading-relaxed">
                {renderFormattedText(choice.label)}
              </div>

              {choice.technicalDetails && (
                <div className="pt-2.5 border-t border-border/70 flex items-start gap-2 text-xs font-mono text-muted">
                  <span className="text-muted2 flex-shrink-0 font-semibold">Implementation:</span>
                  <div className="text-tx/90 font-sans leading-normal">
                    {renderFormattedText(choice.technicalDetails)}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-5 bg-surface2/50 rounded-xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase tracking-wider text-tx font-bold">
            Operator Confidence Calibration
          </span>
          <span className="font-mono text-xs text-muted mt-0.5">
            Calibrate your certainty score before executing the operational remediation.
          </span>
        </div>

        <div className="flex gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onSelectConfidence('guessing')}
            className={`flex-1 sm:flex-initial font-mono text-xs px-3.5 py-2 rounded-lg border text-center transition-all cursor-pointer ${
              confidence === 'guessing'
                ? 'border-accent bg-accent text-bg font-bold shadow-xs'
                : 'border-border text-tx hover:border-muted bg-surface'
            }`}
          >
            [G] Guessing (Low)
          </button>

          <button
            onClick={() => onSelectConfidence('fairly_sure')}
            className={`flex-1 sm:flex-initial font-mono text-xs px-3.5 py-2 rounded-lg border text-center transition-all cursor-pointer ${
              confidence === 'fairly_sure'
                ? 'border-accent bg-accent text-bg font-bold shadow-xs'
                : 'border-border text-tx hover:border-muted bg-surface'
            }`}
          >
            [S] Probable (Mid)
          </button>

          <button
            onClick={() => onSelectConfidence('confident')}
            className={`flex-1 sm:flex-initial font-mono text-xs px-3.5 py-2 rounded-lg border text-center transition-all cursor-pointer ${
              confidence === 'confident'
                ? 'border-accent bg-accent text-bg font-bold shadow-xs'
                : 'border-border text-tx hover:border-muted bg-surface'
            }`}
          >
            [C] Confident (High)
          </button>
        </div>
      </div>

      <button
        disabled={!selectedChoiceId || !confidence || isSubmitting}
        onClick={onSubmit}
        className="w-full py-3 px-5 rounded-lg font-sans text-sm font-bold bg-accent text-bg hover:bg-accent-dim transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        <span>
          {isSubmitting
            ? 'Deploying Incident Patch...'
            : selectedChoiceId && confidence
            ? 'Deploy Incident Remediation Patch [Enter]'
            : 'Select a Proposal & Confidence Level to Deploy'}
        </span>
      </button>
    </div>
  );
}
