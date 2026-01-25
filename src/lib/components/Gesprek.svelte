<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
	import { sound } from "$lib/stores.js";

  export let offset;
  export let index;
  export let currentStepName;
  export let stepName

  let volume = 0.3


  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  // Text removed for no-text version
  const scenes = [
    {
      name:'gesprek',
      image:'png',
      time:0.2,
      text:'',
      class: 'scroll-text'
    }
  ]

  let currentScene;
 
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>
  {#if stepName === currentStepName}
    <TextAndImagesScenes {scenes} {stepSize}/>
  {/if}
  
  {#if stepName === currentStepName && $sound}
    <audio src="sounds/fan.mp3" autoplay loop bind:volume/> 
  {/if}




</div>

<style>

</style>


