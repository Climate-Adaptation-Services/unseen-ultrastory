<script>
  import { onMount } from 'svelte'
  import { wandelRoute, autoRoute1, autoRoute2, autoRoute3 } from '$lib/noncomponents/routes.js';
  import { browser } from '$app/environment';

  // modules loaded from the client
  let LeafletMap;
  let TileLayer;
  let Marker;
  let Polyline;

  onMount(async () => {
		const SL = await import('svelte-leafletjs');
    LeafletMap = SL.LeafletMap
    TileLayer = SL.TileLayer
    Marker = SL.Marker
    Polyline = SL.Polyline
	});

  export let leafletMap;
  export let offset;
  export let index;
  export let currentStepName;

  let ziekenhuis;
  let huis;
  let zwembad;

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
    
    huis = L.tooltip(wandelRoute[0], {direction:'top', offset:[0,-40]})
    huis
      .setContent("Haus von Alisa und Daniel")
      .addTo(leafletMap);

    ziekenhuis = L.tooltip([49.0161882, 12.0645621], {direction:'top', offset:[0,-40]})
    zwembad = L.tooltip(autoRoute2[0], {direction:'top', offset:[0,-40]})
  }
  
  const mapOptions = {
    center: [48.99776, 12.12817],
    zoom: 7,
    preferCanvas: true,
    zoomControl: false,
  };

  const nightTileURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=70276298-f784-4ba8-93c8-439b926e8cab'
  const dayTileURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'

  const coordsHuis = [parseFloat(wandelRoute[0][0]), parseFloat(wandelRoute[0][1])]
  const coordsZiekenhuis = [49.0161882, 12.0645621]
  $: flyToCoordsHuis = (browser && window.innerWidth < 600)
    ? [coordsHuis[0]+0.002, coordsHuis[1]]
    : coordsHuis
  $: flyToCoordsZiekenhuis = (browser && window.innerWidth < 600)
    ? [coordsZiekenhuis[0]+0.002, coordsZiekenhuis[1]]
    : coordsZiekenhuis
  
  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  $: if(leafletMap && !['ziekenhuis', 'wandeling', 'krantenkoppen', 'autoritje'].includes(currentStepName)){
    leafletMap.flyTo(flyToCoordsHuis, 16, {duration: 3})
  }

  $: if(leafletMap && currentStepName === 'autoritje'){
    const centerCoords = [parseFloat(flyToCoordsHuis[0])+0.02, parseFloat(flyToCoordsHuis[1])+0.02]
    leafletMap.flyTo(centerCoords, 13, {duration: 1})
  }

  $: if(leafletMap && ['wandeling', 'krantenkoppen'].includes(currentStepName)){
    const zoom = (currentStepName === 'wandeling' && window.innerWidth < 600) ? 13 : 16;
    const centerCoords = [parseFloat(flyToCoordsHuis[0])+0.003, parseFloat(flyToCoordsHuis[1])]
    leafletMap.flyTo(centerCoords, zoom, {duration: 1})
  }

  $: if(leafletMap && 'ziekenhuis' === currentStepName){
    leafletMap.flyTo(flyToCoordsZiekenhuis, 16, {duration: 3})

    ziekenhuis
      .setContent("Krankenhaus Barmherzige Brüder")
      .addTo(leafletMap);
  }

  $: if(leafletMap && 'autoritje' === currentStepName){
    zwembad
      .setContent("Westbad")
      .addTo(leafletMap);
  }


</script>

  {#if LeafletMap}
    <div class="backgroundMap">
      <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={(['krantenkoppen', 'wandeling'].includes(currentStepName)) ? nightTileURL : dayTileURL} options={tileLayerOptions}/>
        <Marker latLng={wandelRoute[0]}/>
        {#if currentStepName === 'wandeling'}
          <Polyline latLngs={wandelRoute.slice(0, Math.max(0, Math.round(offset*1.2*wandelRoute.length - 5)))} color="#00bcd4" weight='5'/>
        {/if}
        {#if currentStepName === 'krantenkoppen'}
          <Polyline latLngs={wandelRoute} color="#00bcd4" weight='5'/>
        {/if}
        {#if currentStepName !== 'thuis'}
          <Marker latLng={[49.0161882, 12.0645621]}/>
        {/if}
        {#if currentStepName === 'autoritje'}
          <Marker latLng={autoRoute2[0]}/>
          {#if offset > 0.09}
            <!-- Route naar zwembad: offset 0.09 tot 0.18 (aankomst zwembad) -->
            <!-- autoRoute1 heeft 295 punten, moet volledig zijn bij offset 0.18 -->
            <Polyline latLngs={autoRoute1.slice(0, Math.max(0, Math.round((offset-0.09)*11*autoRoute1.length)))} color="#00bcd4" weight='5'/>
          {/if}
          {#if offset > 0.36}
            <!-- Route terug: offset 0.36 (file) tot 0.81 (ziekenhuis) -->
            <!-- autoRoute2 heeft 398 punten -->
            <!-- Locaties op route: -->
            <!-- Shell Rennweg 7 (pomp) = punt ~145 (36%) bij offset 0.63 -->
            <!-- Gutenbergstraße/Kirchmeierstraße (manonwel) = punt ~195 (49%) bij offset 0.72 -->
            <!-- Ziekenhuis = punt 398 (100%) bij offset 0.81 -->
            <Polyline latLngs={autoRoute2.slice(0, Math.max(0, Math.round(
              offset <= 0.63
                ? ((offset-0.36)/0.27) * 0.36 * autoRoute2.length
                : offset <= 0.72
                  ? (0.36 + ((offset-0.63)/0.09) * 0.13) * autoRoute2.length
                  : (0.49 + ((offset-0.72)/0.09) * 0.51) * autoRoute2.length
            )))} color="#00bcd4" weight='5'/>
          {/if}
        {/if}
      </LeafletMap>
    </div>
  {/if}


<style>

  div{
    height:100%;
    width:100%;
  }

  .backgroundMap{
    pointer-events:none;
    filter: contrast(1) saturate(1) hue-rotate(-30deg) sepia(10%) opacity(0.9);
  }

</style>
