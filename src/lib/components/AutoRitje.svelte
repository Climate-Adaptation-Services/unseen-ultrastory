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


  // Text removed for no-text version
  const scenes = [
    {
      name:'weeralarm',
      image:'jpg',
      time:0.09,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'zwembad',
      image:'png',
      time:0.18,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'nielstel',
      image:'png',
      time:0.27,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'file',
      image:'png',
      time:0.36,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'kerk',
      image:'png',
      time:0.45,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'pomp',
      image:'png',
      time:0.63,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'manonwel',
      image:'png',
      time:0.72,
      text:'',
      class: 'scroll-text'
    },
    {
      name:'leonieradeloos',
      image:'png',
      time:0.81,
      text:'',
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


