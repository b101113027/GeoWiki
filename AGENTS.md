# AGENTS.md

# GeoWiki — Project Development Guidelines

## 1. Project Overview

Project Name: GeoWiki

Tagline: Explore the World, One Fact at a Time.

GeoWiki is an interactive geography encyclopedia designed
to help users explore geographical knowledge through
articles, maps, and interactive quizzes.

The main goals of this project are:
- Provide organized and accessible geography information.
- Introduce countries, regions, and geographical features.
- Build an encyclopedia of the 50 states of the United States.
- Provide interactive geography learning experiences.
- Allow future content and features to be added consistently.

This project should be designed for long-term expansion.
New pages and features must follow the existing project
structure and design guidelines.

## 2. Technology Stack

Use the following technologies:

- Framework: Astro
- Programming Language: TypeScript
- Markup: HTML
- Styling: CSS
- Article Content: Markdown
- Structured Data: JSON
- Version Control: Git and GitHub
- Deployment: GitHub Pages

Development principles:
- Prefer simple and maintainable solutions.
- Reuse existing dependencies and components.
- Avoid unnecessary packages.
- Use TypeScript for interactive functionality.
- Use semantic HTML.
- Keep content separate from application logic.

## 3. Website Design Guidelines

### 3.1 Visual Style

The website should have a modern geography atlas style.

Design characteristics:
- Clean and professional.
- Easy to read and navigate.
- Inspired by modern digital maps and encyclopedias.
- Use sufficient whitespace.
- Present information through reusable cards.
- Avoid excessive animations and visual decorations.

### 3.2 Color Palette

Use the following color palette consistently.

- Primary: #234B70
- Secondary: #DCEAF4
- Background: #F8F7F2
- Accent: #E8A94B
- Text: #303943
- Muted Text: #77818B
- Border: #E3E6E8

Do not introduce unrelated colors without a
clear design reason.

### 3.3 Typography

- Chinese Font: Noto Sans TC
- English Font: Inter
- Use consistent heading hierarchy.
- Ensure sufficient text contrast.
- Avoid excessively small text.

### 3.4 Layout

- Use a consistent navigation bar.
- Use a shared footer.
- Use reusable card components.
- Maintain consistent spacing and border radius.
- Support desktop, tablet, and mobile devices.
- Ensure that all pages have a consistent visual identity.

## 4. Website Structure

The website should contain the following sections.

### Homepage
Route: /

Content:
- Website introduction.
- Featured geography categories.
- Popular encyclopedia articles.
- World geography exploration entry.
- United States states entry.
- Interactive quiz entry.

### Encyclopedia
Route: /encyclopedia/

Content:
- Geography categories.
- Article search.
- Article listings.
- Links to individual topics.

### United States States
Route: /states/

Content:
- List of all 50 states.
- State names and abbreviations.
- State capitals.
- Geographic regions.
- Links to individual state articles.

### Individual State Pages
Route: /states/[slug]/

Each state page must use the same reusable template.

### Interactive Quiz
Route: /quiz/

Content:
- Interactive United States map.
- Random state selection.
- Answer input.
- Answer validation.
- Quiz progress.
- Correct answer feedback.
- Restart functionality.

### About
Route: /about/

Content:
- Project introduction.
- Project goals.
- Data sources.
- Development information.

## 5. Project Directory Structure

Follow this directory structure whenever possible.

```
geowiki/
├── AGENTS.md
├── README.md
├── package.json
├── astro.config.mjs
├── public/
│   ├── images/
│   │   ├── flags/
│   │   └── maps/
│   └── data/
│       └── us-states.json
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── SearchBar.astro
│   │   ├── CategoryCard.astro
│   │   └── StateCard.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── content/
│   │   └── states/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── encyclopedia/
│   │   ├── states/
│   │   ├── quiz/
│   │   └── about.astro
│   ├── scripts/
│   │   └── state-quiz.ts
│   └── styles/
│       └── global.css
└── .github/
    └── workflows/
        └── deploy.yml
```

If the project structure needs to change,
update this document accordingly.

## 6. File Naming Rules

All filenames should follow these rules:

- Use lowercase English letters.
- Use hyphens to separate multiple words.
- Avoid spaces and special characters.
- Use descriptive names.
- Keep file extensions consistent with their purpose.

Examples:

Correct:
- california.md
- new-york.md
- state-quiz.ts
- category-card.astro

Incorrect:
- California.md
- New York.md
- test123.ts

## 7. Encyclopedia Content Guidelines

All encyclopedia articles must follow a consistent format.

Each article should contain:

1. Title
2. Introduction
3. Geographic Location
4. Important Facts
5. Geographic Features
6. Culture and Characteristics
7. References

Content requirements:
- Use clear and understandable language.
- Divide long articles into sections.
- Use bullet points when appropriate.
- Avoid unnecessary repetition.
- Provide reliable references.
- Do not invent geographical facts or statistics.
- Include the relevant year when presenting statistics.
- Clearly indicate uncertainty when information cannot
  be verified.

