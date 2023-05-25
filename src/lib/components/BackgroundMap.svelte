<script>
  import { onMount } from 'svelte'
  import { testRoute } from '$lib/noncomponents/routes.js';

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

  let zoomedIn = false
  let showingRoute = false

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
  }

  
  const mapOptions = {
    center: [51.437061, 5.478283],
    zoom: 7,
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

    // momentarily stop scrolling until zoomed in
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop
    window.onscroll = function () { window.scrollTo(0, scrollY); };
    setTimeout(() => {  
      showingRoute = true 
      window.onscroll = function () {};
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
          {#if index === 0}
            <Marker latLng={testRoute[0]}>
              <Tooltip>Huis van Leonie en Niels</Tooltip>
            </Marker>
          {:else if index === 1}
            <Marker latLng={testRoute[0]}/>
            <Polyline latLngs={testRoute.slice(0, Math.round(offset*testRoute.length))} color="steelblue" />
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
