# MyLegS

MyLegS is a React + TypeScript web app for Malaysian Legal System learners.  
It includes study pages, learning resources, practice flows, and an AI tutor experience.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- `@google/genai` (AI tutor integration)

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` in the project root:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open:
   `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## Project Structure

```text
.
|-- App.tsx
|-- index.tsx
|-- components/
|-- context/
|-- pages/
|   |-- admin/
|-- constants.ts
|-- types.ts
|-- vite.config.ts
`-- metadata.json
```

## Environment Notes

- `vite.config.ts` maps `GEMINI_API_KEY` into `process.env.API_KEY` and `process.env.GEMINI_API_KEY` for app usage.
- If the key is missing or invalid, AI tutor features may fail while the rest of the app can still load.

## Build Output

Run:

```bash
npm run build
```

Vite outputs the production bundle to `dist/`.
