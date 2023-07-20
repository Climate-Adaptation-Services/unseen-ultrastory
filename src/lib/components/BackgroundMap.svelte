<script>
  import { onMount } from 'svelte'
  import { wandelRoute, autoRoute } from '$lib/noncomponents/routes.js';

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

  let zoomedIn = false
  let ziekenhuis;
  let huis;

  $: if(leafletMap){
    leafletMap = leafletMap.getMap()
    
    huis = L.tooltip(wandelRoute[0], {direction:'top', offset:[0,-40]})
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

  const nightTileURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  const dayTileURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'

  const coordsHuis = wandelRoute[0]
  const coordsZiekenhuis = [51.466143, 5.472363]

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  $: if(leafletMap && !['ziekenhuis'].includes(currentStepName)){
    const zoom = (currentStepName === 'autoritje') ? 12 : 16;
    leafletMap.flyTo(coordsHuis, zoom, {duration: 3})
  }

  $: if(leafletMap && ['ziekenhuis'].includes(currentStepName)){
    leafletMap.flyTo(coordsZiekenhuis, 16, {duration: 3})
    
    ziekenhuis
      .setContent("Catharina ziekenhuis")
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
        {#if currentStepName === 'ziekenhuis'}
          <Marker latLng={[51.466143, 5.472363]}/>
        {/if}
        {#if currentStepName === 'autoritje' && offset > 0.1}
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
