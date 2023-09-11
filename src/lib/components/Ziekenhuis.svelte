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

  const scenes = [
    {
      name:'ziekenhuischaos2',
      image:'png',
      time:0.01,
      text:"At the hospital, Lisa works as hard as she can. A colleague has called in sick because of heatstroke. The emergency room is terribly busy: the heat is causing massive health problems. It's hard work, and tomorrow she has to do it again.",
      class: 'scroll-text'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.25,
      text:'Today, the waiting room was full of people. Many elderly people who ended up in the emergency room with dehydration symptoms.',
      class: 'scroll-text'
    },
    {
      name:'hardloper1',
      image:'png',
      time:0.5,
      text:'A couple of young athletes became unwell when they went running despite warnings.',
      class: 'scroll-text'
    },
    {
      name:'boer1',
      image:'png',
      time:0.75,
      text:'And a farmer had suffered severe sunstroke while harvesting.',
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


