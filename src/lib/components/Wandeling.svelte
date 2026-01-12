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
    <img class='nielsgaatwandelen night-image' src={'/images/maxgaatwandelen.png'} />
    <p class='scroll-text nighttext'>Als Paul endlich schläft, beschließt Daniel, einen Spaziergang zu machen. Draußen ist es immer noch sehr heiß. Er bemerkt, dass der Asphalt auf der Straße und dem Gehweg viel Wärme abstrahlt.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound}
    <audio src="sounds/voetstappen.mp3" autoplay loop /> 
  {/if}

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound}
    <audio src="sounds/crowd.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.36*stepSize}px`}'>
    <img class='festival night-image' src={'/images/gasten.png'} />
    <p class='scroll-text nighttext'>Glücklicherweise fühlt sich die Grünfläche um das Schloss Pürkelgut etwas kühler an. Das Festival, das hier geplant war, wurde abgesagt, aber trotzdem ist es sehr voll in der Gegend. Es wird viel Lärm gemacht und getrunken. Trotz des Lärms schlafen sogar manche Menschen draußen.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.4 && offset < 0.85 && $sound}
    <audio src="sounds/drunk.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.63*stepSize}px`}'>
    <img class='politie night-image' src={'/images/politie.png'} />
    <p class='scroll-text nighttext'>In der Nähe ist die Polizei, um die Situation im Auge zu behalten. Die Stimmung wird unangenehm. Daniel geht schnell weiter.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.65 && offset < 0.85 && $sound}
    <audio src="sounds/politie.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='right:100; top:{`${0.87*stepSize}px`}'>
    <img class='rustigplekje night-image' src={'/images/maxboom.png'} />
    <p class='scroll-text nighttext'>Etwas abgeschottet findet Daniel einen ruhigen Platz unter einem Baum. Er muss an das Gespräch mit Paul über die Hitze denken und überprüft die neuesten Nachrichten auf seinem Handy.</p>  
  </div>
</div>

<style>


  
</style>


