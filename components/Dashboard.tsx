import React, { useState, useEffect } from 'react';
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, AlertTriangle, Activity, BarChart2, RefreshCw, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // KPI State
  const [stats, setStats] = useState({
    totalCustomers: 7245,
    customersTrend: 2.4,
    churnRate: 26.5,
    churnTrend: 0.8,
    avgRevenue: 65.40,
    atRisk: 1204,
    atRiskTrend: -1.2
  });

  // Chart Data State
  const [churnData, setChurnData] = useState([
    { name: 'Month-to-Month', churn: 42, retained: 58 },
    { name: '1 Year', churn: 11, retained: 89 },
    { name: '2 Year', churn: 3, retained: 97 },
  ]);

  const [riskDistribution, setRiskDistribution] = useState([
    { name: 'Low Risk', value: 65, color: '#10b981' },
    { name: 'Medium Risk', value: 20, color: '#f59e0b' },
    { name: 'High Risk', value: 15, color: '#ef4444' },
  ]);

  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data fetching/updates
    setTimeout(() => {
      // 1. Update KPIs with random variations
      setStats(prev => ({
        totalCustomers: prev.totalCustomers + Math.floor(Math.random() * 20) - 5,
        customersTrend: +(2.4 + (Math.random() - 0.5)).toFixed(1),
        churnRate: +(prev.churnRate + (Math.random() * 0.4 - 0.2)).toFixed(1),
        churnTrend: +(0.8 + (Math.random() * 0.2 - 0.1)).toFixed(1),
        avgRevenue: +(prev.avgRevenue + (Math.random() - 0.5)).toFixed(2),
        atRisk: prev.atRisk + Math.floor(Math.random() * 10) - 4,
        atRiskTrend: +(-1.2 + (Math.random() * 0.4 - 0.2)).toFixed(1),
      }));

      // 2. Update Churn Chart
      setChurnData(prev => prev.map(item => {
        const variance = Math.floor(Math.random() * 5) - 2;
        const newChurn = Math.max(0, Math.min(100, item.churn + variance));
        return { ...item, churn: newChurn, retained: 100 - newChurn };
      }));

      // 3. Update Risk Distribution
      setRiskDistribution(prev => {
        const newData = prev.map(item => ({
          ...item,
          value: Math.max(5, item.value + Math.floor(Math.random() * 10) - 5)
        }));
        return newData;
      });

      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 600); // Small delay for visual effect
  };

  useEffect(() => {
    // Initial setup
    const intervalId = setInterval(refreshData, 60000); // 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Executive Overview</h1>
        <div className="flex items-center gap-3 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className={`p-1 hover:bg-slate-100 rounded-full transition-colors ${isRefreshing ? 'animate-spin text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
                title="Refresh Data"
            >
                <RefreshCw className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <span className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${stats.customersTrend >= 0 ? 'text-green-600 bg-green-50' : 'text-rose-600 bg-rose-50'}`}>
              {stats.customersTrend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {Math.abs(stats.customersTrend)}%
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.totalCustomers.toLocaleString()}</div>
          <div className="text-slate-500 text-sm mt-1">Total Customers</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <span className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${stats.churnTrend > 0 ? 'text-rose-600 bg-rose-50' : 'text-green-600 bg-green-50'}`}>
              <ArrowUpRight className="w-3 h-3 mr-1" /> {stats.churnTrend}%
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{stats.churnRate}%</div>
          <div className="text-slate-500 text-sm mt-1">Current Churn Rate</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg">
                <BarChart2 className="w-6 h-6 text-emerald-600" />
                </div>
            </div>
          <div className="text-3xl font-bold text-slate-900">${stats.avgRevenue.toFixed(2)}</div>
          <div className="text-slate-500 text-sm mt-1">Avg. Monthly Revenue</div>
        </div>
        
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 rounded-lg">
                <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <span className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${stats.atRiskTrend <= 0 ? 'text-green-600 bg-green-50' : 'text-rose-600 bg-rose-50'}`}>
                <ArrowDownRight className="w-3 h-3 mr-1" /> {Math.abs(stats.atRiskTrend)}%
                </span>
            </div>
          <div className="text-3xl font-bold text-slate-900">{stats.atRisk.toLocaleString()}</div>
          <div className="text-slate-500 text-sm mt-1">At-Risk Customers</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Churn by Contract Type</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={churnData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="churn" name="Churned (%)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="retained" name="Retained (%)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Current Customer Risk Distribution</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
