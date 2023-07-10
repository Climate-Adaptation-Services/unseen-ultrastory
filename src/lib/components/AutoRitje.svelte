<script>
  import { browser } from "$app/environment";
  import { showImages } from "$lib/noncomponents/fadeOutIn";
    import { getStepSize } from "$lib/noncomponents/stepFunctions";
  import { afterUpdate, onMount } from "svelte";
    import TextAndImagesScenes from "./TextAndImagesScenes.svelte";

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
      name:'weeralarm',
      image:'jpg',
      time:0.1,
      text:'De volgende dag is het opnieuw extreem heet. Op zijn smartphone stromen de waarschuwingen voorbij om zoveel mogelijk binnen te blijven.​'
    },
    {
      name:'ritje',
      image:'jpg',
      time:0.25,
      text:'Aan het eind van de ochtend besluit Niels toch maar om samen een ritje te maken in de stad. Het binnen zitten met de gordijnen dicht wordt saai en de auto met airco is een stuk minder warm dan thuis.'
    },
    {
      name:'smeltend-asfalt',
      image:'jpg',
      time:0.4,
      text:'Onderweg zien ze smeltend asfalt.​'
    },
    {
      name:'koelkerk',
      image:'jpg',
      time:0.55,
      text:'Een kerk die als koeltecentrum is ingericht​​'
    },
    {
      name:'schaduwdoek',
      image:'jpg',
      time:0.7,
      text:'Straten met schaduwdoeken​​'
    },
    {
      name:'verneveling',
      image:'jpg',
      time:0.85,
      text:'Vernevelingssystemen​'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize} />

</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


