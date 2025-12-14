export interface CustomerProfile {
  gender: 'Male' | 'Female';
  seniorCitizen: boolean;
  partner: boolean;
  dependents: boolean;
  tenure: number;
  phoneService: boolean;
  multipleLines: 'Yes' | 'No' | 'No phone service';
  internetService: 'DSL' | 'Fiber optic' | 'No';
  onlineSecurity: boolean;
  onlineBackup: boolean;
  deviceProtection: boolean;
  techSupport: boolean;
  streamingTV: boolean;
  streamingMovies: boolean;
  contract: 'Month-to-month' | 'One year' | 'Two year';
  paperlessBilling: boolean;
  paymentMethod: 'Electronic check' | 'Mailed check' | 'Bank transfer (automatic)' | 'Credit card (automatic)';
  monthlyCharges: number;
  totalCharges: number;
}

export interface ChurnFactor {
  factor: string;
  impact: 'High' | 'Medium' | 'Low';
  direction: 'Positive' | 'Negative'; // Positive means increases churn risk
  description: string;
}

export interface ChurnPrediction {
  churnProbability: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: ChurnFactor[];
  retentionStrategy: string;
  recommendedOffer: string;
}
