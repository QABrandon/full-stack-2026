# Recipe Finder

FS12 Week 8 Major Project #2, Option B.

## Project Overview

Recipe Finder is a vanilla HTML, CSS, and JavaScript app that uses TheMealDB API
to search and display recipes.

Users can:

- Search recipes by ingredient.
- Search recipes by cuisine/area.
- Search recipes by category or diet.
- View recipe details in a modal.
- Save favorite recipes with localStorage.
- Remove saved favorites.

## Design Approach

The app uses a clean, card-based recipe finder layout with a warm, food-inspired
color palette. The design is mobile-first: sections stack on small screens and
shift into a two-column layout on desktop.

It was built with plain HTML, CSS, and JavaScript to match the class project
requirements. It does not use Tailwind, Bootstrap, Webflow, or a professional
design system.

## API Used

Primary API: <https://www.themealdb.com/api/json/v1/1/>

TheMealDB is used because it has free class-friendly endpoints for recipe
search, recipe details, ingredients, instructions, categories, cuisines, and
images.

## Nutrition Note

TheMealDB does not provide nutrition data in the free recipe response. The app
shows a nutrition note in the recipe detail view instead of hardcoding fake
nutrition values.

## Files

- `index.html` - page structure
- `styles.css` - responsive styling
- `app.js` - API calls, rendering, modal behavior, and localStorage
