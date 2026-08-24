export type DomainKey = 'prepare_data' | 'maintain_analytics' | 'semantic_models';

export type SeverityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ConfidenceLevel = 'guessing' | 'fairly_sure' | 'confident';

export type MisconceptionType = 
  | 'dangerous_misconception'
  | 'needs_review'
  | 'knowledge_gap'
  | 'strong_signal'
  | 'lucky_hit'
  | 'solid_understanding';

export interface EvidenceItem {
  id: string;
  tabLabel: string;
  title: string;
  type: 'code' | 'schema' | 'config' | 'log' | 'diagram' | 'text';
  stage?: 'diagnostic' | 'solution';
  language?: 'dax' | 'sql' | 'kql' | 'json' | 'yaml' | 'markdown' | 'm' | 'powerquery' | 'python';
  content: string;
  caption: string;
}

export interface ChoiceOption {
  id: string;
  code: 'A' | 'B' | 'C' | 'D';
  label: string;
  technicalDetails?: string;
  layer: {
    label: string;
    category: string;
    iconSrc: string;
  };
}

export interface Scenario {
  id: string;
  slug: string;
  caseNumber: number;
  title: string;
  severity: SeverityType;
  domain: DomainKey;
  domainLabel: string;
  domainWeight: number;
  objective: string;
  userReport: {
    reporterName: string;
    reporterRole: string;
    department: string;
    timestamp: string;
    complaint: string;
  };
  environment: {
    workspaces: string;
    fabricItems: string[];
    computeMode: string;
    architectureSummary: string;
  };
  evidence: EvidenceItem[];
  choices: ChoiceOption[];
  correctChoiceId: string;
  explanation: string;
  alternativeExplanations: Record<string, string>;
  skillArea: string;
  examTakeaway: string;
}

export interface DomainMetadata {
  key: DomainKey;
  title: string;
  practiceWeight: number;
  examWeightRange: string;
  description: string;
  targetIncidents: number;
}

export const DOMAINS: Record<DomainKey, DomainMetadata> = {
  prepare_data: {
    key: 'prepare_data',
    title: 'Prepare data',
    practiceWeight: 0.50,
    examWeightRange: '45-50%',
    description: 'Transform, ingest, model star schemas, curate lakehouses, warehouses, and Eventhouses.',
    targetIncidents: 6
  },
  maintain_analytics: {
    key: 'maintain_analytics',
    title: 'Maintain a data analytics solution',
    practiceWeight: 0.25,
    examWeightRange: '25-30%',
    description: 'Security boundaries (RLS/OLS), deployment pipelines, Git integration, and dependency tracking.',
    targetIncidents: 3
  },
  semantic_models: {
    key: 'semantic_models',
    title: 'Implement and manage semantic models',
    practiceWeight: 0.25,
    examWeightRange: '25-30%',
    description: 'Relationship cardinality, bridge tables, calculation groups, and incremental refresh strategies.',
    targetIncidents: 3
  }
};
