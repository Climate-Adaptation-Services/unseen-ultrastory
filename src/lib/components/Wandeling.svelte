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
    <p class='scroll-text nighttext'>Als Sem eindelijk slaapt, besluit Niels een ommetje te maken. Het is buiten nog steeds heel heet. Hij merkt dat de stenen op straat veel warmte uitstralen. ​​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound}
    <audio src="sounds/voetstappen.mp3" autoplay loop /> 
  {/if}

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound}
    <audio src="sounds/crowd.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.36*stepSize}px`}'>
    <img class='festival night-image' src={'/images/gasten.png'} />
    <p class='scroll-text nighttext'>Gelukkig voelt het Dommelplantsoen wat koeler aan.​ Het festival dat hier gepland stond is afgelast, maar toch is het heel druk in het park. Er wordt  veel lawaai gemaakt en gedronken. Ondanks de herrie slapen sommige mensen buiten.​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.4 && offset < 0.85 && $sound}
    <audio src="sounds/drunk.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.63*stepSize}px`}'>
    <img class='politie night-image' src={'/images/politie.png'} />
    <p class='scroll-text nighttext'>Er is politie in de buurt om de situatie in de gaten te houden. De sfeer wordt onaangenaam. Niels loopt snel verder.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.65 && offset < 0.85 && $sound}
    <audio src="sounds/politie.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='right:100; top:{`${0.87*stepSize}px`}'>
    <img class='rustigplekje night-image' src={'/images/nielsboom.png'} />
    <p class='scroll-text nighttext'>Verderop vindt Niels een rustige plek bij een boom. Hij moet denken aan het gesprek met Sem over de hitte en checkt het laatste nieuws op zijn telefoon.  
  </div>
</div>

<style>


  
</style>


