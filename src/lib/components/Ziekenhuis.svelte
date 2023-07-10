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
      name:'ziekenhuischaos',
      image:'png',
      time:0.01,
      text:'Leonie voelt zich gefrustreerd. Het was vandaag op de spoedeisende hulp van het Catharina Ziekenhuis heel erg druk vanwege massale gezondheidsproblemen als gevolg van hittestress. Een collega had zich ziekgemeld vanwege een hitteberoerte. En morgen moet ze weer…'
    },
    {
      name:'hitteproblemen',
      image:'png',
      time:0.3,
      text:'Luchtwegklachten, Verbrande huid/zonnesteek <br/> <br/> Ouderen met vochttekort, Sporters met hitteberoerte'
    },
    {
      name:'gesprek',
      image:'jpg',
      time:0.7,
      text:'Thuis probeert Niels Leonie te ontlasten door Sem in slaap te helpen met natte washandjes en een ventilator. Terwijl hij hier mee bezig is vraagt Sem: “ik hoorde op school dat het vroeger nooit zo heet werd. Klopt dat? <br/> <br/> Ja, dat klopt. Toen ik jouw leeftijd had kwam dit nooit voor. Als je mij toen had verteld dat het zó heet zou kunnen worden in Nederland, had ik je voor gek verklaard.​'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>
  <TextAndImagesScenes {scenes} {stepSize} />
  
  {#if stepName === currentStepName}
    <audio src="sounds/ziekenhuis.mp3" autoplay loop /> 
  {/if}




</div>

<style>
  
</style>


