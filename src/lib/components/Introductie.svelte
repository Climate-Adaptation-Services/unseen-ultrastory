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
      text:'Es ist Anfang Juli und in Regensburg herrschen bereits seit drei Tagen Temperaturen über vierzig Grad. Auch nachts sinkt die Temperatur nicht mehr unter 25 Grad. Alle leiden unter der drückenden Hitze.<br/><br/> Wir begleiten Lisa und Max sowie ihren siebenjährigen Sohn Sem. Max ist Lehrer. Lisa arbeitet in der Notaufnahme des Krankenhauses Barmherzige Brüder. <br/><br/>Lisa und Max liegen erschöpft auf dem Sofa. Sie schlafen seit Nächten schlecht, weil ihr Schlafzimmer so heiß ist. Max lauscht dem Summen des Ventilators. Lisa denkt an ihre Mutter, die schlecht zu Fuß ist und in einer Wohnung ohne Klimaanlage oder Sonnenschutz lebt.​',
      class: 'scroll-text'
    },
    {
      name:'seminbed1',
      image:'png',
      time:0.5,
      text:'Sem kann nicht schlafen und ist seit Tagen müde. Die Schulen sind wegen der extremen Hitze geschlossen. Ein Glück im Unglück, dass Max Lehrer ist: Er kann tagsüber auf Sem aufpassen, während Lisa im Krankenhaus arbeitet.',
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


