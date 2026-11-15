# Aviaana's Math Lab

Practice site for enVision Algebra 1 (class "7th Algebra Yellow"). It runs as a single page, `index.html`, on GitHub Pages.

## Progress sync
`worker/worker.js` is a Cloudflare Worker that stores progress in a KV namespace, so her answers carry over to any browser.
1. In Cloudflare, go to Workers & Pages → Create → Worker. Name it `avi-math-sync`, deploy it, then replace its code with `worker/worker.js` and deploy again.
2. Go to Storage & Databases → KV → Create a namespace called `avi-math`.
3. In the Worker, go to Settings → Bindings → Add → KV namespace. Set the variable name to `AVLAB` and pick the namespace `avi-math`.
4. Put the Worker's URL into `SYNC_URL_DEFAULT` in `index.html`.
