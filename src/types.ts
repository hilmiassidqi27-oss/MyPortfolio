export type PageId = 'dashboard' | 'alur-kerja' | 'proyek' | 'fgd' | 'profil';

export type PipelineStageId = 0 | 1 | 2 | 3 | 4;

export interface PipelineStage {
  id: PipelineStageId;
  label: string;
  stageNumber: string;
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  bulletPoints: {
    title: string;
    description: string;
  }[];
  telemetryTitle: string;
  telemetryMetrics: {
    label: string;
    value: string;
    highlight?: boolean;
    color?: string;
  }[];
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  source: string;
  status: 'screening' | 'hr-interview' | 'assessment' | 'user-interview' | 'onboarding';
  score: number;
  mbti?: string;
  date: string;
  notes: string;
}

export interface MbtiQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  dimensionName: string;
  scenario: string;
  optionA: {
    text: string;
    trait: string;
    letter: 'E' | 'S' | 'T' | 'J';
  };
  optionB: {
    text: string;
    trait: string;
    letter: 'I' | 'N' | 'F' | 'P';
  };
}

export interface AssessmentCriterion {
  id: string;
  name: string;
  category: string;
  description: string;
  indicators: {
    poor: string;       // Skor 1-2
    competent: string;  // Skor 3
    excellent: string;  // Skor 4-5
  };
  defaultScore: number;
}

export interface AssessmentFormItem {
  id: 'user-interview' | 'hr-interview';
  title: string;
  shortTitle: string;
  badge: string;
  code: string;
  organization: string;
  assessorRole: string;
  methodology: string;
  externalUrl?: string;
  isConfidential: boolean;
  confidentialNotice: string;
  samplePhotoCaption: string;
  samplePhotoUrl?: string;
  description: string;
  scoringGuide: string;
  maxScore: number;
  thresholds: {
    recommended: number;
    considered: number;
  };
  criteria: AssessmentCriterion[];
  standardQuestions: string[];
  sampleLayoutDetails: {
    docTitle: string;
    docSub: string;
    revision: string;
    division: string;
    securityLevel: string;
    sampleCandidate: string;
    samplePosition: string;
    sampleScores: { criterion: string; score: number; notes: string }[];
    summaryConclusion: string;
  };
}

