# English Janala

Next.js conversion of the [English Janala](https://github.com/chandan-d-karmaker/english-janala) vocabulary learning app.

## Stack

- Next.js (App Router)
- React (JSX)
- Tailwind CSS v4 + DaisyUI
- Programming Hero Open API for lessons and words

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    layout.jsx    # Root layout, fonts, Font Awesome
    page.jsx      # Home page (all sections)
    globals.css   # Tailwind + DaisyUI + custom fonts
  components/
    Header.jsx
    Hero.jsx
    VocabularySection.jsx
    FAQ.jsx
    Footer.jsx
  lib/
    api.js        # API helpers (levels, words, search)
public/
  assets/         # Images from original project
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build

Authentication is not included; add your own when ready.
