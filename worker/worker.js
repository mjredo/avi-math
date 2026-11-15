// Aviaana's Math Lab — progress + school results sync (Cloudflare Worker + KV)
// Bind a KV namespace to this Worker with the variable name AVLAB.
// GET    /c/<collection>          -> [{id, data}]     collections: progress, rounds, school, results (results/record = readable work record)
// PUT    /d/<collection>/<id>     body = JSON doc      (only from the site's own origin)
// DELETE /d/<collection>/<id>                          (only from the site's own origin)
// PUT    /f/<id>                  body = file bytes    (photo/PDF of a school paper, up to 10 MB)
// GET    /f/<id>                  -> the file
// DELETE /f/<id>
const ORIGINS = ["https://mjredo.github.io"];
const COLS = new Set(["progress", "rounds", "school", "results"]);
const MAX = 400_000, MAXFILE = 10_000_000;

function cors(origin) {
  const ok = ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Name",
    "Vary": "Origin",
  };
}
const json = (body, status, h) =>
  new Response(JSON.stringify(body), { status, headers: { ...h, "Content-Type": "application/json", "Cache-Control": "no-store" } });
const okId = id => /^[\w.-]{1,80}$/.test(id);

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const parts = new URL(req.url).pathname.split("/").filter(Boolean);
    const fromSite = ORIGINS.includes(origin);

    // ----- JSON documents -----
    if (parts[0] === "c" && req.method === "GET" && COLS.has(parts[1])) {
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
    if (parts[0] === "d" && COLS.has(parts[1]) && parts[2]) {
      const id = decodeURIComponent(parts[2]);
      if (!okId(id)) return json({ error: "id" }, 400, h);
      if (!fromSite) return json({ error: "origin" }, 403, h);
      const key = parts[1] + "/" + id;
      if (req.method === "DELETE") { await env.AVLAB.delete(key); return json({ ok: true }, 200, h); }
      if (req.method === "PUT") {
        const text = await req.text();
        if (text.length > MAX) return json({ error: "too large" }, 413, h);
        let doc;
        try { doc = JSON.parse(text); } catch { return json({ error: "json" }, 400, h); }
        if (parts[1] === "progress") {
          const old = await env.AVLAB.get(key, "json");
          if (old && (old.updatedAt || 0) > (doc.updatedAt || 0)) return json({ ok: false, stale: true, current: old }, 409, h);
        }
        await env.AVLAB.put(key, JSON.stringify(doc));
        return json({ ok: true }, 200, h);
      }
    }

    // ----- files (photos / PDFs of school papers) -----
    if (parts[0] === "f" && parts[1]) {
      const id = decodeURIComponent(parts[1]);
      if (!okId(id)) return json({ error: "id" }, 400, h);
      const key = "file/" + id;
      if (req.method === "GET") {
        const { value, metadata } = await env.AVLAB.getWithMetadata(key, "arrayBuffer");
        if (!value) return json({ error: "not found" }, 404, h);
        return new Response(value, { headers: { ...h, "Content-Type": (metadata && metadata.type) || "application/octet-stream", "Content-Disposition": `inline; filename="${(metadata && metadata.name || id).replace(/"/g, "")}"`, "Cache-Control": "private, max-age=86400" } });
      }
      if (!fromSite) return json({ error: "origin" }, 403, h);
      if (req.method === "DELETE") { await env.AVLAB.delete(key); return json({ ok: true }, 200, h); }
      if (req.method === "PUT") {
        const buf = await req.arrayBuffer();
        if (buf.byteLength > MAXFILE) return json({ error: "too large" }, 413, h);
        const type = req.headers.get("Content-Type") || "application/octet-stream";
        if (!/^(image\/|application\/pdf)/.test(type)) return json({ error: "type" }, 415, h);
        await env.AVLAB.put(key, buf, { metadata: { type, name: decodeURIComponent(req.headers.get("X-Name") || id).slice(0, 120), size: buf.byteLength, at: new Date().toISOString() } });
        return json({ ok: true }, 200, h);
      }
    }

    if (req.method === "GET" && parts.length === 0) return json({ ok: true, service: "avi-math sync", v: 2 }, 200, h);
    return json({ error: "not found" }, 404, h);
  },
};
