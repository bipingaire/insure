"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Send, 
  Paperclip,
  DollarSign,
  Shield,
  Truck,
  MapPin,
  History,
  Briefcase,
  ChevronRight,
  LogOut,
  Zap
} from 'lucide-react';

// --- MOCK DATA ---

const MOCK_LEADS = [
  { id: 1, company: "Red Hawk Logistics", contact: "Mike Ross", zip: "27265", status: "New", riskScore: 88 },
  { id: 2, company: "Blue Ridge Hauling", contact: "Sarah Key", zip: "27262", status: "Underwriting", riskScore: 45 },
  { id: 3, company: "Speedy Trans", contact: "John Doe", zip: "27260", status: "Quoted", riskScore: 92 },
];

const CARRIERS = [
  { name: "Great West", apiStatus: "Online", appointed: true },
  { name: "Progressive", apiStatus: "Online", appointed: true },
  { name: "Northland", apiStatus: "Maintenance", appointed: true },
  { name: "Hudson", apiStatus: "Online", appointed: false },
];

// --- COMPONENTS ---

// 1. LOGIN SCREEN
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-blue-900 p-8 text-center">
        <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center text-green-400 font-bold text-xl mx-auto mb-4 shadow-lg">ST</div>
        <h2 className="text-2xl font-bold text-white">Agent Portal</h2>
        <p className="text-blue-200 text-sm">Secure Access for Licensed Agents</p>
      </div>
      <div className="p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Agent ID</label>
          <input type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="AGT-8821" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
          <input type="password" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
        </div>
        <button onClick={onLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg">
          Authenticate
        </button>
      </div>
      <div className="bg-slate-50 p-4 text-center text-xs text-slate-400">
        Encrypted Connection • 2FA Enabled
      </div>
    </div>
  </div>
);

