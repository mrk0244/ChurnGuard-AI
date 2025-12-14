import React, { useState } from 'react';
import { Layout } from './components/ui/Layout';
import { Dashboard } from './components/Dashboard';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { CustomerProfile, ChurnPrediction } from './types';
import { analyzeChurnRisk } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<ChurnPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: CustomerProfile) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    
    try {
      // Small delay to allow UI to update if needed
      await new Promise(r => setTimeout(r, 100)); 
      
      const result = await analyzeChurnRisk(data);
      setPrediction(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate prediction. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'predict':
        return (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Churn Predictor</h1>
                <p className="text-slate-500 mt-2">Use the ML-powered engine to assess customer risk factors in real-time.</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            
            {prediction && (
                <div id="results-section" className="pt-8 border-t border-slate-200">
                     <h2 className="text-2xl font-bold text-slate-900 mb-6">Prediction Analysis</h2>
                    <PredictionResult prediction={prediction} />
                </div>
            )}
          </div>
        );
      case 'customers':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
                <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Customer List Module</p>
            <p className="text-sm">Connect to a CRM database to view this section.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
