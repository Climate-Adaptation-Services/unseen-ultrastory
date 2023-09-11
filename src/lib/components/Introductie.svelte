<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { clamp } from "$lib/noncomponents/helperFunctions";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  $: fanvolume = clamp(-4*Math.pow(offset-0.5,2)+0.6, 0, 1)

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  const scenes = [
    {
      name:'bank1',
      image:'png',
      time:0.2,
      text:"It is early July and already three days above 40 degrees Celsius in Eindhoven. The night temperature doesn't drop below 25 degrees either. It is sweltering. <br/><br/> We follow Lisa and Mark and their seven-year-old son Mike. Mark is a teacher Dutch at a secondary school. Lisa works in the emergency room of the Catharina Hospital. <br/><br/>Lisa and Mark lie exhausted on the sofa. They have been sleeping badly for nights because their bedroom is so hot. Mark listens to the hum of the ventilator. Lisa thinks of her mother who has difficulty walking and lives in a poorly maintained and hot apartment.​",
      class: 'scroll-text'
    },
    {
      name:'seminbed1',
      image:'png',
      time:0.5,
      text:'Mike cannot sleep and has been tired for days. The summer school vacation started early because of the enormous heat. A stroke of luck that Mark is a teacher: he can take care of Mike during the day while Lisa works at the hospital.',
      class: 'scroll-text'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset)
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize}/>

  {#if stepName === currentStepName && window.innerWidth > 600}
    <audio id='fansound' autoplay loop src="sounds/fan.mp3" bind:volume={fanvolume}/> 
  {/if}

  {#if offset > 0.3 && offset < 0.5 && currentStepName === stepName}
    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>
    <img class='tempmeter' src={'/images/tempmeter.png'} />
  {/if}

  


</div>

<style>

  .stepdiv{
    height:100%;
  }

  .item .image:after {
  width: calc(100% + 150px);
  height: 100px;
  content: '';
  position: absolute;
  bottom: -125px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: rgba(0,0,0,0.2);
  filter: blur(20px);
}
  
</style>


