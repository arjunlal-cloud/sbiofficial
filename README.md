# SBI Network

SBI Network connects student-led chapters with local small businesses for free digital services, while giving ambitious students a clear path to connect, learn, lead chapters, and help one another grow.

**Live website:** https://sbinetwork.replit.app 

## Stack

React, Vite, Tailwind CSS, React Router, and Leaflet.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address Vite prints in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```text
public/       Static images, logos, and team photos
src/
  components/ Shared UI and page sections
  data/       Chapter, glossary, and SOP content
  pages/      Site pages and routes
```

## Ask SBI concierge

The site includes an optional Ask SBI concierge. When no compatible API is connected, it uses its built-in answers so the standalone site remains usable without keys or secret configuration.

## Deploying

`vercel.json` includes an SPA rewrite so direct links such as `/chapter` and `/business` work on Vercel. Other static hosts should be configured to serve `index.html` for unknown routes.
