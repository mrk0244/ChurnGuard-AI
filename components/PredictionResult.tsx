import React from 'react';
import { ChurnPrediction } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AlertOctagon, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface PredictionResultProps {
  prediction: ChurnPrediction;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return '#10b981'; // Green
      case 'Medium': return '#f59e0b'; // Amber
      case 'High': return '#f97316'; // Orange
      case 'Critical': return '#ef4444'; // Red
      default: return '#64748b';
    }
  };

  const riskColor = getRiskColor(prediction.riskLevel);
  
  const gaugeData = [
    { name: 'Probability', value: prediction.churnProbability },
    { name: 'Remaining', value: 100 - prediction.churnProbability },
  ];

  // Transform factors for chart
  const factorData = prediction.factors.map(f => ({
      name: f.factor,
      impact: f.impact === 'High' ? 3 : f.impact === 'Medium' ? 2 : 1,
      direction: f.direction === 'Positive' ? 1 : -1
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 bg-[${riskColor}] opacity-80`} style={{ backgroundColor: riskColor }}></div>
             <h3 className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-xs">Churn Probability</h3>
             <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={gaugeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                        >
                             <Cell fill={riskColor} />
                             <Cell fill="#f1f5f9" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                     <span className="text-4xl font-extrabold text-slate-800">{prediction.churnProbability}%</span>
                     <span className={`text-sm font-bold px-3 py-1 rounded-full mt-2 text-white`} style={{ backgroundColor: riskColor }}>
                         {prediction.riskLevel.toUpperCase()}
                     </span>
                </div>
             </div>
        </div>

        {/* Factors Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-indigo-500" />
                Key Risk Factors
            </h3>
            <div className="space-y-3">
                {prediction.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className={`mt-1 min-w-[8px] h-2 rounded-full ${factor.direction === 'Positive' ? 'bg-rose-500' : 'bg-green-500'}`} />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-slate-800 text-sm">{factor.factor}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                                    factor.impact === 'High' ? 'bg-rose-100 text-rose-700' : 
                                    factor.impact === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {factor.impact} Impact
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{factor.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Action Plan Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Retention Strategy
              </h3>
              <p className="text-indigo-100 leading-relaxed mb-6">
                  {prediction.retentionStrategy}
              </p>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-4 h-4" /> Recommended Offer
                  </div>
                  <p className="font-semibold text-white">{prediction.recommendedOffer}</p>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Feature Impact Analysis</h3>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={factorData} layout="vertical" margin={{ left: 40, right: 20 }}>
                         <XAxis type="number" hide />
                         <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                         <Tooltip cursor={{fill: '#f8fafc'}} />
                         <Bar dataKey="impact" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20}>
                            {factorData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.direction === 1 ? '#ef4444' : '#10b981'} />
                            ))}
                         </Bar>
                    </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex gap-4 justify-center text-xs text-slate-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Increases Risk</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Decreases Risk</div>
              </div>
          </div>
      </div>
    </div>
  );
};
