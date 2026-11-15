// Aviaana's Math Lab — progress sync (Cloudflare Worker + KV)
// Bind a KV namespace to this Worker with the variable name AVLAB.
// GET  /c/<collection>        -> [{id, data}]   (collections: progress, rounds)
// PUT  /d/<collection>/<id>   body = JSON doc    (only from the site's own origin)
const ORIGINS = ["https://mjredo.github.io"];
const COLS = new Set(["progress", "rounds"]);
const MAX = 400_000;

function cors(origin) {
  const ok = ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}
const json = (body, status, h) =>
  new Response(JSON.stringify(body), { status, headers: { ...h, "Content-Type": "application/json", "Cache-Control": "no-store" } });

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const parts = new URL(req.url).pathname.split("/").filter(Boolean);

    if (req.method === "GET" && parts[0] === "c" && COLS.has(parts[1])) {
      const out = [];
      let cursor;
      do {
        const page = await env.AVLAB.list({ prefix: parts[1] + "/", cursor });
        for (const k of page.keys) {
          const v = await env.AVLAB.get(k.name, "json");
          if (v) out.push({ id: k.name.slice(parts[1].length + 1), data: v });
        }
        cursor = page.list_complete ? null : page.cursor;
      } while (cursor);
      return json(out, 200, h);
    }

    if (req.method === "PUT" && parts[0] === "d" && COLS.has(parts[1]) && parts[2]) {
      if (!ORIGINS.includes(origin)) return json({ error: "origin" }, 403, h);
      const id = decodeURIComponent(parts[2]);
      if (!/^[\w.-]{1,80}$/.test(id)) return json({ error: "id" }, 400, h);
      const text = await req.text();
      if (text.length > MAX) return json({ error: "too large" }, 413, h);
      let doc;
      try { doc = JSON.parse(text); } catch { return json({ error: "json" }, 400, h); }
      if (parts[1] === "progress") {
        const old = await env.AVLAB.get("progress/" + id, "json");
        if (old && (old.updatedAt || 0) > (doc.updatedAt || 0)) return json({ ok: false, stale: true, current: old }, 409, h);
      }
      await env.AVLAB.put(parts[1] + "/" + id, JSON.stringify(doc));
      return json({ ok: true }, 200, h);
    }

    if (req.method === "GET" && parts.length === 0) return json({ ok: true, service: "avi-math sync" }, 200, h);
    return json({ error: "not found" }, 404, h);
  },
};
