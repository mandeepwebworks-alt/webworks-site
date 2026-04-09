import { useState, useEffect, useCallback } from 'react';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
const PASSWORD = 'Mandeep2026';

function sbHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

async function getLeads() {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc`, { headers: sbHeaders() });
  return r.json();
}
async function updateLeadStatus(id: string, status: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${id}`, {
    method: 'PATCH',
    headers: sbHeaders(),
    body: JSON.stringify({ status }),
  });
}
async function getNotes(leadId: string) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/notes?lead_id=eq.${leadId}&select=*&order=created_at.asc`, { headers: sbHeaders() });
  return r.json();
}
async function insertNote(leadId: string, note: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/notes`, {
    method: 'POST',
    headers: sbHeaders(),
    body: JSON.stringify({ lead_id: leadId, note }),
  });
}
async function deleteNote(id: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/notes?id=eq.${id}`, { method: 'DELETE', headers: sbHeaders() });
}
async function getViews() {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/page_views?select=page,created_at&order=created_at.desc&limit=5000`, { headers: sbHeaders() });
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
  data?: Record<string, unknown>;
}
interface Note {
  id: string;
  created_at: string;
  note: string;
}
interface PageView {
  page: string;
  created_at: string;
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
  const [views, setViews] = useState<PageView[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
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
    const [l, v] = await Promise.all([getLeads(), getViews()]);
    setLeads(Array.isArray(l) ? l : []);
    setViews(Array.isArray(v) ? v : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const selectLead = async (lead: Lead) => {
    setSelected(lead);
    const n = await getNotes(lead.id);
    setNotes(Array.isArray(n) ? n : []);
  };

  const addNote = async () => {
    if (!newNote.trim() || !selected) return;
    setAddingNote(true);
    await insertNote(selected.id, newNote.trim());
    const n = await getNotes(selected.id);
    setNotes(Array.isArray(n) ? n : []);
    setNewNote('');
    setAddingNote(false);
  };

  const removeNote = async (id: string) => {
    await deleteNote(id);
    if (selected) {
      const n = await getNotes(selected.id);
      setNotes(Array.isArray(n) ? n : []);
    }
  };

  const changeStatus = async (status: string) => {
    if (!selected) return;
    await updateLeadStatus(selected.id, status);
    setSelected({ ...selected, status });
    setLeads(leads.map(l => l.id === selected.id ? { ...l, status } : l));
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const today = new Date().toDateString();
  const viewsToday = views.filter(v => new Date(v.created_at).toDateString() === today).length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  // Page view stats
  const pageCounts: Record<string, number> = {};
  views.forEach(v => { pageCounts[v.page] = (pageCounts[v.page] || 0) + 1; });
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-900">
        <div className="w-full max-w-sm mx-4">
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-2xl font-heading font-bold gradient-text">SiteGenius</span>
              </div>
              <p className="text-muted-300 text-sm">Dashboard — Enter password to continue</p>
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
              <button onClick={login} className="btn-primary w-full">
                Enter Dashboard
              </button>
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
          { label: 'Views Today', value: viewsToday },
          { label: 'Total Views', value: views.length },
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
              {filteredLeads.length === 0 ? (
                <div className="p-8 text-center text-muted-400 text-sm">No leads yet</div>
              ) : filteredLeads.map(lead => (
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
                <div className="p-6 border-b border-white/[0.06]">
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
                    <div className="bg-space-700/30 rounded-lg p-4 text-sm text-muted-200 leading-relaxed">{selected.message}</div>
                  )}
                  {selected.data && Object.keys(selected.data).length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {Object.entries(selected.data).filter(([, v]) => v).map(([k, v]) => (
                        <div key={k} className="bg-space-700/20 rounded-lg px-3 py-2">
                          <p className="text-xs text-muted-400 capitalize mb-0.5">{k.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-muted-200">{String(v)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="flex-1 flex flex-col overflow-hidden p-6">
                  <h3 className="text-sm font-semibold text-muted-200 mb-4">Notes</h3>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {notes.length === 0 ? (
                      <p className="text-xs text-muted-400">No notes yet</p>
                    ) : notes.map(n => (
                      <div key={n.id} className="group bg-space-700/30 rounded-lg p-3 flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-muted-400 mb-1">{new Date(n.created_at).toLocaleString()}</p>
                          <p className="text-sm text-muted-200">{n.note}</p>
                        </div>
                        <button
                          onClick={() => removeNote(n.id)}
                          className="opacity-0 group-hover:opacity-100 transition text-muted-400 hover:text-rose-400"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addNote()}
                      placeholder="Add a note..."
                      className="flex-1 rounded-lg border border-white/10 bg-space-700/50 px-3 py-2 text-sm text-muted-100 outline-none focus:border-neon-cyan/50 transition"
                    />
                    <button onClick={addNote} disabled={addingNote} className="btn-primary text-sm px-4 py-2">
                      {addingNote ? '...' : 'Add'}
                    </button>
                  </div>
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
              <h3 className="text-sm font-semibold text-muted-200">Top Pages by Views</h3>
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
                {topPages.map(([page, count]) => (
                  <tr key={page} className="border-b border-white/[0.02] hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-muted-200 font-mono text-xs">{page}</td>
                    <td className="px-4 py-3 text-right text-muted-100 font-medium">{count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-20 h-1.5 bg-space-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neon-cyan rounded-full"
                            style={{ width: `${(count / (topPages[0]?.[1] || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-400 w-8 text-right">{Math.round((count / views.length) * 100)}%</span>
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
