export async function onRequestPatch({ params, request, env }) {
  const authHeader = request.headers.get('Authorization');
  if (!validateAuth(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id } = params;
    const db = env.DB;

    if (db && id) {
      const updates = [];
      const binds = [];
      if (data.status) { updates.push('status = ?'); binds.push(data.status); }
      if (data.notes !== undefined) { updates.push('notes = ?'); binds.push(data.notes); }
      if (updates.length > 0) {
        binds.push(id);
        await db.prepare(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`).bind(...binds).run();
      }
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
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
