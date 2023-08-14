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

  let volume = 0.3


  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  const scenes = [
    {
      name:'gesprek',
      image:'png',
      time:0.2,
      text:'Sem kan niet slapen door de warmte en denkt terug aan een telefoongesprek dat hij die middag even had met oma. Niels probeert Sem in slaap te helpen met natte washandjes. De ventilator zet hij op de hoogste stand. Terwijl hij hiermee bezig is, zegt Sem: “Volgens oma werd het vroeger nooit zo heet.”  <br/> <br/> Niels: “Klopt. Toen ik zo oud was als jij, kwam dit soort hitte nooit voor. Als je mij toen had verteld dat het dagen achter elkaar boven de 40 graden zou kunnen worden, had ik dat nooit geloofd.​”​',
      class: 'scroll-text'
    }
  ]

  let currentScene;
 
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>
  {#if stepName === currentStepName}
    <TextAndImagesScenes {scenes} {stepSize}/>
  {/if}
  
  {#if stepName === currentStepName && $sound}
    <audio src="sounds/fan.mp3" autoplay loop bind:volume/> 
  {/if}




</div>

<style>

</style>


