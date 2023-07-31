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
    <img class='nielsgaatwandelen' style='width:60%' src={'/images/nielsgaatwandelen.png'} />
    <p class='scroll-text nighttext'>Als Sem eindelijk slaapt, besluit Niels een ommetje te maken. Het is buiten nog steeds heel heet. Hij merkt dat de stenen op straat nog steeds warmte uitstralen. ​​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound}
    <audio src="sounds/voetstappen.mp3" autoplay loop /> 
  {/if}

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound}
    <audio src="sounds/crowd.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.49*stepSize}px`}'>
    <img class='festival' style='width:60%' src={'/images/gasten.png'} />
    <p class='scroll-text nighttext'>Gelukkig voelt het in het Dommelplantsoen een stukje koeler aan.​ Het festival dat oorspronkelijk gepland stond is afgelast, maar het is toch heel druk. Er wordt  veel lawaai gemaakt en gedronken. Ondanks de herrie slapen sommige mensen buiten.​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.5 && offset < 0.8 && $sound}
    <audio src="sounds/drunk.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.68*stepSize}px`}'>
    <img class='politie' style='width:60%' src={'/images/politie.png'} />
    <p class='scroll-text nighttext'>Er is politie in de buurt om de situatie in de gaten te houden. De sfeer wordt onaangenaam. Niels maakt zich uit de voeten.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.5 && offset < 0.8 && $sound}
    <audio src="sounds/politie.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='right:100; top:{`${0.87*stepSize}px`}'>
    <img class='rustigplekje' style='width:60%' src={'/images/nielsboom.png'} />
    <p class='scroll-text nighttext'>Verderop vindt Niels een rustige plek bij een boom. Hij moet denken aan het gesprek met Sem over de hitte en checkt het laatste nieuws op zijn telefoon.  
    </p>
  </div>
</div>

<style>


  
</style>


