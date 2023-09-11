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
      text:'Tom can’t sleep because of the heat and thinks about what grandma said when she called this afternoon. Mark tries to help him fall asleep with damp washcloths. He sets the fan to maximum. As he is doing this, Tom says: "According to grandma, it never used to get this hot."   <br/> <br/> Mark: "True. When I was your age, we didn’t get this kind of heat. If you had told me then that it could get above 40 degrees for days in a row, I would never have believed it."​',
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


