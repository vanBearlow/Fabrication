import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { 
  Scenario, 
  ConfidenceLevel, 
  MisconceptionType, 
  DomainKey 
} from '../types/scenario.ts';
import { DOMAINS } from '../types/scenario.ts';
import type { 
  Attempt, 
  OverallReadiness, 
  DomainStats, 
  UserClaims 
} from '../types/attempt.ts';
import { SCENARIOS, getScenarioBySlug } from '../content/scenarios.ts';
import { rayfinClient, type BackendStatus } from '../rayfin/client.ts';
import { calculateMisconceptionType } from '../utils/misconception.ts';

export interface TriageContextValue {
  scenarios: Scenario[];
  currentScenario: Scenario | null;
  currentRoute: 'dashboard' | 'incident' | 'review';
  attempts: Attempt[];
  latestAttempts: Map<string, Attempt>;
  overallReadiness: OverallReadiness;
  backendStatus: BackendStatus;
  userClaims: UserClaims;
  isLoading: boolean;
  
  navigateToDashboard: () => void;
  navigateToIncident: (slug: string) => void;
  navigateToReview: () => void;
  navigateToNextIncident: () => void;
  startTriage: () => void;
  startWeakSpotsTriage: () => void;
  submitDiagnosis: (params: {
    scenarioSlug: string;
    selectedChoiceId: string;
    confidence: ConfidenceLevel;
  }) => Promise<{ attempt: Attempt; misconceptionType: MisconceptionType }>;
  clearAllAttempts: () => Promise<void>;
  seedDemoAttempts: () => Promise<void>;
  
  dangerousMisconceptions: Scenario[];
  knowledgeGaps: Scenario[];
  luckyHits: Scenario[];
  strongAreas: Scenario[];
  solidUnderstandingScenarios: Scenario[];
  needsReviewScenarios: Scenario[];
  unattemptedScenarios: Scenario[];
}

const TriageContext = createContext<TriageContextValue | null>(null);

