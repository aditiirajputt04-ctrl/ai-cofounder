
export interface TargetUser {
  userType: string;
  painPoint: string;
}

export interface MVPFeatures {
  mustHave: string[];
  optional: string[];
}

export interface MonetizationModel {
  modelName: string;
  description: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface Competitor {
  name: string;
  marketPosition: string;
  keyDifferentiator: string;
  strategicGap: string;
}

export interface StartupPlan {
  refinedIdea: string;
  targetUsers: TargetUser[];
  mvpFeatures: MVPFeatures;
  monetization: MonetizationModel[];
  pitchSummary: string;
  swot: SwotAnalysis;
  competitors: Competitor[];
  founderNote?: string;
}

export type AppState = 
  | 'SPLASH' 
  | 'WELCOME' 
  | 'LOGIN' 
  | 'REGISTER' 
  | 'ONBOARDING' 
  | 'DASHBOARD' // Main project list
  | 'CREATE'    // Form page
  | 'LOADING'   // Processing
  | 'RESULTS'   // Viewing a plan
  | 'PROFILE';  // Settings

export type Theme = 'light' | 'dark';
