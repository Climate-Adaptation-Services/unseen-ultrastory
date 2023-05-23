<script>
  // import { LeafletMap, TileLayer } from 'svelte-leafletjs';
  import { afterUpdate, onMount } from 'svelte'
  import { browser } from '$app/environment';

  export let leafletMap;
  export let offset;

  let LeafletMapModule
  let TileLayerModule

  let zoomedIn = false

  onMount(async () => {
		const SL = await import('svelte-leafletjs');
    LeafletMapModule = SL.LeafletMap
    TileLayerModule = SL.TileLayer

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

  $: if(leafletMap && offset > 0.3 && !zoomedIn){
    zoomedIn = true
    leafletMap.flyTo([51.437061, 5.478283], 14, {duration: 6})
  }

  $: if(leafletMap && offset < 0.3 && zoomedIn){
    zoomedIn = false
    leafletMap.flyTo([51.437061, 5.478283], 7, {duration: 6})
  }

</script>

  {#if LeafletMapModule}
    <div class="backgroundMap">
      <svelte:component this={LeafletMapModule} bind:this={leafletMap} options={mapOptions}>
        <svelte:component this={TileLayerModule} url={tileUrl} options={tileLayerOptions}/>
      </svelte:component >

      <!-- <LeafletMapModule bind:this={leafletMap} options={mapOptions}>
        <TileLayerModule url={tileUrl} options={tileLayerOptions}/>
      </LeafletMapModule> -->
    </div>
  {/if}


<style>
div{
  height:100%;
  width:100%;
}

</style>
