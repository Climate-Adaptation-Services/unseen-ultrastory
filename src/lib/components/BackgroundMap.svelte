<script>
  import { LeafletMap, TileLayer } from 'svelte-leafletjs';
  import { onMount } from 'svelte'
  import { browser } from '$app/environment';

  let leafletMap;

  const mapOptions = {
    center: [52.2, 5.2],
    zoom: 7,
    // zoomSnap: 0.1
    preferCanvas: true,
  };

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: "© OpenStreetMap contributors",
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  onMount(() => {
      leafletMap = leafletMap.getMap()
  })


</script>

<!-- <div class="backgroundMap"> -->
  {#if browser}
    <LeafletMap bind:this={leafletMap} options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions}/>
    </LeafletMap>
  {/if}

<!-- </div> -->

<style>
/* div{
  height:100%;
  width:100%;
} */

</style>
