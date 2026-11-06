# GeoWiki

Explore the World, One Fact at a Time.

GeoWiki is an interactive geography encyclopedia for articles, maps, and quizzes.

## Main features

- Shared page layout, navigation, and footer
- United States state list and shared state article template
- 50 States Challenge: find all 50 states on an interactive map

## Quiz

Open `/quiz/` to play 50 States Challenge. The map has no state names. Click the state named in the prompt, and keep clicking until it is correct. Each miss lowers the accuracy score. Correct states stay marked until Restart.

## Technology stack

- Astro
- TypeScript
- HTML and CSS

## Installation

```bash
npm install
```

## Development commands

```bash
npm run dev
npm run build
npm run preview
```

## Deployment

The site is intended for GitHub Pages with Astro static output. Set `site` and `base` in `astro.config.mjs` to the repository URL before the first deployment. The GitHub Actions workflow is not included in this setup step.
