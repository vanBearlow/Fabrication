import React, { useState } from 'react';
import { useTriage } from '../context/TriageContext.tsx';
import type { Scenario } from '../types/scenario.ts';

type QueueTab = 'misconceptions' | 'review' | 'gaps' | 'lucky' | 'solid' | 'strong';

export function MisconceptionQueue() {
  const { 
    dangerousMisconceptions, 
    needsReviewScenarios,
    knowledgeGaps, 
    luckyHits, 
    solidUnderstandingScenarios,
    strongAreas, 
    navigateToIncident, 
    startWeakSpotsTriage 
  } = useTriage();

  const [activeTab, setActiveTab] = useState<QueueTab>('misconceptions');

  const totalFlagged = dangerousMisconceptions.length + needsReviewScenarios.length + knowledgeGaps.length + luckyHits.length;

  if (totalFlagged === 0 && strongAreas.length === 0 && solidUnderstandingScenarios.length === 0) {
    return null;
  }

  const renderQueueItem = (scenario: Scenario, type: 'dangerous' | 'review' | 'gap' | 'lucky' | 'solid' | 'strong') => {
    const isDanger = type === 'dangerous';
    const isGap = type === 'gap';
    const isLucky = type === 'lucky';
    const isReview = type === 'review';

    return (
      <div
        key={scenario.id}
        onClick={() => navigateToIncident(scenario.slug)}
        className="flex items-center gap-4 py-3 border-t border-border hover:bg-surface2/50 px-2 rounded transition-colors cursor-pointer"
      >
        <span
          className={`font-mono text-xs flex-shrink-0 w-5 text-center ${
            isDanger ? 'text-danger' : isGap ? 'text-muted' : isLucky || isReview ? 'text-accent' : 'text-success'
          }`}
        >
          {isDanger ? '✗' : isGap ? '?' : isLucky ? '★' : isReview ? '!' : '✓'}
        </span>

        <span className="font-mono text-xs text-muted flex-shrink-0">
          case-{scenario.caseNumber}
        </span>

        <span className="text-sm font-medium text-tx flex-1 leading-snug truncate">
          {scenario.title}
        </span>

        <span className="font-mono text-xs text-muted2 flex-shrink-0">
          {scenario.skillArea}
        </span>

        <span className={`font-mono text-xs flex-shrink-0 ${
          isDanger ? 'text-danger' : isGap ? 'text-muted' : isLucky || isReview ? 'text-accent' : 'text-success'
        }`}>
          [{type.replace('_', ' ')}]
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted uppercase tracking-widest">
          calibration queues
        </p>

        {totalFlagged > 0 && (
          <button
            onClick={startWeakSpotsTriage}
            className="font-mono text-xs text-danger hover:text-tx transition-colors"
          >
            ▸ triage {totalFlagged} weak spot(s)
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('misconceptions')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'misconceptions' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          misconceptions ({dangerousMisconceptions.length})
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'review' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          needs review ({needsReviewScenarios.length})
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'gaps' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          knowledge gaps ({knowledgeGaps.length})
        </button>

        <button
          onClick={() => setActiveTab('lucky')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'lucky' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          lucky hits ({luckyHits.length})
        </button>

        <button
          onClick={() => setActiveTab('strong')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'strong' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          strong signals ({strongAreas.length})
        </button>

        <button
          onClick={() => setActiveTab('solid')}
          className={`font-mono text-xs transition-colors ${
            activeTab === 'solid' ? 'text-accent border-b-2 border-accent -mb-[9px] font-semibold' : 'text-muted hover:text-tx'
          }`}
        >
          solid understanding ({solidUnderstandingScenarios.length})
        </button>
      </div>

      <div className="flex flex-col">
        {activeTab === 'misconceptions' && (
          dangerousMisconceptions.length > 0 ? (
            dangerousMisconceptions.map(s => renderQueueItem(s, 'dangerous'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No dangerous misconceptions recorded. High confidence matches verified Fabric behavior.
            </div>
          )
        )}

        {activeTab === 'review' && (
          needsReviewScenarios.length > 0 ? (
            needsReviewScenarios.map(s => renderQueueItem(s, 'review'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No probable-but-wrong answers recorded.
            </div>
          )
        )}

        {activeTab === 'gaps' && (
          knowledgeGaps.length > 0 ? (
            knowledgeGaps.map(s => renderQueueItem(s, 'gap'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No knowledge gaps recorded.
            </div>
          )
        )}

        {activeTab === 'lucky' && (
          luckyHits.length > 0 ? (
            luckyHits.map(s => renderQueueItem(s, 'lucky'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No lucky hits recorded.
            </div>
          )
        )}

        {activeTab === 'strong' && (
          strongAreas.length > 0 ? (
            strongAreas.map(s => renderQueueItem(s, 'strong'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No strong signals recorded yet.
            </div>
          )
        )}

        {activeTab === 'solid' && (
          solidUnderstandingScenarios.length > 0 ? (
            solidUnderstandingScenarios.map(s => renderQueueItem(s, 'solid'))
          ) : (
            <div className="py-5 px-2 text-xs text-muted">
              No probable-and-correct answers recorded yet.
            </div>
          )
        )}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
