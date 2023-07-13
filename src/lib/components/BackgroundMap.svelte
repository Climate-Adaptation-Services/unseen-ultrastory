<script>
  import { afterUpdate, onMount } from 'svelte'
  import { wandelRoute, autoRoute } from '$lib/noncomponents/routes.js';
  import { map, select } from 'd3';

  // modules loaded from the client
  let LeafletMap;
  let TileLayer;
  let Marker;
  let Polyline;
  let Tooltip;
  onMount(async () => {
		const SL = await import('svelte-leafletjs');
    LeafletMap = SL.LeafletMap
    TileLayer = SL.TileLayer
    Marker = SL.Marker
    Polyline = SL.Polyline
    Tooltip = SL.Tooltip
	});

  export let leafletMap;
  export let offset;
  export let index;
  export let currentStepName;

  let zoomedIn = false
  let showingWandelRoute = false
  let showingAutoRoute = false

  let ziekenhuis;

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
    
    const huis = L.tooltip(wandelRoute[0], {direction:'top', offset:[0,-40]})
    huis
      .setContent("Huis van Niels en Leonie")
      .addTo(leafletMap);

    ziekenhuis = L.tooltip([51.466143, 5.472363], {direction:'top', offset:[0,-40]})

  }
  
  const mapOptions = {
    center: [51.426437, 5.470482],
    zoom: 7,
    preferCanvas: true,
    zoomControl: false,
  };

  // const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  // const tileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  // const tileUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  let tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
  
  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      // attribution: "© OpenStreetMap contributors",
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  $: if(leafletMap && offset > 0.1 && !zoomedIn){
    zoomedIn = true
    leafletMap.flyTo([51.426437, 5.470482], 15, {duration: 5})
  }
  $: if(leafletMap && offset < 0.1 && zoomedIn && currentStepName === 'huis'){
    zoomedIn = false
    leafletMap.flyTo([51.4380, 5.4782], 7, {duration: 1})
    showingWandelRoute = false
  }
  $: if(leafletMap && currentStepName === 'ziekenhuis'){
    leafletMap.flyTo([51.466143, 5.472363], 15, {duration: 2})
    tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
    
    ziekenhuis
      .setContent("Catharina ziekenhuis")
      .addTo(leafletMap);
  }

  $: if(leafletMap && offset < 0.1 && currentStepName === 'gesprek'){
    zoomedIn = false
    leafletMap.flyTo([51.4380, 5.4782], 15, {duration: 1})
    showingWandelRoute = false
    tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
  }

  $: if(leafletMap && currentStepName === 'wandeling'){
    showingWandelRoute = true
    leafletMap.flyTo([51.426437, 5.470482], 16, {duration: 2})
    tileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }

  $: if(leafletMap && currentStepName === 'unseen'){
    leafletMap.flyTo([51.426437, 5.470482], 16, {duration: 2})
    tileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    showingAutoRoute = false
  }

  $: if(leafletMap && currentStepName === 'autoritje' && offset > 0.1){
    leafletMap.flyTo([51.426437, 5.500482], 13, {duration: 2})
    tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
    showingWandelRoute = false

    // momentarily stop scrolling until zoomed in
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop
    // window.onscroll = function () { window.scrollTo(0, scrollY); };
    setTimeout(() => {  
      // window.onscroll = function () {};
      showingAutoRoute = true
    }, 2000);
  }

</script>

  {#if LeafletMap}
    <div class="backgroundMap">
      <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        <Marker latLng={wandelRoute[0]}/>
        {#if showingWandelRoute}
          <Polyline latLngs={wandelRoute.slice(0, Math.max(0, Math.round(offset*1.2*wandelRoute.length - 5)))} color="#00bcd4" weight='5'/>
        {/if}
        {#if currentStepName === 'ziekenhuis'}
          <Marker latLng={[51.466143, 5.472363]}/>
        {/if}
        {#if showingAutoRoute}
          <Polyline latLngs={autoRoute.slice(0, Math.max(0, Math.round(offset*1.2*autoRoute.length - 50)))} color="#00bcd4" weight='5'/>
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
