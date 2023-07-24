<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";

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
      text:'Leonie heeft het zwaar. Een collega heeft zich ziekgemeld vanwege een hitteberoerte. En morgen moet ze weer. Het zal opnieuw druk worden op de spoedeisende hulp van het Catharina Ziekenhuis vanwege massale gezondheidsproblemen als gevolg van hittestress.',
      class: 'scroll-text'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.25,
      text:'Er zijn veel ouderen die met uitdrogingsverschijnselen op de eerstehulp belandden.',
      class: 'scroll-text'
    },
    {
      name:'hardloper',
      image:'png',
      time:0.5,
      text:'Er waren ook een paar jonge sporters die onwel zijn geworden omdat ze ondanks waarschuwingen toch waren hard gaan lopen.',
      class: 'scroll-text'
    },
    {
      name:'boer',
      image:'png',
      time:0.75,
      text:'En er was een boer die ondanks de hitte aan het werk moest op zijn land en daardoor een zware zonnesteek opliep.',
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
  
  {#if stepName === currentStepName}
    <audio src="sounds/ziekenhuis.mp3" autoplay loop /> 
  {/if}




</div>

<style>
  
</style>