// 2. AI RISK CARD
const RiskAssessor = ({ score }: { score: number }) => {
  const isHighRisk = score < 60;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                <Zap size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">AI Risk Assessor</h3>
                <p className="text-xs text-slate-500">Analysis based on live data</p>
            </div>
        </div>
        <div className={`text-2xl font-black ${isHighRisk ? 'text-red-500' : 'text-green-500'}`}>
            {score}/100
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Factor 1 */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
                <Shield size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Driver History (MVR)</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Clean</span>
        </div>
        {/* Factor 2 */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Lanes & Region</span>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">Regional (NE)</span>
        </div>
        {/* Factor 3 */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
                <Truck size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Commodity Type</span>
            </div>
            {isHighRisk ? (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Hazmat</span>
            ) : (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Dry Goods</span>
            )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-2">AI Recommendation:</p>
          <p className="text-sm font-medium text-slate-800 leading-snug">
              {isHighRisk 
                ? "⚠️ High Risk detected due to Hazmat commodity. Manual underwriter review required for pollution liability." 
                : "✅ Standard Risk. Eligible for instant binding with preferred carriers."}
          </p>
      </div>
    </div>
  );
};

// 3. SUBMISSION HUB
const SubmissionHub = () => {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = () => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            alert("Submission Package sent to underwriters via API!");
        }, 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600" /> Market Access
            </h3>
            
            <div className="overflow-hidden rounded-lg border border-slate-200 mb-6">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="p-3">Carrier</th>
                            <th className="p-3">API Status</th>
                            <th className="p-3">Appointment</th>
                            <th className="p-3 text-center">Select</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {CARRIERS.map((carrier, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-3 font-medium text-slate-800">{carrier.name}</td>
                                <td className="p-3">
                                    <span className={`flex items-center gap-1.5 text-xs font-medium ${carrier.apiStatus === 'Online' ? 'text-green-600' : 'text-orange-600'}`}>
                                        <span className={`w-2 h-2 rounded-full ${carrier.apiStatus === 'Online' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                                        {carrier.apiStatus}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {carrier.appointed 
                                        ? <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Active</span>
                                        : <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Pending</span>
                                    }
                                </td>
                                <td className="p-3 text-center">
                                    <input type="checkbox" disabled={!carrier.appointed} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" defaultChecked={carrier.appointed} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="text-sm">
                    <p className="font-bold text-blue-900">Submission Package Ready</p>
                    <p className="text-blue-600 text-xs">Includes AI Risk Report, Loss Runs, & Driver Schedule</p>
                </div>
                <button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                    {submitting ? 'Sending...' : (
                        <>
                            <Send size={18} />
                            One-Click Submit
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

// 4. MAIN WORKSPACE
const Workspace = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
        <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Red Hawk Logistics LLC</h1>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><MapPin size={14} /> High Point, NC (27265)</span>
                        <span className="flex items-center gap-1"><Truck size={14} /> 3 Power Units</span>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Status: Due Diligence</span>
                    </div>
                </div>
                <div className="flex gap-3">
                     <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm">
                        Request More Info
                     </button>
                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md">
                        Save Progress
                     </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6">
                <nav className="flex gap-8">
                    {['Overview', 'Email & Comms', 'Documents', 'Submissions', 'Invoicing'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-4 text-sm font-medium transition-colors relative ${
                                activeTab === tab.toLowerCase() || (activeTab === 'overview' && tab === 'Overview')
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Dynamic Content */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* Left Column (Main) */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    
                    {/* EMAIL VIEW */}
                    {(activeTab.includes('email') || activeTab === 'overview') && (
                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-bold text-slate-700 flex items-center gap-2"><Mail size={18} /> Communication Log</h3>
                                <button className="text-xs bg-white border border-slate-300 px-3 py-1.5 rounded text-slate-600 font-medium hover:bg-slate-50">Filter by Thread</button>
                            </div>
                            <div className="flex-1 p-0 overflow-y-auto">
                                {/* Email Item 1 */}
                                <div className="p-4 border-b border-slate-50 hover:bg-blue-50/50 cursor-pointer transition">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-sm text-slate-800">Mike Ross (Client)</span>
                                        <span className="text-xs text-slate-400">10:42 AM</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900 mb-1">RE: Quote for 2024 Renewal</p>
                                    <p className="text-sm text-slate-500 line-clamp-1">Attached are the loss runs you requested. Let me know if you need anything else for the Great West quote.</p>
                                </div>
                                {/* Email Item 2 */}
                                <div className="p-4 border-b border-slate-50 hover:bg-blue-50/50 cursor-pointer transition bg-slate-50/50">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-sm text-slate-800">Me (Agent)</span>
                                        <span className="text-xs text-slate-400">Yesterday</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-900 mb-1">Missing CDL Information</p>
                                    <p className="text-sm text-slate-500 line-clamp-1">Hi Mike, thanks for the info. I still need the CDL number for your second driver, John Smith.</p>
                                </div>
                            </div>
                            {/* Compose Area */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                                <div className="relative">
                                    <input className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Reply to Mike..." />
                                    <button className="absolute right-2 top-2 p-1 text-blue-600 hover:bg-blue-100 rounded">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                         </div>
                    )}

                    {/* SUBMISSION / MARKET VIEW */}
                    {(activeTab.includes('submission') || activeTab === 'overview') && (
                        <SubmissionHub />
                    )}

                    {/* INVOICING VIEW */}
                    {(activeTab.includes('invoice') || activeTab === 'overview') && (
                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2"><DollarSign size={20} className="text-green-600" /> Invoicing & Billing</h3>
                                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800">+ New Invoice</button>
                            </div>
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 bg-slate-50 uppercase text-xs">
                                    <tr>
                                        <th className="p-3 rounded-l-lg">Invoice #</th>
                                        <th className="p-3">Type</th>
                                        <th className="p-3">Carrier</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3 rounded-r-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="p-3 font-medium">INV-2024-001</td>
                                        <td className="p-3">Agency Fee</td>
                                        <td className="p-3 text-slate-500">N/A</td>
                                        <td className="p-3 font-bold">$250.00</td>
                                        <td className="p-3"><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Paid</span></td>
                                        <td className="p-3 text-blue-600 font-medium cursor-pointer">View</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-medium">INV-2024-002</td>
                                        <td className="p-3">Premium Down</td>
                                        <td className="p-3 text-slate-500">Great West</td>
                                        <td className="p-3 font-bold">$2,450.00</td>
                                        <td className="p-3"><span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">Pending</span></td>
                                        <td className="p-3 text-blue-600 font-medium cursor-pointer">View</td>
                                    </tr>
                                </tbody>
                            </table>
                         </div>
                    )}
                </div>

                {/* Right Column (Sidebars) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    
                    {/* AI Risk Component */}
                    <RiskAssessor score={88} />

                    {/* Due Diligence Checklist */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText size={20} className="text-slate-500" /> Due Diligence</h3>
                        <div className="space-y-3">
                            {[
                                { label: "Carrier Authority Check", done: true },
                                { label: "Driver MVR Validation", done: true },
                                { label: "Loss Runs (3 Years)", done: true },
                                { label: "Vehicle Schedule Photos", done: false },
                                { label: "Signed Broker Agreement", done: false },
                            ].map((item, idx) => (
                                <label key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.done ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                        {item.done && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- MAIN LAYOUT ---

export default function AgentDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState<number | null>(1);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-10">
        <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">ST</div>
           <span className="font-bold text-lg tracking-tight">Agent<span className="text-blue-400">Portal</span></span>
        </div>

        {/* Lead List */}
        <div className="flex-1 overflow-y-auto py-4">
            <div className="px-6 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">My Territory (27265)</div>
            <div className="space-y-1 px-3">
                {MOCK_LEADS.map((lead) => (
                    <button 
                        key={lead.id}
                        onClick={() => setActiveLeadId(lead.id)}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-all group ${activeLeadId === lead.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold">{lead.company}</span>
                            {activeLeadId !== lead.id && lead.riskScore < 60 && <AlertTriangle size={12} className="text-yellow-500" />}
                        </div>
                        <div className="flex justify-between text-xs opacity-80">
                            <span>{lead.contact}</span>
                            <span className={`${activeLeadId === lead.id ? 'text-blue-200' : 'text-slate-500'}`}>{lead.status}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Agent Profile Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">JD</div>
                <div className="text-xs">
                    <p className="text-white font-bold">Jane Doe</p>
                    <p className="text-green-500">● Online</p>
                </div>
            </div>
            <button onClick={() => setIsLoggedIn(false)} className="text-slate-500 hover:text-white transition">
                <LogOut size={16} />
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8 shadow-sm">
            <div className="relative w-96">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search leads, DOT numbers, or invoices..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                />
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-blue-600 transition">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="text-slate-500 hover:text-blue-600 transition">
                    <Settings size={20} />
                </button>
            </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <Workspace />
      </main>
    </div>
  );
}