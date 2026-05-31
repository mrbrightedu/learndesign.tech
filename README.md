# Design Lab — learndesign.tech

A hands-on learning space for **technological design**, taught by Fox Bright.
Lessons pair clear written guides with video walkthroughs, covering 3D printing,
Fusion CAD, laser cutting, full projects, and how-tos.

🌐 **Live site:** https://learndesign.tech

## Stack

A fast, dependency-free static site — plain HTML, CSS, and vanilla JS. No build step.

```
index.html    # page structure & content
styles.css    # theme tokens, layout, light/dark
script.js     # theme toggle, filters, scroll reveals, video lightbox
CNAME         # custom domain for GitHub Pages
.nojekyll     # serve files as-is on GitHub Pages
```

## Run locally

Just open `index.html`, or serve it for clean relative paths:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding a lesson

In `index.html`, copy any `<article class="card">` block inside `#lessonGrid` and update:

- `data-topic` on the `<article>` — one of `3d-printing`, `fusion`, `laser`, `projects`, `how-to` (drives filtering)
- `data-yt` on the `.card__media` button — the YouTube video ID (e.g. `dQw4w9WgXcQ`)
- the thumbnail `src` — `https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg`
- the `<span class="tag tag--…">` label, the `<h3>` title, the description, and `.card__meta`

The video opens in a lightbox player on click — no embeds load until then.

## Deploy

Hosted with **GitHub Pages**. Pushing to the default branch publishes the site;
the `CNAME` file maps it to `learndesign.tech`.

---

© learndesign.tech · Built for students, by Fox Bright.
