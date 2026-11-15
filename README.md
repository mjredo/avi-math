# Aviaana's Math Lab

Practice site for enVision Algebra 1 (2018), class "7th Algebra Yellow". It's live at https://mjredo.github.io/avi-math/

## What's here
| Path | What it is |
|---|---|
| `index.html` | The site. Built by `src/build.py`. Don't edit it by hand. |
| `src/` | Sources: question generators, course and test layouts, the review library, sync |
| `src/base/math-lab-base.html` | The Math Lab page and engine (from Araaya's lab) that the build starts from |
| `library/` | Her history of results and the catalog of tests (see `library/README.md`) |
| `archive/` | The original Topic 1 and Topic 2 practice pages, kept for reference |
| `worker/worker.js` | Cloudflare Worker that syncs progress and school uploads |

## Build
```
python3 src/build.py      # writes index.html
node src/verify2.js       # checks every generator: 4 distinct choices, valid steps
```

## Sync
The Worker is live at https://avi-math-sync.mrnarang.workers.dev. It uses KV namespace `av-math`, bound as `AVLAB`.
- GET `/c/progress`, `/c/rounds`, `/c/school` return `[{id, data}]`
- PUT and DELETE `/d/<collection>/<id>` (only from the site)
- PUT, GET and DELETE `/f/<id>` for photos and PDFs of school papers