### 7.1 State Article Format

Each state article should include frontmatter.

Example:

```yaml
---
title: "California"
slug: "california"
stateCode: "CA"
capital: "Sacramento"
region: "West"
---
```

The article body must follow the standard
encyclopedia structure.

### 7.2 Adding New Articles

When adding a new article:

1. Create a Markdown file in the appropriate directory.
2. Follow the standard frontmatter format.
3. Follow the existing article structure.
4. Use reliable information sources.
5. Ensure the article can be displayed using
   the existing page template.
6. Do not create a separate page layout for each article.

## 8. Structured Data Guidelines

Structured data should be stored separately from
page components.

The United States state dataset should include:

- name
- chineseName
- code
- capital
- aliases
- region

Example:

```json
{
  "name": "California",
  "chineseName": "加利福尼亞州",
  "code": "CA",
  "capital": "Sacramento",
  "aliases": ["Calif."],
  "region": "West"
}
```

All 50 states must follow the same data structure.

Do not duplicate state information across multiple files
unless necessary.

## 9. Component Development Guidelines

Reusable components should be stored in:

src/components/

Rules:
- Reuse existing components whenever possible.
- Each component should have a clear responsibility.
- Avoid unnecessary code duplication.
- Use descriptive component names.
- Keep styling consistent with global.css.
- Do not duplicate navigation bars or footers.
- Components should support reusable data through props.

When creating a new component, consider whether
it can be reused by other pages.

## 10. Interactive Quiz Guidelines

The United States geography quiz should support
the following features:

### Quiz Functionality

- Randomly select a state.
- Display the selected state on the map.
- Allow users to enter answers.
- Support English state names.
- Support two-letter state abbreviations.
- Support predefined aliases.
- Ignore capitalization differences.
- Ignore unnecessary leading and trailing spaces.
- Validate answers accurately.
- Highlight correctly answered states.
- Track quiz progress.
- Allow users to restart the quiz.

### Quiz Logic

- Keep quiz logic separate from page layout.
- Use the shared state dataset.
- Avoid hardcoding state information in components.
- Prevent already completed states from being selected.
- Display appropriate feedback for correct and incorrect answers.

### Map Requirements

- Display all 50 states.
- Clearly distinguish the selected state.
- Change the color of correctly answered states.
- Ensure that the map is responsive.
- Keep state identifiers consistent with the dataset.

## 11. Search and Navigation Guidelines

- Navigation must be consistent across pages.
- All internal links must work correctly.
- Search should support relevant article titles.
- Search results should link to the corresponding pages.
- Avoid broken links and unnecessary redirects.
- Make important categories easy to discover.

## 12. Responsive Design Guidelines

The website must support:

- Desktop
- Tablet
- Mobile

Requirements:
- Navigation should adapt to smaller screens.
- Cards should rearrange appropriately.
- Text must remain readable.
- Images and maps must scale correctly.
- Interactive controls must remain usable.
- Avoid horizontal overflow.

## 13. AI Development Rules

Before making any changes:

1. Read this AGENTS.md file.
2. Inspect the existing project structure.
3. Understand the relevant components and pages.
4. Identify reusable code.
5. Follow the existing naming conventions.

When adding new features:

1. Follow the existing design system.
2. Reuse existing components.
3. Keep code organized.
4. Separate content, data, and logic.
5. Avoid changing unrelated files.
6. Update documentation when necessary.

When modifying existing features:

- Preserve existing functionality.
- Avoid unnecessary rewrites.
- Check whether other pages depend on the modified code.
- Explain important structural changes.

Do not:
- Replace the entire project unnecessarily.
- Create duplicate components.
- Introduce inconsistent design styles.
- Hardcode information that already exists in shared data.
- Remove existing features without permission.

## 14. Quality Assurance

Before completing development, verify:

- The project can be built successfully.
- There are no TypeScript errors.
- There are no obvious console errors.
- All navigation links work.
- All article pages render correctly.
- Interactive features work as expected.
- Responsive layouts display correctly.
- Existing functionality remains intact.

Run the production build before considering
a development task complete.

## 15. GitHub Pages Deployment

The project is deployed using GitHub Pages.

Deployment requirements:

- Use Astro's static site generation.
- Configure the correct site and base paths.
- Ensure internal links work under the repository path.
- Ensure images and assets load correctly.
- Use GitHub Actions for deployment.
- Verify the production website after deployment.

Do not hardcode localhost URLs.

## 16. Documentation Maintenance

Update README.md when necessary.

README.md should include:
- Project introduction.
- Main features.
- Technology stack.
- Installation instructions.
- Development commands.
- Deployment information.

Update AGENTS.md when major project rules,
directory structures, or development conventions change.

Keep this document accurate and consistent
with the actual project.