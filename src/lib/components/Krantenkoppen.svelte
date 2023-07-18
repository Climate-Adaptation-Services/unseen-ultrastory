<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
  import { getStepSize } from "$lib/noncomponents/stepFunctions";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

  const scenes = [
    {
      name:'bank1',
      image:'png',
      time:0.1,
      text:"Vooral 's nachts is het raak: afgelopen nacht opnieuw tenminste tien hittedoden in Eindhoven.​",
      class:'scroll-text nighttext krant'
    },
    {
      name:'seminbed',
      image:'png',
      time:0.4,
      text:'Efteling sluit deuren: hitte zorgt voor personeelstekort',
      class: 'scroll-text nighttext krant'
    },
    {
      name:'seminbed',
      image:'png',
      time:0.7,
      text:'Temperatuur drinkwater dreigt boven het wettelijk maximum van 25 &degC te komen',
      class: 'scroll-text nighttext krant'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset)
  })

</script>

<div class='stepdiv'>
  <TextAndImagesScenes {scenes} {stepSize}/>
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


