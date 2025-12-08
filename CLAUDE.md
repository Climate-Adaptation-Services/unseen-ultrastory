# CLAUDE.md - Project Documentation

## Project Overview

**Name:** Ongekend Heet (Unseenly Hot)
**Type:** Interactive scrollytelling web application
**Framework:** SvelteKit 2.x with Svelte 4.x
**Purpose:** A narrative-driven data story about extreme heat events in the Netherlands, specifically focused on Eindhoven. The story combines scientific climate data with fictional storytelling to illustrate potential future heatwave scenarios.

## Tech Stack

- **Framework:** SvelteKit 2.5.x
- **Language:** JavaScript (with TypeScript support via jsconfig.json)
- **Build Tool:** Vite 5.4.x
- **Mapping:** Leaflet (svelte-leafletjs)
- **Data Visualization:** D3.js 7.x
- **Scrollytelling:** @sveltejs/svelte-scroller
- **CSS Parsing:** csv-parse
- **Utilities:** Lodash

## Project Structure

```
sveltekitapp/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Main page with Scroller component
│   │   └── +page.server.js       # Server-side data loading from CSV
│   ├── lib/
│   │   ├── components/           # Svelte components
│   │   │   ├── Titlepage.svelte  # Landing page with title
│   │   │   ├── Introductie.svelte
│   │   │   ├── Ziekenhuis.svelte # Hospital scene
│   │   │   ├── Gesprek.svelte    # Conversation scene
│   │   │   ├── Wandeling.svelte  # Walking scene with map route
│   │   │   ├── Scatter.svelte    # Temperature scatter plot
│   │   │   ├── Kansgrafiek.svelte# Probability chart
│   │   │   ├── Krantenkoppen.svelte # News headlines
│   │   │   ├── AutoRitje.svelte  # Car trip scene with route
│   │   │   ├── Aftiteling.svelte # Credits/closing
│   │   │   ├── BackgroundMap.svelte # Leaflet map background
│   │   │   ├── NavigationPanel.svelte
│   │   │   └── axes/             # Chart axis components
│   │   ├── noncomponents/
│   │   │   ├── routes.js         # GPS coordinate routes (walking, driving)
│   │   │   ├── helperFunctions.js
│   │   │   └── fadeOutIn.js
│   │   ├── stores.js             # Svelte stores (started, sound, csvData)
│   │   └── heatwave.png          # Background image
│   └── app.d.ts
├── static/
│   ├── images/                   # Story illustrations and icons
│   ├── sounds/                   # Audio files (heat, traffic, footsteps, etc.)
│   ├── global.css
│   └── *.ttf/otf                 # Custom fonts
├── package.json
├── svelte.config.js
└── vite.config.js
```

## Key Concepts

### Story Flow (stepNames)
The story progresses through these sections:
1. `thuis` - Home/Introduction
2. `ziekenhuis` - Hospital scene
3. `gesprek` - Conversation
4. `temperatuurstijging` - Temperature rise (scatter plot)
5. `kansgrafiek` - Probability chart
6. `wandeling` - Walking scene
7. `krantenkoppen` - News headlines
8. `autoritje` - Car trip
9. `aftiteling` - Credits

### Scroll-based Navigation
- Uses `@sveltejs/svelte-scroller` for scroll-driven storytelling
- `offset` (0-1) tracks progress within current section
- `index` tracks current section number
- Components react to `currentStepName` to show/hide content

### Data Sources
Temperature data loaded from GitHub-hosted CSVs:
- `yearly_max_temp_eindhoven.csv` - Historical temperature data
- `Observatie_Eindhoven_statistieken_Middellijn.csv` - Statistics
- `confidence_intervals.csv` - Confidence interval data

### Map Routes
Pre-defined GPS coordinate arrays in `routes.js`:
- `wandelRoute` - Walking path coordinates
- `autoRoute1/2/3` - Car trip route segments

## Commands

```bash
# Development
npm run dev           # Start dev server (port 5173)

# Build
npm run build         # Build for production
npm run preview       # Preview production build

# Type checking
npm run check         # Run svelte-check
npm run check:watch   # Run svelte-check in watch mode
```

## Stores

Located in `src/lib/stores.js`:
- `started` - Boolean, tracks if user has started the story
- `sound` - Boolean, tracks sound on/off state
- `csvData` - Writable store for CSV data (currently unused)

## Audio

The story includes ambient sound effects that respond to scroll position:
- Cricket/heat sounds on title page
- Hospital ambience
- Footsteps during walking scenes
- Traffic sounds during car scenes
- Volume adjusts based on scroll offset

## Styling Notes

- Dark/light map themes toggle based on scene (`krantenkoppen`, `wandeling` use dark theme)
- Custom fonts: Belanosima, Chunk, Digital, Steelfish
- Mobile responsive (conditional rendering at 600px breakpoint)
- Sections have varying heights (1000px - 7000px) based on content

## External APIs

- **Stadia Maps:** Dark map tiles (requires API key in URL)
- **CartoDB:** Light map tiles
- **GitHub Raw:** CSV data hosting

## Development Notes

- The app preloads all images from `/static/images/` using `import.meta.glob`
- Map pointer events are disabled to allow scroll interaction
- Each story section is a separate component receiving `offset`, `index`, `currentStepName`, and `stepName` props
