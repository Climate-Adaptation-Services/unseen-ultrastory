<script>
  import { afterUpdate, onMount } from 'svelte'
  import { testRoute } from '$lib/noncomponents/routes.js';
  import { select } from 'd3';

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
  let showingRoute = false

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
    
    const huis = L.tooltip(testRoute[0], {direction:'top', offset:[0,-40]})
    huis
      .setContent("Huis van Niels en Leonie")
      .addTo(leafletMap);

    const ziekenhuis = L.tooltip([51.466143, 5.472363], {direction:'top', offset:[0,-40]})
    ziekenhuis
      .setContent("Catharina ziekenhuis")
      .addTo(leafletMap);


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
    leafletMap.flyTo([51.426437, 5.470482], 15, {duration: 1})

    // momentarily stop scrolling until zoomed in
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop
    window.onscroll = function () { window.scrollTo(0, scrollY); };
    setTimeout(() => {  
      showingRoute = true 
      window.onscroll = function () {};
    }, 1);
  }
  $: if(leafletMap && offset < 0.1 && zoomedIn && currentStepName === 'huis'){
    zoomedIn = false
    leafletMap.flyTo([51.437061, 5.478283], 7, {duration: 1})
    showingRoute = false
  }
  $: if(leafletMap && currentStepName === 'ziekenhuis'){
    leafletMap.flyTo([51.466143, 5.472363], 15, {duration: 2})
    tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'
  }
  $: if(leafletMap && currentStepName === 'wandeling'){
    leafletMap.flyTo([51.426437, 5.470482], 16, {duration: 2})
    tileUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }



</script>

  {#if LeafletMap}
    <div class="backgroundMap">
      <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        {#if showingRoute}
          {#if currentStepName === 'huis'}
            <Marker latLng={testRoute[0]}/>
          {:else if currentStepName === 'ziekenhuis'}
            <Marker latLng={[51.466143, 5.472363]}/>
          {:else if currentStepName === 'wandeling'}
            <Marker latLng={testRoute[0]}/>
            <Polyline latLngs={testRoute.slice(0, Math.round(offset*1.2*testRoute.length))} color="#00bcd4" />
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
  }

</style>
