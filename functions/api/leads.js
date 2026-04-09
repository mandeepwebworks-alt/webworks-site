export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, email, business, phone, source, message, leadData } = data;

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const created_at = new Date().toISOString();
    const db = env.DB;

    if (db) {
      await db.prepare(
        `INSERT INTO leads (id, name, email, business, phone, source, message, status, notes, data, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', '', ?, ?)`
      ).bind(
        id, name, email, business || '', phone || '',
        source || 'contact', message || '',
        JSON.stringify(leadData || {}), created_at
      ).run();
    }

    // Send email via Resend
    if (env.RESEND_API_KEY) {
      const isQuote = source === 'quote';
      const extraRows = leadData ? Object.entries(leadData)
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px;">${k.replace(/_/g, ' ')}</td><td style="padding:8px;border-bottom:1px solid #eee;">${v}</td></tr>`)
        .join('') : '';

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'SiteGenius <leads@sitegenius.co.nz>',
          to: ['hello@sitegenius.co.nz'],
          cc: ['mandeepwebworks@gmail.com'],
          subject: `[SiteGenius Lead] ${name} — ${isQuote ? 'Quote Request' : 'Contact Form'}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;">
              <h2 style="color:#0e1628;">New ${isQuote ? 'Quote Request' : 'Contact'} — SiteGenius</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
                <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
                ${business ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Business</td><td style="padding:8px;border-bottom:1px solid #eee;">${business}</td></tr>` : ''}
                ${message ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>` : ''}
                ${extraRows}
                <tr><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })}</td></tr>
              </table>
              <p style="margin-top:20px;padding:12px;background:#f0fdf4;border-radius:8px;color:#166534;">
                View all leads at <a href="https://sitegenius.co.nz/dashboard">sitegenius.co.nz/dashboard</a>
              </p>
            </div>
          `,
        }),
      }).catch(() => {});
    }

    return Response.json({ success: true, id });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function onRequestGet({ request, env }) {
  const authHeader = request.headers.get('Authorization');
  if (!validateAuth(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = env.DB;
  if (!db) return Response.json({ leads: [], total: 0 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  let query = 'SELECT * FROM leads';
  const binds = [];
  if (status && status !== 'all') {
    query += ' WHERE status = ?';
    binds.push(status);
  }
  query += ' ORDER BY created_at DESC';

  const result = await db.prepare(query).bind(...binds).all();
  return Response.json({ leads: result.results, total: result.results.length });
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
