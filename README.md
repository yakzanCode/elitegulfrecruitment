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

## Editing jobs (recommended: via Excel)

The source of truth for job listings is `data-source/jobs.xlsx` - a spreadsheet
your client can fill in directly, with no code involved.

**Workflow:**
1. Send the client `data-source/jobs.xlsx` (or `data-source/jobs-template.xlsx`
   for a fresh start with just one example row and an Instructions sheet).
2. They edit it in Excel/Google Sheets - add, remove or update job rows,
   including Arabic translations.
3. They send it back. Save it over `data-source/jobs.xlsx` in this project.
4. Run the converter:
   ```
   npm install xlsx --save-dev   (one-time)
   npm run import:jobs
   ```
   This regenerates `src/data/jobs.json` from the spreadsheet.
5. Review the diff, commit, and push - Netlify redeploys automatically.

**Spreadsheet structure** (4 sheets, linked by Job ID):
- **Jobs** - one row per job: title, country, city, salary, experience, etc.
  (English + Arabic columns side by side)
- **Description** - one row per paragraph (Job ID + Order + English + Arabic)
- **Requirements** - one row per bullet point, same structure
- **Benefits** - one row per bullet point, same structure

Full instructions are in the Instructions sheet of the template itself.

You can still hand-edit `src/data/jobs.json` directly for a quick one-off fix -
just remember it will be **overwritten** the next time `npm run import:jobs` runs,
so for anything permanent, edit the spreadsheet instead.

## Editing company info / WhatsApp number

Edit `src/lib/site.js`.

## Editing site text / translations

All UI copy (menus, buttons, page headings, paragraphs) lives in
`src/lib/i18n/translations.js`, with `en` and `ar` sections. The language
switcher in the header toggles between them; Arabic also switches the page
to right-to-left layout automatically.

## Deploying to Netlify

This repo includes a `netlify.toml` already configured:
- Build command: `npm run build`
- Publish directory: `dist`
- A redirect rule so client-side routing (React Router) works on page refresh/direct links

Just connect the GitHub repo in Netlify - no extra plugin or settings needed.
