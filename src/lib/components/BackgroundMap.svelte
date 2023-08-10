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
      .setContent("Huis van Niels en Leonie")
      .addTo(leafletMap);

    ziekenhuis = L.tooltip([51.466143, 5.472363], {direction:'top', offset:[0,-40]})
    zwembad = L.tooltip(autoRoute2[0], {direction:'top', offset:[0,-40]})
  }
  
  const mapOptions = {
    center: [51.426437, 5.470482],
    zoom: 7,
    preferCanvas: true,
    zoomControl: false,
  };

  const nightTileURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=70276298-f784-4ba8-93c8-439b926e8cab'
  const dayTileURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'

  const coordsHuis = [parseFloat(wandelRoute[0][0]), parseFloat(wandelRoute[0][1])] 
  const coordsZiekenhuis = [51.466143, 5.472363]
  $: flyToCoordsHuis = (browser && window.innerWidth < 600)
    ? [coordsHuis[0]+0.002, coordsHuis[1]]
    : coordsHuis
  $: flyToCoordsZiekenhuis = (browser && window.innerWidth < 600)
    ? [coordsZiekenhuis[0]+0.002, coordsZiekenhuis[1]]
    : coordsZiekenhuis
  
  $: console.log(flyToCoordsHuis, flyToCoordsZiekenhuis)

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  $: if(leafletMap && !['ziekenhuis'].includes(currentStepName)){
    const zoom = (currentStepName === 'autoritje') ? 13 : 16;
    const centerCoords = (currentStepName === 'autoritje') ? [parseFloat(flyToCoordsHuis[0])+0.02, parseFloat(flyToCoordsHuis[1])+0.02] : flyToCoordsHuis
    leafletMap.flyTo(centerCoords, zoom, {duration: 3})
  }

  $: if(leafletMap && 'ziekenhuis' === currentStepName){
    leafletMap.flyTo(flyToCoordsZiekenhuis, 16, {duration: 3})
    
    ziekenhuis
      .setContent("Catharina ziekenhuis")
      .addTo(leafletMap);
  }

  $: if(leafletMap && 'autoritje' === currentStepName){
    zwembad
      .setContent("Zwembad")
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
          <Marker latLng={[51.466143, 5.472363]}/>
        {/if}
        {#if currentStepName === 'autoritje'}
          <Marker latLng={autoRoute2[0]}/>
          {#if offset > 0.05}
            <Polyline latLngs={autoRoute1.slice(0, Math.max(0, Math.round(offset*6*autoRoute1.length-100)))} color="#00bcd4" weight='5'/>
          {/if}
          {#if offset > 0.24}
            <Polyline latLngs={autoRoute2.slice(0, Math.max(0, Math.round(offset*2.5*autoRoute2.length-40)))} color="#00bcd4" weight='5'/>
          {/if}
          {#if offset > 0.43}
            <Polyline latLngs={autoRoute3.slice(0, Math.max(0, Math.round(offset*16*autoRoute3.length-3500)))} color="#00bcd4" weight='5'/>
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
