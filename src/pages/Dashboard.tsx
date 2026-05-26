import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Filter,
  Search,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
  createdAt: string;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  qualified: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  lost: 'bg-gray-100 text-gray-700 border-gray-200',
};

const formatLeadDate = (createdAt: any) => {
  if (!createdAt) return 'Recent';
  try {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(date);
    }
  } catch (e) {
    console.error(e);
  }
  return 'Recent';
};

const formatLeadDateTime = (createdAt: any) => {
  if (!createdAt) return 'Onbekend';
  try {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString('nl-NL');
    }
  } catch (e) {
    console.error(e);
  }
  return 'Onbekend';
};

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async (showLoadingIndicator = false) => {
    if (showLoadingIndicator) {
      setRefreshing(true);
    }
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        console.error("Fout bij het ophalen van leads:", res.statusText);
      }
    } catch (error) {
      console.error("Netwerkfout bij ophalen leads:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads(true);

    // Auto-poll every 15 seconds to simulate real-time performance reliably
    const interval = setInterval(() => {
      fetchLeads(false);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setLeads(prevLeads => 
          prevLeads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead)
        );
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        console.error("Fout bij bijwerken status op de server:", res.statusText);
      }
    } catch (error) {
      console.error("Fout status updaten:", error);
    }
  };

  const filteredLeads = leads.filter(lead => 
    `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.projectType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="crm-dashboard-container" className="min-h-screen bg-[#f8fafc]/60 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 id="crm-main-title" className="text-3xl font-black uppercase tracking-tighter text-blue-950">
              CRM <span className="text-blue-600 italic font-light">Dashboard</span>
            </h1>
            <p className="text-slate-500 mt-1">Beheer je leads en aanvragen voor Prefab Select.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Zoek leads..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              id="sync-leads-btn"
              onClick={() => fetchLeads(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-bold uppercase tracking-widest text-[10px] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
              {refreshing ? 'Synchroniseren...' : 'Synchroniseer'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div id="crm-stats-grid" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Totaal Leads', value: leads.length, icon: Users, color: 'text-blue-600' },
            { label: 'Nieuw', value: leads.filter(l => l.status === 'new').length, icon: Clock, color: 'text-orange-500' },
            { label: 'In Behandeling', value: leads.filter(l => l.status === 'contacted').length, icon: MessageSquare, color: 'text-yellow-500' },
            { label: 'Gesloten', value: leads.filter(l => l.status === 'closed').length, icon: CheckCircle2, color: 'text-emerald-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-blue-950">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leads List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">Leads laden...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-blue-950">Geen leads gevonden</h3>
                <p className="text-slate-500">Er zijn nog geen aanvragen binnengekomen die aan je zoekopdracht voldoen.</p>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <motion.div
                  layoutId={lead.id}
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`group bg-white p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${
                    selectedLead?.id === lead.id 
                    ? 'border-blue-600 shadow-xl' 
                    : 'border-slate-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {lead.firstName ? lead.firstName[0] : 'P'}{lead.lastName ? lead.lastName[0] : 'S'}
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-950 flex items-center gap-2">
                          {lead.firstName} {lead.lastName}
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColors[lead.status] || 'bg-slate-100 text-slate-700'}`}>
                            {lead.status}
                          </span>
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">{lead.projectType}</p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-400 mb-1">
                        {formatLeadDate(lead.createdAt)}
                      </p>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors ml-auto" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedLead ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden sticky top-32"
                >
                  <div className="bg-blue-950 p-8 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl font-bold">
                        {selectedLead.firstName ? selectedLead.firstName[0] : 'P'}{selectedLead.lastName ? selectedLead.lastName[0] : 'S'}
                      </div>
                      <button 
                        onClick={() => setSelectedLead(null)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <AlertCircle className="w-6 h-6 rotate-45" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                      {selectedLead.firstName} <br />
                      <span className="text-blue-400">{selectedLead.lastName}</span>
                    </h2>
                    <p className="text-blue-200/60 font-medium text-sm">{selectedLead.projectType}</p>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-semibold truncate select-all">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-semibold truncate select-all">{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-semibold">
                          {formatLeadDateTime(selectedLead.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Bericht</h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl italic">
                        "{selectedLead.message}"
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Status Aanpassen</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {(['new', 'contacted', 'qualified', 'closed', 'lost'] as Lead['status'][]).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateLeadStatus(selectedLead.id, status)}
                            className={`text-[10px] font-black uppercase tracking-widest py-2 rounded-xl border transition-all cursor-pointer ${
                              selectedLead.status === status 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                              : 'bg-white border-slate-200 text-slate-500 hover:border-blue-600 hover:text-blue-600'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <a 
                        href={`mailto:${selectedLead.email}`}
                        className="flex-1 bg-blue-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] text-center hover:bg-blue-900 transition-colors block"
                      >
                        Mail Sturen
                      </a>
                      <a 
                        href={`tel:${selectedLead.phone}`}
                        className="w-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl hover:bg-blue-100 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-blue-50/50 rounded-[2.5rem] border-2 border-dashed border-blue-200 p-12 text-center sticky top-32">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm animate-pulse">
                    <Users className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900">Selecteer een lead</h3>
                  <p className="text-blue-600/60 text-sm">Klik op een aanvraag aan de linkerkant om de volledige details en contactgegevens te bekijken.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
