# Lectura

Lectura is a web platform for professors to upload lecture videos and generate learning materials with AI. After upload, the system produces a time-synced transcript, a concise summary, and an automatically generated quiz.

This repository contains the React front-end built with Vite.

## Overview

Lectura focuses on a simple workflow:

1. Upload a lecture video and associate it with a class.
2. The lecture is processed in the background.
3. Browse and search uploaded lectures on the dashboard.
4. Open a lecture to watch the video alongside a synchronized transcript, then review the AI summary and take the quiz.

## Key features

- **Lecture uploads**
  - Upload `.mp4` lectures
  - Optionally rename the lecture before uploading
  - Assign the lecture to a class

- **Lecture dashboard**
  - Search lectures by name
  - See processing status (lectures remain unavailable until processing completes)

- **Lecture viewer**
  - Built-in video player
  - Time-synced transcript that highlights the current segment while the video plays
  - Click any transcript segment to jump the video to that timestamp
  - AI-generated summary
  - Auto-generated quiz with scoring and retry

- **UI**
  - Material UI (MUI) component library
  - Responsive layout and consistent styling

## Tech stack

- React + Vite
- Material UI (MUI) + MUI Lab (LoadingButton)
- React Router
- TanStack Query (React Query) for data fetching, caching, and invalidation
- Custom hooks for API integration (examples used by the UI):
  - `useSearchVideos(query)`
  - `usePresignedUpload()`
  - `useGetVideoData(lectureName)`

## Local development

### Prerequisites

- Node.js (LTS recommended)
- npm

### Setup

```bash
npm install
npm run dev
```

Vite will print the local dev server URL in your terminal (typically `http://localhost:5173`).

## Application routes

- `/` — Dashboard (browse/search lectures)
- `/upload` — Upload a new lecture
- `/view/:lectureName` — View a lecture (video, transcript, summary, quiz)

## Project layout (high level)

- `pages/`
  - `Dashboard` — lecture listing + search
  - `Upload` — upload form + class selection
  - `ViewVideo` — video player + transcript + summary + quiz
- `components/`
  - `Navbar` — primary navigation
  - `Quiz` — quiz renderer (scoring + retry)
- `hooks/`
  - API integration hooks (React Query)

## Roadmap ideas

- Class management backed by persisted data (instead of a local list)
- Transcript search and filtering
- Downloadable transcript/summary exports (PDF/Markdown)
- Basic analytics (watch progress, quiz attempts)
- Role-based access (professor vs student views)
