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
      text:'In het ziekenhuis werkt Leonie zo hard als ze kan . Een collega heeft zich ziekgemeld vanwege een hitteberoerte. En het is verschrikkelijk druk op de spoedeisende hulp: de hitte veroorzaakt massale gezondheidsproblemen. Het is zwaar werk, en morgen moet ze ook weer.',
      class: 'scroll-text'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.25,
      text:'Vandaag zat de wachtkamer vol met mensen. Er waren veel ouderen die met uitdrogingsverschijnselen op de spoedeisende hulp belandden.',
      class: 'scroll-text'
    },
    {
      name:'hardloper1',
      image:'png',
      time:0.5,
      text:'Een paar jonge sporters werden onwel toen ze ondanks waarschuwingen toch gingen hardlopen.',
      class: 'scroll-text'
    },
    {
      name:'boer1',
      image:'png',
      time:0.75,
      text:'En een boer had tijdens het hooien een zware zonnesteek gekregen.',
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


