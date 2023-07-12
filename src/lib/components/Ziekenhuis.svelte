<script>
  import { browser } from "$app/environment";
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate } from "svelte";

  export let offset;
  export let index;
  export let currentStepName;
  export let stepName


  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_ziekenhuis')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  const scenes = [
    {
      name:'ziekenhuischaos',
      image:'png',
      time:0.01,
      text:'Leonie heeft het zwaar. Een collega heeft zich ziekgemeld vanwege een hitteberoerte. En morgen moet ze weer. Het zal opnieuw druk worden op de spoedeisende hulp van het Catharina Ziekenhuis vanwege massale gezondheidsproblemen als gevolg van hittestress.'
    },
    {
      name:'hitteproblemen',
      image:'png',
      time:0.3,
      text:'Luchtwegklachten, Verbrande huid/zonnesteek <br/> <br/> Ouderen met vochttekort, Sporters met hitteberoerte'
    },
    {
      name:'gesprek',
      image:'jpg',
      time:0.7,
      text:'Thuis probeert Niels Leonie te ontlasten door Sem in slaap te helpen met natte washandjes en een ventilator. Terwijl hij hier mee bezig is vraagt Sem: <q>Oma zei een keer dat het vroeger nooit zo heet werd. Klopt dat?</q> <br/> <br/> <q>Ja, dat klopt. Toen ik jouw leeftijd had kwam dit nooit voor. Als je mij toen had verteld dat het dagen achter elkaar meer dan veertig graden zou kunnen worden in Nederland, had ik je niet geloofd.</q>​'
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

  {#if stepName === currentStepName}
    <audio src="sounds/ziekenhuis.mp3" autoplay loop /> 
  {/if}




</div>

<style>
  
</style>


