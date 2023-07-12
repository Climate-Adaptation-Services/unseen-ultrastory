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
      time:0.2,
      text:'Het is begin juli en al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet.<br/><br/> We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is leraar Nederlands. Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis. <br/><br/>Leonie en Niels liggen uitgeput op de bank. Ze slapen al nachten slecht omdat hun slaapkamer zo warm is. Niels luistert naar het gezoem van de ventilator. Leonie denkt aan haar moeder die slecht ter been is in een appartement woont waar het niet uit te houden is.​'
    },
    {
      name:'sem',
      image:'png',
      time:0.5,
      text:'Sem kan niet slapen en is al dagen moe. De scholen zijn dicht vanwege de exceptionele hitte. Het is een geluk bij een ongeluk dat Niels leraar is: hij kan overdag voor Sem zorgen terwijl Leonie aan de slag moet op de spoedeisende hulp.  '
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset)
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize}/>

  {#if offset > 0.3 && offset < 0.5 && currentStepName === stepName}
    <img class='tempmeter' src={'/images/tempmeter.png'} />
    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>
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


