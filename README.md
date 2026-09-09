# Elite Gulf Recruitment - Vite + React + Bootstrap

A fully static rebuild of the site using Vite, React, React Router and Bootstrap 5
(no server, no Node.js required at runtime - only to build).

## Local development

```
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```
npm run build
```

Outputs static files to the `dist/` folder - plain HTML/CSS/JS, deployable anywhere
(Netlify, Vercel, GitHub Pages, any static host, or even a plain file server).

Preview the production build locally:

```
npm run preview
```

## Editing jobs

Edit `src/data/jobs.json`. Each job needs at least `title`, `country` and `city` -
every other field is optional.

## Editing company info / WhatsApp number

Edit `src/lib/site.js`.

## Deploying to Netlify

This repo includes a `netlify.toml` already configured:
- Build command: `npm run build`
- Publish directory: `dist`
- A redirect rule so client-side routing (React Router) works on page refresh/direct links

Just connect the GitHub repo in Netlify - no extra plugin or settings needed.
