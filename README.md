# Prasanth Zodiac — Portfolio

Production-ready Vite + React portfolio. Build output is static (`dist/`) and works on **Vercel** or **Render** (static site).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist` locally |
| `npm run lint` | ESLint |

**Node:** 20+ (see `engines` in `package.json`).

## Environment (optional — Base44)

Portfolio runs as a static site without backend. For Base44 auth/API, copy `.env.example` to `.env.local` and set variables; then add the same keys in Vercel / Render dashboards.

## Deploy — Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com): **Add New Project** → import the repository.
3. Framework preset: **Vite** (auto). Build: `npm run build`, output: `dist`.
4. `vercel.json` already includes SPA rewrites and security headers.

## Deploy — Render (static)

1. Push this repo to GitHub.
2. In [Render](https://render.com): **New** → **Static Site** → connect the repo.
3. **Build command:** `npm ci && npm run build`  
4. **Publish directory:** `dist`  
5. **Redirects:** add a rewrite `/*` → `/index.html` if the UI does not offer it (this repo includes `render.yaml` for Blueprint deploys).

Alternatively use **Blueprint** and point Render at `render.yaml`.

## Repository

```bash
git init
git add .
git commit -m "Initial production portfolio"
git remote add origin https://github.com/prasanthzodiac/Portfolio-.git
git branch -M main
git push -u origin main
```
