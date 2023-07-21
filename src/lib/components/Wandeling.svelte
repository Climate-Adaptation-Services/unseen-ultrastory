<script>
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { onMount } from "svelte";

  export let offset;
  export let index;
  export let currentStepName;
  export let stepName;

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

</script>

{#if stepName === currentStepName}
  <audio src="sounds/night.mp3" autoplay loop /> 
{/if}

<div class='stepdiv'>
  
  <div class='scroll-text-block night' style='top:{`${0.125*stepSize}px`}'>
    <img class='nielsgaatwandelen' style='width:300px' src={'/images/nielsgaatwandelen.png'} />
    <p class='scroll-text nighttext'>Als Sem eindelijk slaapt, wil Niels graag naar buiten dus besluit een rondje te lopen. Het is buiten nog steeds heel heet. De stenen op straat stralen een gloeiende warmte uit. ​​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6}
    <audio src="sounds/voetstappen.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.315*stepSize}px`}'>
    <img class='dommelplantsoen' style='width:300px' src={'/images/dommelplantsoen.png'} />
    <p class='scroll-text nighttext'>Gelukkig is het in het Dommelplantsoen een stukje koeler. Het is hier wel ontzettend druk.​</p>
  </div>

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5}
    <audio src="sounds/crowd.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.49*stepSize}px`}'>
    <img class='festival' style='width:300px' src={'/images/gasten.png'} />
    <p class='scroll-text nighttext'>Ook al is het festival afgelast, wordt er alsnog veel lawaai gemaakt en gedronken. <strong>Ondanks het lawaai slapen sommige mensen buiten.​</strong></p>
  </div>

  {#if stepName === currentStepName && offset > 0.5 && offset < 0.8}
    <audio src="sounds/drunk.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='top:{`${0.68*stepSize}px`}'>
    <img class='politie' style='width:250px' src={'/images/politie.png'} />
    <p class='scroll-text nighttext'>Er is politie in de buurt om de situatie in de gaten te houden. De sfeer wordt onaangenaam. Niels maakt zich uit de voeten.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.5 && offset < 0.8}
    <audio src="sounds/politie.mp3" autoplay loop /> 
  {/if}

  <div class='scroll-text-block night' style='right:100; top:{`${0.84*stepSize}px`}'>
    <img class='rustigplekje' style='width:250px' src={'/images/nielsboom.png'} />
    <p class='scroll-text nighttext'>Na een poosje vindt Niels een rustige plek bij een boom. Hij moet denken aan het gesprek met Sem en begint te piekeren over de hitte. Hij checkt het laatste nieuws op zijn telefoon.</p>
  </div>
</div>

<style>


  
</style>


