export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { page, referrer } = data;
    if (!page) return Response.json({ error: 'Missing page' }, { status: 400 });

    const db = env.DB;
    if (db) {
      const userAgent = request.headers.get('user-agent') || '';
      const country = request.headers.get('cf-ipcountry') || '';
      const created_at = new Date().toISOString();
      await db.prepare(
        'INSERT INTO page_views (page, referrer, user_agent, country, created_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(page, referrer || '', userAgent, country, created_at).run();
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 });
  }
}

export async function onRequestGet({ request, env }) {
  const authHeader = request.headers.get('Authorization');
  if (!validateAuth(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = env.DB;
  if (!db) return Response.json({ today: 0, total: 0, topPages: [] });

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();

  const [todayRes, totalRes, topPagesRes] = await Promise.all([
    db.prepare("SELECT COUNT(*) as count FROM page_views WHERE created_at >= ?").bind(todayStr + 'T00:00:00').first(),
    db.prepare("SELECT COUNT(*) as count FROM page_views").first(),
    db.prepare("SELECT page, COUNT(*) as views FROM page_views WHERE created_at >= ? GROUP BY page ORDER BY views DESC LIMIT 10").bind(monthAgo).all(),
  ]);

  return Response.json({
    today: todayRes?.count || 0,
    total: totalRes?.count || 0,
    topPages: topPagesRes?.results || [],
  });
}

function validateAuth(authHeader) {
  if (!authHeader) return false;
  try {
    const decoded = atob(authHeader.replace('Basic ', ''));
    const [, password] = decoded.split(':');
    return password === 'Mandeep2026';
  } catch {
    return false;
  }
}
