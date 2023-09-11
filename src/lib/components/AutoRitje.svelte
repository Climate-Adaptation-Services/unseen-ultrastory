<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
	import { sound } from "$lib/stores.js";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  let trafficjam = 0.3


  const scenes = [
    {
      name:'weeralarm',
      image:'jpg',
      time:0.09,
      text:'The next day is extremely hot again. The advice for days has been to stay indoors, but Mark has an idea. He decides to go to the pool with Mike.​',
      class: 'scroll-text'
    },
    {
      name:'zwembad',
      image:'png',
      time:0.18,
      text:"They take the car and enjoy the coolness from the air conditioning. They both feel so much like swimming! But the pool turns out to be closed. It is not responsible for pool staff to work in these temperatures.",
      class: 'scroll-text'
    },
    {
      name:'nielstel',
      image:'png',
      time:0.27,
      text:'Then Mark receives a message from Sophie: the whole city is without power. The hospital is running on the emergency generator. "Would you please stop by my mother to check how she’s doing?"',
      class: 'scroll-text'
    },
    {
      name:'file',
      image:'png',
      time:0.36,
      text:'Mark and Mike get into the car again. The road is very busy. Many people are trying to get out of town because of the power cut. Mark is worried. How long will this blackout last?',
      class: 'scroll-text'
    },
    {
      name:'kerk',
      image:'png',
      time:0.45,
      text:'Churches, sports halls, supermarkets and community centres are spontaneously set up as cooling centres.​​​​',
      class: 'scroll-text'
    },
    {
      name:'pomp',
      image:'png',
      time:0.63,
      text:"There are huge queues of cars in front of petrol stations. Plenty of petrol, but no one can fill up their tank because debit card payment is no longer possible.",
      class: 'scroll-text'
    },
    {
      name:'manonwel',
      image:'png',
      time:0.72,
      text:"When Mark sees a man sitting exhausted on the ground, he doesn’t hesitate for a moment. He gets out of the car and walks towards him. The man seems to be suffering from dehydration. Quickly, Mark gives him some water and helps him into the back seat of the car. Together they drive to the hospital. There, they soon see Lisa. ",
      class: 'scroll-text'
    },
    {
      name:'leonieradeloos',
      image:'png',
      time:0.81,
      text:'Mark explains that they haven\'t visited her mother yet. "But we\'re going to check up on her now!" Mark and Lisa give each other a peck. "Come Mike, we\'re going to grandma\'s.<br/><br/> Lisa looks around. All those people needing help. She wipes the sweat from her forehead. How will this end?',
      class: 'scroll-text'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize} imageOffset={0.03}/>

  {#if $sound && stepName === currentStepName && offset < 0.6 && offset < 0.27}
    <audio src="sounds/carstart.mp3" autoplay  /> 
  {/if}

  {#if $sound && stepName === currentStepName && ((offset > 0.05 && offset < 0.27) || offset > 0.36) && offset < 0.84}
    <audio src="sounds/cardriving.mp3" autoplay loop /> 
  {/if}

  {#if $sound && stepName === currentStepName && (offset > 0.27 || offset > 0.72)}
    <audio src="sounds/gettingoutcar.mp4" autoplay /> 
  {/if}

  {#if $sound && stepName === currentStepName && offset > 0.36 && offset < 0.74}
    <audio src="sounds/trafficjam.mp3" autoplay bind:volume={trafficjam}/> 
  {/if}

  {#if $sound && stepName === currentStepName && offset > 0.84}
    <audio src="sounds/ziekenhuis.mp3" autoplay /> 
  {/if}

</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


