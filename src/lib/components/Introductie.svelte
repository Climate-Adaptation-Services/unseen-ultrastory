<script>
  import { browser } from "$app/environment";
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate } from "svelte";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_huis')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  const scenes = [
    {
      name:'inbed',
      image:'png',
      time:0.2,
      text:'Het is al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet.<br/><br/> We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is leraar Nederlands en Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis. <br/><br/>Leonie en Niels slapen al nachten slecht omdat hun slaapkamer zo warm is. Leonie denkt aan haar moeder die slecht ter been is en in een appartement woont waar het niet uit te houden is.​'
    },
    {
      name:'sem',
      image:'png',
      time:0.5,
      text:'Sem kan niet slapen en is al dagen moe. De scholen zijn dicht vanwege de exceptionele hitte. Niels is dus ook vrij en kan voor hem zorgen terwijl Leonie de volgende dag weer aan de slag moet op de spoedeisende hulp. '
    }
  ]

  let currentScene;
  afterUpdate(() => {
    if(stepName === currentStepName){
      currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
    }else{
      currentScene = undefined
    }
  })

  


</script>

<div class='stepdiv'>

  {#each scenes as scene,i}
    <div class='scroll-text-block' style='top:{`${(scene['time']+0.1)*stepSize}px`}'>
      <p class='scroll-text'>{@html scene['text']}</p>
    </div>
  {/each}

  {#if offset > 0.35 && offset < 0.5 && currentStepName === stepName}
    <img class='tempmeter' src={'/images/tempmeter.png'} />
    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>
  {/if}


</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


