<script>
  /**
   * MapLibreMap — WebGL map background, drop-in replacement for BackgroundMap.svelte
   *
   * Improvements over the Leaflet version:
   *   • GPU-accelerated WebGL rendering (MapLibre GL JS)
   *   • Smooth tile transitions without full style reloads — both tile sets
   *     are loaded at startup; dark/light switching is a visibility toggle
   *   • Route lines are GeoJSON sources, updated per-frame via setData()
   *     — no DOM diff overhead from svelte-leafletjs components
   *   • flyTo uses MapLibre's native curve easing (more cinematic than Leaflet)
   *   • Atmospheric CSS filter consistent with original
   *
   * Coordinate convention note:
   *   routes.js stores [lat, lng] string pairs (Leaflet convention).
   *   MapLibre uses [lng, lat] GeoJSON convention.
   *   The `toML()` helper converts on the fly.
   */

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { wandelRoute, autoRoute1, autoRoute2, autoRoute3 } from '$lib/noncomponents/routes.js';

  export let offset;
  export let index;
  export let currentStepName;
  // Kept for API compatibility — not used internally
  export let leafletMap = undefined;

  // ── Coordinate helpers ────────────────────────────────────────────────────

  /** [lat, lng] string pair → [lng, lat] number pair (GeoJSON / MapLibre) */
  const toML = ([lat, lng]) => [parseFloat(lng), parseFloat(lat)];

  /** Wrap a coordinate array in a GeoJSON LineString Feature */
  const lineFeature = (coords) => ({
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: coords },
  });

  const EMPTY_LINE = lineFeature([]);

  // Pre-compute all route coords in MapLibre [lng, lat] format
  const WALK_COORDS  = wandelRoute.map(toML);
  const AUTO1_COORDS = autoRoute1.map(toML);
  const AUTO2_COORDS = autoRoute2.map(toML);
  const AUTO3_COORDS = autoRoute3.map(toML);

  // ── Anchor coordinates ────────────────────────────────────────────────────

  // Home (start of wandelRoute): [lng, lat]
  const HOME_LL      = toML(wandelRoute[0]);
  // Hospital: [lng, lat]
  const HOSPITAL_LL  = [5.472363, 51.466143];
  // Pool (start of autoRoute2): [lng, lat]
  const ZWEMBAD_LL   = toML(autoRoute2[0]);

  // ── Tile URLs ─────────────────────────────────────────────────────────────

  const API_KEY   = '70276298-f784-4ba8-93c8-439b926e8cab';
  const DARK_URL  = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png?api_key=${API_KEY}`;
  const LIGHT_URL = 'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png';

  const DARK_SCENES = ['krantenkoppen', 'wandeling'];

  // ── MapLibre style ────────────────────────────────────────────────────────
  // Both tile sets + all route sources are declared upfront.
  // Switching dark/light is a layout-visibility toggle — no style reload needed.

  const MAP_STYLE = {
    version: 8,
    sources: {
      'tiles-light': { type: 'raster', tiles: [LIGHT_URL], tileSize: 256, attribution: '© CartoDB' },
      'tiles-dark':  { type: 'raster', tiles: [DARK_URL],  tileSize: 256, attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap' },
      'walk-route':  { type: 'geojson', data: EMPTY_LINE },
      'auto1':       { type: 'geojson', data: EMPTY_LINE },
      'auto2':       { type: 'geojson', data: EMPTY_LINE },
      'auto3':       { type: 'geojson', data: EMPTY_LINE },
    },
    layers: [
      // Tile layers — one visible at a time
      { id: 'tiles-light-layer', type: 'raster', source: 'tiles-light', layout: { visibility: 'visible' } },
      { id: 'tiles-dark-layer',  type: 'raster', source: 'tiles-dark',  layout: { visibility: 'none'    } },
      // Route lines — always rendered, empty when not in use
      {
        id: 'walk-route-layer', type: 'line', source: 'walk-route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#00bcd4', 'line-width': 5 },
      },
      {
        id: 'auto1-layer', type: 'line', source: 'auto1',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#00bcd4', 'line-width': 5 },
      },
      {
        id: 'auto2-layer', type: 'line', source: 'auto2',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#00bcd4', 'line-width': 5 },
      },
      {
        id: 'auto3-layer', type: 'line', source: 'auto3',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#00bcd4', 'line-width': 5 },
      },
    ],
  };

  // ── State ─────────────────────────────────────────────────────────────────

  let mapContainer;
  let map;
  let mapLoaded = false;
  // Track last scene for flyTo de-duplication (avoid re-flying every offset tick)
  let lastScene = '';

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  onMount(async () => {
    if (!browser) return;

    // Dynamic import — handle both default-export and namespace-export shapes
    const ml = await import('maplibre-gl');
    const maplibregl = ml.default ?? ml;

    if (!mapContainer) return; // guard against unmount during async import

    map = new maplibregl.Map({
      container: mapContainer,
      style: MAP_STYLE,
      center: [5.470482, 51.426437], // [lng, lat] — Eindhoven overview
      zoom: 7,
      interactive: false,           // scroll-driven; no user panning
      attributionControl: false,
    });

    map.on('load', () => {
      mapLoaded = true;

      // Helper: add a marker + an always-visible label popup (mimics L.tooltip)
      function addLabel(lngLat, text, color) {
        new maplibregl.Marker({ color, scale: 0.75 })
          .setLngLat(lngLat)
          .addTo(map);

        // Popup with anchor 'bottom' so it sits above the marker pin.
        // .addTo(map) directly (not via marker) makes it always visible.
        new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'bottom',
          offset: [0, -38],
        })
          .setLngLat(lngLat)
          .setText(text)
          .addTo(map);
      }

      addLabel(HOME_LL,     'Huis van Niels en Leonie', '#00bcd4');
      addLabel(HOSPITAL_LL, 'Catharina ziekenhuis',     '#e05a2b');
      addLabel(ZWEMBAD_LL,  'Zwembad',                  '#00bcd4');
    });
  });

  onDestroy(() => {
    map?.remove();
  });

  // ── Reactive: dark/light tile toggle ─────────────────────────────────────

  $: if (map && mapLoaded && currentStepName !== undefined) {
    const isDark = DARK_SCENES.includes(currentStepName);
    map.setLayoutProperty('tiles-light-layer', 'visibility', isDark ? 'none'    : 'visible');
    map.setLayoutProperty('tiles-dark-layer',  'visibility', isDark ? 'visible' : 'none');
  }

  // ── Reactive: flyTo on scene change ───────────────────────────────────────
  // Same logic as the Leaflet version, converted to MapLibre [lng, lat] API.

  $: if (map && mapLoaded && currentStepName && currentStepName !== lastScene) {
    lastScene = currentStepName;

    const isMobile = browser && window.innerWidth < 600;

    if (currentStepName === 'ziekenhuis') {
      map.flyTo({
        center: isMobile ? [HOSPITAL_LL[0], HOSPITAL_LL[1] + 0.002] : HOSPITAL_LL,
        zoom: 16,
        duration: 3000,
        essential: true,
      });
    } else {
      const zoom = (currentStepName === 'autoritje' || (currentStepName === 'wandeling' && isMobile))
        ? 13
        : 16;

      let center = isMobile
        ? [HOME_LL[0], HOME_LL[1] + 0.002]
        : [...HOME_LL];

      if (currentStepName === 'autoritje') {
        // Pull back for car overview — add 0.02 to both axes (same offset as original)
        center = [HOME_LL[0] + 0.02, HOME_LL[1] + 0.02];
      } else if (currentStepName === 'wandeling') {
        // Slight west shift to keep route line centred in viewport
        center = [HOME_LL[0] - 0.002, HOME_LL[1]];
        if (isMobile) center[1] += 0.002;
      }

      map.flyTo({ center, zoom, duration: 3000, essential: true });
    }
  }

  // ── Reactive: route lines ─────────────────────────────────────────────────
  // Mirrors the exact slice formulas from BackgroundMap.svelte.

  $: if (map && mapLoaded) {
    // Walking route — progressively revealed during wandeling and shown complete for krantenkoppen
    if (currentStepName === 'wandeling') {
      const count = Math.max(0, Math.round(offset * 1.2 * WALK_COORDS.length - 5));
      map.getSource('walk-route')?.setData(lineFeature(WALK_COORDS.slice(0, count)));
    } else if (currentStepName === 'krantenkoppen') {
      map.getSource('walk-route')?.setData(lineFeature(WALK_COORDS));
    } else {
      map.getSource('walk-route')?.setData(EMPTY_LINE);
    }

    // Car routes — three segments drawn at different scroll depths
    if (currentStepName === 'autoritje') {
      const c1 = offset > 0.05
        ? Math.max(0, Math.round(offset * 6    * AUTO1_COORDS.length - 100))
        : 0;
      const c2 = offset > 0.24
        ? Math.max(0, Math.round(offset * 2.5  * AUTO2_COORDS.length - 40))
        : 0;
      const c3 = offset > 0.43
        ? Math.max(0, Math.round(offset * 16   * AUTO3_COORDS.length - 3500))
        : 0;

      map.getSource('auto1')?.setData(lineFeature(AUTO1_COORDS.slice(0, c1)));
      map.getSource('auto2')?.setData(lineFeature(AUTO2_COORDS.slice(0, c2)));
      map.getSource('auto3')?.setData(lineFeature(AUTO3_COORDS.slice(0, c3)));
    } else {
      map.getSource('auto1')?.setData(EMPTY_LINE);
      map.getSource('auto2')?.setData(EMPTY_LINE);
      map.getSource('auto3')?.setData(EMPTY_LINE);
    }
  }
</script>

<!-- maplibre-gl requires a container with non-zero dimensions at init time -->
<div class="map-container" bind:this={mapContainer} />

<style>
  .map-container {
    height: 100vh;
    width: 100vw;
    filter: contrast(1) saturate(1) hue-rotate(-30deg) sepia(10%) opacity(0.9);
    pointer-events: none;
  }

  /* Override global body { color: white } inside MapLibre popups */
  :global(.maplibregl-popup-content) {
    color: #1a1a1a;
    font-family: Belanosima, sans-serif;
    font-size: 0.75rem;
    padding: 6px 10px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  :global(.maplibregl-popup-tip) {
    /* keep default tip visible */
  }
</style>
