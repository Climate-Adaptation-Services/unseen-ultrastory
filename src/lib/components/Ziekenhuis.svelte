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


  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  // Text removed for no-text version
  const scenes = [
    {
      name:'ziekenhuischaos2',
      image:'png',
      time:0.01,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.25,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'hardloper1',
      image:'png',
      time:0.5,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'boer1',
      image:'png',
      time:0.75,
      text:'',
      class: 'scroll-text'
    },
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>
  <TextAndImagesScenes {scenes} {stepSize}/>
  
  {#if stepName === currentStepName && $sound}
    <audio src="sounds/ziekenhuis.mp3" autoplay loop /> 
  {/if}




</div>

<style>
  
</style>


