import type { ConfidenceLevel, DomainKey, MisconceptionType } from './scenario.ts';

export interface Attempt {
  id: string;
  user_id: string;
  scenarioSlug: string;
  domain: DomainKey;
  selectedChoiceId: string;
  correct: boolean;
  confidence: ConfidenceLevel;
  misconceptionType: MisconceptionType;
  attemptedAt: string;
}

export interface UserClaims {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  roles: string[];
}

export interface DomainStats {
  domain: DomainKey;
  title: string;
  practiceWeight: number;
  totalIncidents: number;
  attemptedCount: number;
  correctCount: number;
  scorePercent: number | null;
  dangerousMisconceptions: number;
  needsReview: number;
  knowledgeGaps: number;
  luckyHits: number;
  strongSignals: number;
  solidUnderstanding: number;
}

export interface OverallReadiness {
  accuracyPercent: number | null;
  coveragePercent: number;
  totalAttempted: number;
  totalCorrect: number;
  totalScenarios: number;
  assessmentComplete: boolean;
  domainStats: Record<DomainKey, DomainStats>;
  dangerousMisconceptionCount: number;
  knowledgeGapCount: number;
  luckyHitCount: number;
  strongSignalCount: number;
  solidUnderstandingCount: number;
  needsReviewCount: number;
}
