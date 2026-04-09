import { useState, useEffect, useCallback } from 'react';

const PASSWORD = 'Mandeep2026';

function authHeader() {
  return 'Basic ' + btoa(`admin:${PASSWORD}`);
}

async function getLeads(status = 'all') {
  const url = status === 'all' ? '/api/leads' : `/api/leads?status=${status}`;
  const r = await fetch(url, { headers: { Authorization: authHeader() } });
  const data = await r.json();
  return data.leads || [];
}

async function updateLead(id: string, updates: Record<string, string>) {
  await fetch(`/api/leads/${id}`, {
    method: 'PATCH',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

async function getAnalytics() {
  const r = await fetch('/api/track', { headers: { Authorization: authHeader() } });
  return r.json();
}

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  business?: string;
  source: string;
  message?: string;
  status: string;
  notes?: string;
  data?: string;
}

interface Analytics {
  today: number;
  total: number;
  topPages: { page: string; views: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  contacted: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  converted: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  closed: 'bg-white/5 text-muted-300 border-white/10',
};

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tab, setTab] = useState<'leads' | 'analytics'>('leads');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('sg_dash') === PASSWORD) setAuthed(true);
  }, []);

  const login = () => {
    if (pw === PASSWORD) {
      sessionStorage.setItem('sg_dash', PASSWORD);
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    const [l, a] = await Promise.all([getLeads(filter), getAnalytics()]);
    setLeads(l);
    setAnalytics(a);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const selectLead = (lead: Lead) => {
    setSelected(lead);
    setNoteText(lead.notes || '');
  };

  const saveNote = async () => {
    if (!selected) return;
    setSavingNote(true);
    await updateLead(selected.id, { notes: noteText });
    setSelected({ ...selected, notes: noteText });
    setLeads(leads.map(l => l.id === selected.id ? { ...l, notes: noteText } : l));
    setSavingNote(false);
  };

  const changeStatus = async (status: string) => {
    if (!selected) return;
    await updateLead(selected.id, { status });
    setSelected({ ...selected, status });
    setLeads(leads.map(l => l.id === selected.id ? { ...l, status } : l));
  };

  const parsedData = (lead: Lead) => {
    try { return JSON.parse(lead.data || '{}'); } catch { return {}; }
  };

  const newLeads = leads.filter(l => l.status === 'new').length;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-900">
        <div className="w-full max-w-sm mx-4">
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <span className="text-2xl font-heading font-bold gradient-text">SiteGenius</span>
              <p className="text-muted-300 text-sm mt-2">Dashboard — Enter password to continue</p>
            </div>
            <div className="space-y-4">
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="Password"
                className={`w-full rounded-lg border px-4 py-3 text-muted-100 bg-space-700/50 outline-none transition ${pwError ? 'border-rose-500/50 ring-1 ring-rose-500/30' : 'border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50'}`}
              />
              {pwError && <p className="text-xs text-rose-400">Incorrect password</p>}
              <button onClick={login} className="btn-primary w-full">Enter Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold gradient-text text-lg">SiteGenius</span>
          <span className="text-muted-400 text-sm">/ Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="text-xs text-muted-300 hover:text-muted-100 transition flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh
          </button>
          <button onClick={() => { sessionStorage.removeItem('sg_dash'); setAuthed(false); }} className="text-xs text-muted-400 hover:text-rose-400 transition">
            Log out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {[
          { label: 'Total Leads', value: leads.length },
          { label: 'New Leads', value: newLeads, highlight: true },
          { label: 'Views Today', value: analytics?.today ?? '—' },
          { label: 'Total Views', value: analytics?.total ?? '—' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl p-5">
            <p className="text-xs text-muted-300 mb-1">{s.label}</p>
            <p className={`text-3xl font-heading font-bold ${s.highlight ? 'gradient-text' : 'text-muted-100'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-2 mb-4">
        {(['leads', 'analytics'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${tab === t ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20' : 'text-muted-300 hover:text-muted-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin"></div>
        </div>
      ) : tab === 'leads' ? (
        <div className="flex-1 flex overflow-hidden px-6 pb-6 gap-4">
          {/* Lead list */}
          <div className="w-full lg:w-80 xl:w-96 flex flex-col glass rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <div className="flex flex-wrap gap-1.5">
                {['all', 'new', 'contacted', 'converted', 'closed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${filter === f ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-muted-400 hover:text-muted-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {leads.length === 0 ? (
                <div className="p-8 text-center text-muted-400 text-sm">No leads yet</div>
              ) : leads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => selectLead(lead)}
                  className={`w-full text-left px-4 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition ${selected?.id === lead.id ? 'bg-white/[0.04]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-muted-100 truncate">{lead.name}</p>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-300 truncate">{lead.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-neon-cyan/70">{lead.source}</span>
                    <span className="text-xs text-muted-400">{new Date(lead.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="hidden lg:flex flex-1 flex-col glass rounded-xl overflow-hidden">
            {!selected ? (
              <div className="flex-1 flex items-center justify-center text-muted-400 text-sm">
                Select a lead to view details
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-white/[0.06] overflow-y-auto">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-heading font-bold text-muted-100">{selected.name}</h2>
                      <p className="text-muted-300 text-sm mt-0.5">{selected.email}</p>
                      {selected.business && <p className="text-muted-400 text-xs mt-0.5">{selected.business}</p>}
                    </div>
                    <select
                      value={selected.status}
                      onChange={e => changeStatus(e.target.value)}
                      className="text-xs rounded-lg border border-white/10 bg-space-700/50 px-3 py-1.5 text-muted-200 outline-none focus:border-neon-cyan/50"
                    >
                      {['new', 'contacted', 'converted', 'closed'].map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-1 rounded-full">{selected.source}</span>
                    <span className="text-xs text-muted-400">{new Date(selected.created_at).toLocaleString()}</span>
                  </div>
                  {selected.message && (
                    <div className="bg-space-700/30 rounded-lg p-4 text-sm text-muted-200 leading-relaxed mb-4">{selected.message}</div>
                  )}
                  {(() => {
                    const d = parsedData(selected);
                    const entries = Object.entries(d).filter(([, v]) => v);
                    return entries.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {entries.map(([k, v]) => (
                          <div key={k} className="bg-space-700/20 rounded-lg px-3 py-2">
                            <p className="text-xs text-muted-400 capitalize mb-0.5">{k.replace(/_/g, ' ')}</p>
                            <p className="text-xs text-muted-200">{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Notes */}
                <div className="flex flex-col p-6 gap-3">
                  <h3 className="text-sm font-semibold text-muted-200">Notes</h3>
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    rows={5}
                    placeholder="Add notes about this lead..."
                    className="w-full rounded-lg border border-white/10 bg-space-700/50 px-3 py-2 text-sm text-muted-100 outline-none focus:border-neon-cyan/50 transition resize-none"
                  />
                  <button
                    onClick={saveNote}
                    disabled={savingNote}
                    className="btn-primary self-end text-sm px-5 py-2"
                  >
                    {savingNote ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Analytics tab */
        <div className="flex-1 px-6 pb-6">
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-muted-200">Top Pages (Last 30 Days)</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-400">Page</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-400">Views</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-400">Share</th>
                </tr>
              </thead>
              <tbody>
                {(analytics?.topPages || []).map(({ page, views }) => (
                  <tr key={page} className="border-b border-white/[0.02] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-muted-200 font-mono text-xs">{page}</td>
                    <td className="px-4 py-3 text-right text-muted-100 font-medium">{views}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 h-1.5 bg-space-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neon-cyan rounded-full"
                            style={{ width: `${(views / (analytics?.topPages[0]?.views || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-400 w-8 text-right">
                          {analytics?.total ? Math.round((views / analytics.total) * 100) : 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
