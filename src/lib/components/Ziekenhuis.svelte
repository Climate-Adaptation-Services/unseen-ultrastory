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
      text:'Im Krankenhaus arbeitet Leonie so hart sie kann. Eine Kollegin hat sich wegen eines Hitzschlags krankgemeldet. Und in der Notaufnahme herrscht enormer Andrang: Die Hitze verursacht massive Gesundheitsprobleme. Es ist harte Arbeit, und morgen geht es wieder weiter.',
      class: 'scroll-text'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.25,
      text:'Heute war das Wartezimmer voll mit Menschen. Viele ältere Menschen landeten mit Dehydrierungserscheinungen in der Notaufnahme.',
      class: 'scroll-text'
    },
    {
      name:'hardloper1',
      image:'png',
      time:0.5,
      text:'Einige junge Sportler wurden ohnmächtig, als sie trotz Warnungen joggen gingen.',
      class: 'scroll-text'
    },
    {
      name:'boer1',
      image:'png',
      time:0.75,
      text:'Und ein Bauer hatte beim Heumachen einen schweren Sonnenstich bekommen.',
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


