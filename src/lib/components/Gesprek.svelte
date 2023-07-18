<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/stepFunctions";
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
      name:'gesprek',
      image:'png',
      time:0.2,
      text:'Thuis probeert Niels Leonie te ontlasten door Sem in slaap te helpen met natte washandjes en een ventilator. Terwijl hij hier mee bezig is vraagt Sem: <q>Oma zei een keer dat het vroeger nooit zo heet werd. Klopt dat?</q> <br/> <br/> <q>Ja, dat klopt. Toen ik jouw leeftijd had kwam dit nooit voor. Als je mij toen had verteld dat het dagen achter elkaar meer dan veertig graden zou kunnen worden in Nederland, had ik je niet geloofd.</q>​'
    }
  ]

  let currentScene;
 
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>
  {#if currentStepName === 'gesprek'}
    <TextAndImagesScenes {scenes} {stepSize} />
  {/if}
  
  {#if stepName === currentStepName}
    <audio src="" autoplay loop /> 
  {/if}




</div>

<style>

</style>


