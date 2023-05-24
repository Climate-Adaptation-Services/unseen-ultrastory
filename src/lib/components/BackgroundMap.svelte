<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment';

  import { testRoute } from '$lib/noncomponents/routes.js';

  export let leafletMap;
  export let offset;
  export let index

  let LeafletMap;
  let TileLayer;
  let Polyline;

  let zoomedIn = false
  let showingRoute = false

  onMount(async () => {
		const SL = await import('svelte-leafletjs');
    LeafletMap = SL.LeafletMap
    TileLayer = SL.TileLayer
    Polyline = SL.Polyline
	});

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
  }

  const mapOptions = {
    center: [51.437061, 5.478283],
    zoom: 7,
    // zoomSnap: 0.1,
    preferCanvas: true,
    zoomControl: false,
  };

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      // attribution: "© OpenStreetMap contributors",
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  $: if(leafletMap && offset > 0.1 && !zoomedIn){
    zoomedIn = true
    leafletMap.flyTo([51.437061, 5.478283], 15, {duration: 5})

    setTimeout(() => {  
      showingRoute = true 
    }, 5000);

  }

  $: if(leafletMap && offset < 0.1 && zoomedIn && index === 0){
    zoomedIn = false
    leafletMap.flyTo([51.437061, 5.478283], 7, {duration: 5})
    showingRoute = false
  }

</script>

  {#if LeafletMap}
    <div class="backgroundMap">
      <LeafletMap bind:this={leafletMap} options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
        {#if showingRoute}
          <Polyline latLngs={testRoute.slice(0, Math.round((offset)*testRoute.length))} />
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
    z-index: -1000;
  }

</style>
