<script>
  import { fadeOut } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { onMount } from "svelte";
	import { sound } from "$lib/stores.js";

  export let offset;
  export let index;
  export let currentStepName;
  export let stepName;

  let stepSize;
  let screenWidth;

  $: console.log(stepSize)

  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  $: if(currentStepName === stepName){
    fadeOut()
  }

</script>

{#if stepName === currentStepName && $sound}
  <audio src="sounds/night.mp3" autoplay loop /> 
{/if}

<div class='stepdiv'>
  
  <div class='scroll-text-block night' style='top:{`${0.125*stepSize}px`}'>
    <img class='nielsgaatwandelen night-image' src={'/images/nielsgaatwandelen.png'} />
    <p class='scroll-text nighttext'>When Tom is finally asleep, Mark decides to go for a stroll. It is still very warm outside. He notices that the tarmac of the street radiates a lot of heat. ​​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound}
    <audio src="sounds/voetstappen.mp3" autoplay loop /> 
  {/if}

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound}
    <audio src="sounds/crowd.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.36*stepSize}px`}'>
    <img class='festival night-image' src={'/images/gasten.png'} />
    <p class='scroll-text nighttext'>Fortunately, the park feels a bit cooler. The festival that had been planned here is cancelled, but it is still very busy in the park. There's a lot of noise and drinking. Despite this, some people sleep outside.​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.4 && offset < 0.85 && $sound}
    <audio src="sounds/drunk.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.63*stepSize}px`}'>
    <img class='politie night-image' src={'/images/politie.png'} />
    <p class='scroll-text nighttext'>There are police around to monitor the situation. The atmosphere becomes unpleasant. Mark quickly walks on.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.65 && offset < 0.85 && $sound}
    <audio src="sounds/politie.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='right:100; top:{`${0.87*stepSize}px`}'>
    <img class='rustigplekje night-image' src={'/images/nielsboom.png'} />
    <p class='scroll-text nighttext'>Further on, Mark finds a quiet spot by a tree. He thinks of his conversation with Tom about the heat and checks the latest news on his phone.    
  </div>
</div>

<style>


  
</style>