export const TriageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<'dashboard' | 'incident' | 'review'>('dashboard');
  const [currentSlug, setCurrentSlug] = useState<string>(SCENARIOS[0].slug);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>(rayfinClient.getStatus());
  const [userClaims] = useState<UserClaims>(rayfinClient.getUserClaims());

  const loadAttempts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await rayfinClient.getMyAttempts();
      setAttempts(data);
      setBackendStatus(rayfinClient.getStatus());
    } catch (err) {
      console.error('Failed loading triage attempts', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttempts();
  }, [loadAttempts]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (hash.startsWith('#/case/')) {
        const slug = hash.replace('#/case/', '');
        if (getScenarioBySlug(slug)) {
          setCurrentSlug(slug);
          setCurrentRoute('incident');
          return;
        }
      } else if (hash === '#/review') {
        setCurrentRoute('review');
        return;
      } else if (path.startsWith('/case/')) {
        const slug = path.replace('/case/', '');
        if (getScenarioBySlug(slug)) {
          setCurrentSlug(slug);
          setCurrentRoute('incident');
          return;
        }
      } else if (path === '/review') {
        setCurrentRoute('review');
        return;
      }
      
      setCurrentRoute('dashboard');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const latestAttempts = useMemo(() => {
    const map = new Map<string, Attempt>();
    const sorted = [...attempts].sort((a, b) => 
      new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime()
    );
    for (const att of sorted) {
      map.set(att.scenarioSlug, att);
    }
    return map;
  }, [attempts]);

  const dangerousMisconceptions = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && !att.correct && att.confidence === 'confident';
    });
  }, [latestAttempts]);

  const knowledgeGaps = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && !att.correct && att.confidence === 'guessing';
    });
  }, [latestAttempts]);

  const needsReviewScenarios = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && !att.correct && att.confidence === 'fairly_sure';
    });
  }, [latestAttempts]);

  const luckyHits = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && att.correct && att.confidence === 'guessing';
    });
  }, [latestAttempts]);

  const strongAreas = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && att.correct && att.confidence === 'confident';
    });
  }, [latestAttempts]);

  const solidUnderstandingScenarios = useMemo(() => {
    return SCENARIOS.filter(s => {
      const att = latestAttempts.get(s.slug);
      return att && att.correct && att.confidence === 'fairly_sure';
    });
  }, [latestAttempts]);

  const unattemptedScenarios = useMemo(() => {
    return SCENARIOS.filter(s => !latestAttempts.has(s.slug));
  }, [latestAttempts]);

  const overallReadiness = useMemo<OverallReadiness>(() => {
    const domainKeys: DomainKey[] = ['prepare_data', 'maintain_analytics', 'semantic_models'];
    
    const domainStats = {} as Record<DomainKey, DomainStats>;
    let totalAttempted = 0;
    let totalCorrect = 0;

    let dangerousCount = 0;
    let gapCount = 0;
    let luckyCount = 0;
    let strongCount = 0;
    let solidCount = 0;
    let reviewCount = 0;

    for (const key of domainKeys) {
      const meta = DOMAINS[key];
      const domainScenarios = SCENARIOS.filter(s => s.domain === key);
      let attemptedInDomain = 0;
      let correctInDomain = 0;
      let dCount = 0;
      let nrCount = 0;
      let kgCount = 0;
      let lhCount = 0;
      let ssCount = 0;
      let suCount = 0;

      for (const sc of domainScenarios) {
        const att = latestAttempts.get(sc.slug);
        if (att) {
          attemptedInDomain += 1;
          if (att.correct) correctInDomain += 1;

          if (!att.correct && att.confidence === 'confident') dCount += 1;
          else if (!att.correct && att.confidence === 'fairly_sure') nrCount += 1;
          else if (!att.correct && att.confidence === 'guessing') kgCount += 1;
          else if (att.correct && att.confidence === 'guessing') lhCount += 1;
          else if (att.correct && att.confidence === 'confident') ssCount += 1;
          else if (att.correct && att.confidence === 'fairly_sure') suCount += 1;
        }
      }

      totalAttempted += attemptedInDomain;
      totalCorrect += correctInDomain;
      dangerousCount += dCount;
      reviewCount += nrCount;
      gapCount += kgCount;
      luckyCount += lhCount;
      strongCount += ssCount;
      solidCount += suCount;

      const scorePercent = attemptedInDomain > 0
        ? Math.round((correctInDomain / attemptedInDomain) * 100)
        : null;

      domainStats[key] = {
        domain: key,
        title: meta.title,
        practiceWeight: meta.practiceWeight,
        totalIncidents: domainScenarios.length,
        attemptedCount: attemptedInDomain,
        correctCount: correctInDomain,
        scorePercent,
        dangerousMisconceptions: dCount,
        needsReview: nrCount,
        knowledgeGaps: kgCount,
        luckyHits: lhCount,
        strongSignals: ssCount,
        solidUnderstanding: suCount
      };
    }

    const accuracyPercent = totalAttempted > 0
      ? Math.round((totalCorrect / totalAttempted) * 100)
      : null;
    const coveragePercent = Math.round((totalAttempted / SCENARIOS.length) * 100);

    return {
      accuracyPercent,
      coveragePercent,
      totalAttempted,
      totalCorrect,
      totalScenarios: SCENARIOS.length,
      assessmentComplete: totalAttempted === SCENARIOS.length,
      domainStats,
      dangerousMisconceptionCount: dangerousCount,
      knowledgeGapCount: gapCount,
      luckyHitCount: luckyCount,
      strongSignalCount: strongCount,
      solidUnderstandingCount: solidCount,
      needsReviewCount: reviewCount
    };
  }, [latestAttempts]);

  const navigateToDashboard = useCallback(() => {
    setCurrentRoute('dashboard');
    window.location.hash = '#/';
  }, []);

  const navigateToIncident = useCallback((slug: string) => {
    setCurrentSlug(slug);
    setCurrentRoute('incident');
    window.location.hash = `#/case/${slug}`;
  }, []);

  const navigateToReview = useCallback(() => {
    setCurrentRoute('review');
    window.location.hash = '#/review';
  }, []);

  const currentScenario = useMemo(() => {
    return getScenarioBySlug(currentSlug) || SCENARIOS[0];
  }, [currentSlug]);

  const navigateToNextIncident = useCallback(() => {
    if (!currentScenario) return;
    const currentIndex = SCENARIOS.findIndex(s => s.slug === currentScenario.slug);
    if (currentIndex < SCENARIOS.length - 1) {
      const next = SCENARIOS[currentIndex + 1];
      navigateToIncident(next.slug);
    } else {
      navigateToDashboard();
    }
  }, [currentScenario, navigateToIncident, navigateToDashboard]);

  const startTriage = useCallback(() => {
    const firstUnattempted = SCENARIOS.find(s => !latestAttempts.has(s.slug));
    if (firstUnattempted) {
      navigateToIncident(firstUnattempted.slug);
    } else {
      navigateToIncident(SCENARIOS[0].slug);
    }
  }, [latestAttempts, navigateToIncident]);

  const startWeakSpotsTriage = useCallback(() => {
    const priority = [
      ...dangerousMisconceptions,
      ...needsReviewScenarios,
      ...knowledgeGaps,
      ...luckyHits,
      ...unattemptedScenarios
    ];

    if (priority.length > 0) {
      navigateToIncident(priority[0].slug);
    } else {
      navigateToIncident(SCENARIOS[0].slug);
    }
  }, [dangerousMisconceptions, knowledgeGaps, needsReviewScenarios, luckyHits, unattemptedScenarios, navigateToIncident]);

  const submitDiagnosis = useCallback(async (params: {
    scenarioSlug: string;
    selectedChoiceId: string;
    confidence: ConfidenceLevel;
  }) => {
    const scenario = getScenarioBySlug(params.scenarioSlug);
    if (!scenario) {
      throw new Error(`Scenario not found: ${params.scenarioSlug}`);
    }

    const correct = params.selectedChoiceId === scenario.correctChoiceId;
    const misconceptionType = calculateMisconceptionType(correct, params.confidence);

    const newAttempt = await rayfinClient.recordAttempt({
      scenarioSlug: params.scenarioSlug,
      domain: scenario.domain,
      selectedChoiceId: params.selectedChoiceId,
      correct,
      confidence: params.confidence,
      misconceptionType
    });

    setAttempts(prev => [...prev, newAttempt]);
    return { attempt: newAttempt, misconceptionType };
  }, []);

  const seedDemoAttempts = useCallback(async () => {
    const demoConfigs: Array<{ scenarioId: string; choiceId: string; confidence: ConfidenceLevel }> = [
      { scenarioId: 'sc-01', choiceId: 'choice-a', confidence: 'confident' },
      { scenarioId: 'sc-02', choiceId: 'choice-b', confidence: 'guessing' },
      { scenarioId: 'sc-03', choiceId: 'choice-c', confidence: 'confident' },
      { scenarioId: 'sc-04', choiceId: 'choice-a', confidence: 'confident' },
      { scenarioId: 'sc-05', choiceId: 'choice-a', confidence: 'guessing' },
      { scenarioId: 'sc-06', choiceId: 'choice-c', confidence: 'confident' },
      { scenarioId: 'sc-07', choiceId: 'choice-d', confidence: 'confident' },
      { scenarioId: 'sc-10', choiceId: 'choice-d', confidence: 'confident' },
    ];

    const resolvedDemo = demoConfigs.map(cfg => {
      const scenario = SCENARIOS.find(candidate => candidate.id === cfg.scenarioId);
      const choice = scenario?.choices.find(candidate => candidate.id === cfg.choiceId);
      if (!scenario || !choice) {
        throw new Error(`Invalid sample profile entry: ${cfg.scenarioId}/${cfg.choiceId}`);
      }
      return { scenario, choice, confidence: cfg.confidence };
    });

    await rayfinClient.clearMyAttempts();
    const seeded: Attempt[] = [];
    for (const { scenario, choice, confidence } of resolvedDemo) {
      const correct = choice.id === scenario.correctChoiceId;
      const misconceptionType = calculateMisconceptionType(correct, confidence);
      const att = await rayfinClient.recordAttempt({
        scenarioSlug: scenario.slug,
        domain: scenario.domain,
        selectedChoiceId: choice.id,
        correct,
        confidence,
        misconceptionType
      });
      seeded.push(att);
    }
    setAttempts(seeded);
    setCurrentRoute('dashboard');
    window.location.hash = '#/';
  }, []);

  const clearAllAttempts = useCallback(async () => {
    await rayfinClient.clearMyAttempts();
    setAttempts([]);
    setCurrentRoute('dashboard');
    window.location.hash = '#/';
  }, []);

  const value: TriageContextValue = {
    scenarios: SCENARIOS,
    currentScenario,
    currentRoute,
    attempts,
    latestAttempts,
    overallReadiness,
    backendStatus,
    userClaims,
    isLoading,
    navigateToDashboard,
    navigateToIncident,
    navigateToReview,
    navigateToNextIncident,
    startTriage,
    startWeakSpotsTriage,
    submitDiagnosis,
    clearAllAttempts,
    seedDemoAttempts,
    dangerousMisconceptions,
    knowledgeGaps,
    luckyHits,
    strongAreas,
    solidUnderstandingScenarios,
    needsReviewScenarios,
    unattemptedScenarios
  };

  return (
    <TriageContext.Provider value={value}>
      {children}
    </TriageContext.Provider>
  );
};

export function useTriage(): TriageContextValue {
  const context = useContext(TriageContext);
  if (!context) {
    throw new Error('useTriage must be used within a TriageProvider');
  }
  return context;
}
