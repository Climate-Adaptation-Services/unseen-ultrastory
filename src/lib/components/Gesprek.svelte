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
      text:'Sem kann wegen der Wärme nicht schlafen und denkt an das, was Oma heute Nachmittag am Telefon sagte. Niels versucht, Sem mit nassen Waschlappen beim Einschlafen zu helfen. Den Ventilator stellt er auf die höchste Stufe. Während er damit beschäftigt ist, sagt Sem: "Laut Oma war es früher nie so heiß."   <br/> <br/> Niels: "Stimmt. Als ich so alt war wie du, gab es diese Art von Hitze nie. Wenn mir damals jemand gesagt hätte, dass es tagelang über 40 Grad werden könnte, hätte ich das nie geglaubt."',
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


