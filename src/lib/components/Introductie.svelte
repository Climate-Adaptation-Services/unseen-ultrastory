<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
  import { getStepSize } from "$lib/noncomponents/stepFunctions";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  const scenes = [
    {
      name:'inbed',
      image:'png',
      time:0.2,
      text:'Het is al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet. We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is adviseur duurzaamheid bij de gemeente Eindhoven. Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis. <br/><br/>Leonie en Niels slapen al nachten slecht omdat hun slaapkamer zo warm is.​'
    },
    {
      name:'sem',
      image:'png',
      time:0.5,
      text:'Hun 7-jarige zoon Sem kan niet slapen. Hij is huilerig en moe. Hij heeft ‘hittevrij’ van school. Niels heeft vrij genomen van werk om voor hem te zorgen terwijl Leonie de volgende dag weer aan de slag moet op de spoedeisende hulp.'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset)
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize}/>

  {#if offset > 0.35 && offset < 0.5 && currentStepName === stepName}
    <img class='tempmeter' src={'/images/tempmeter.png'} />
    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>
  {/if}


</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


