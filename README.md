# Biletick

A movie browser built on [TMDB](https://www.themoviedb.org/) data. Browse what's showing, filter by genre and year, search, read reviews, check cast and crew, and save movies for later.

**Live:** https://front-movie-site.vercel.app

## Features

- Home page with trending, popular, top-rated and upcoming rows
- Movie catalogue with genre, year and sort filters
- Movie pages with overview, gallery, reviews, cast and crew
- Person pages with biography and filmography
- Search with debounced results
- Saved movies, kept in the browser
- Dark and light themes
- Three languages: O‘zbekcha, Русский, English
- Demo sign-in (see below)

## Demo account

There is no real sign-up. Sign in with the built-in demo account:

| Username | Password     |
| -------- | ------------ |
| `demo`   | `cinema2026` |

The sign-in page also has a **Fill in** button. The session is kept in `localStorage`, so it only lives in your browser.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4 and Ant Design
- TanStack Query for server data
- Redux Toolkit for saved movies, theme and auth
- React Router 7
- i18next

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Script            | What it does                   |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the dev server           |
| `npm run build`   | Type-check and build to `dist` |
| `npm run preview` | Serve the production build     |
| `npm run lint`    | Run ESLint                     |

## Project structure

The code follows [Feature-Sliced Design](https://feature-sliced.design/). Each layer may only import from the layers below it.

```
src/
  app/        providers, router, store, styles, i18n
  pages/      one folder per route
  widgets/    page sections (header, movie rail, gallery...)
  features/   user actions (auth, bookmark, filters, search, theme...)
  entities/   movie, person, review: API calls, types, cards
  shared/     UI kit, helpers, config
public/locales/  translation files
```

## Credits

Movie data and images are from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
