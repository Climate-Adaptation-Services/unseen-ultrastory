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
      text:'Leonie heeft het zwaar. Een collega heeft zich ziekgemeld vanwege een hitteberoerte. En morgen moet ze weer. Het zal opnieuw druk worden op de spoedeisende hulp van het Catharina Ziekenhuis vanwege massale gezondheidsproblemen als gevolg van hittestress.'
    },
    {
      name:'oudevrouwziekenhuis',
      image:'png',
      time:0.2,
      text:'Er waren veel ouderen die met uitdrogingsverschijnselen op de eerstehulp belandden.'
    },
    {
      name:'hardloper',
      image:'png',
      time:0.4,
      text:'en waren er een paar sporters die onwel zijn geworden omdat ze ondanks waarschuwingen toch waren hard gaan lopen'
    },
    {
      name:'ziekenhuischaos',
      image:'png',
      time:0.6,
      text:'er was een boer die ondanks de hitte aan het werk moest op zijn land en daardoor een zware zonnesteek opliep'
    },
    {
      name:'gesprek',
      image:'jpg',
      time:0.8,
      text:'Thuis probeert Niels Leonie te ontlasten door Sem in slaap te helpen met natte washandjes en een ventilator. Terwijl hij hier mee bezig is vraagt Sem: <q>Oma zei een keer dat het vroeger nooit zo heet werd. Klopt dat?</q> <br/> <br/> <q>Ja, dat klopt. Toen ik jouw leeftijd had kwam dit nooit voor. Als je mij toen had verteld dat het dagen achter elkaar meer dan veertig graden zou kunnen worden in Nederland, had ik je niet geloofd.</q>​'
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


