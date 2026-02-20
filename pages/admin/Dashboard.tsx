import React from 'react';
import { Users, BookOpen, Crown, TrendingUp, CreditCard, Activity } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ReactNode; color: string }> = ({ 
  title, value, trend, icon, color 
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
        <TrendingUp className="w-3 h-3 mr-1" />
        {trend} from last month
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          trend="+12%" 
          icon={<Users className="w-6 h-6 text-blue-600" />} 
          color="bg-blue-50"
        />
        <StatCard 
          title="Active Subscribers" 
          value="856" 
          trend="+5%" 
          icon={<Crown className="w-6 h-6 text-amber-600" />} 
          color="bg-amber-50"
        />
        <StatCard 
          title="Total Revenue" 
          value="RM 12,450" 
          trend="+8%" 
          icon={<CreditCard className="w-6 h-6 text-emerald-600" />} 
          color="bg-emerald-50"
        />
        <StatCard 
          title="Learning Activities" 
          value="45k" 
          trend="+22%" 
          icon={<Activity className="w-6 h-6 text-purple-600" />} 
          color="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Users</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Sarah Ahmad', email: 'sarah@student.unisza.edu.my', plan: 'Premium', date: '2 mins ago' },
                { name: 'John Doe', email: 'john@gmail.com', plan: 'Free', date: '1 hour ago' },
                { name: 'Ali Bakar', email: 'ali@unisza.edu.my', plan: 'Premium', date: '3 hours ago' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{user.name}</div>
                    <div className="text-slate-500 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      user.plan === 'Premium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-700">Mobile App API</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
               <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-700">Database</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Operational</span>
            </div>
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
               <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-700">AI Chatbot</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;