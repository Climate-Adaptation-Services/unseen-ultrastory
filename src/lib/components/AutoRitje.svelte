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
      text:'De volgende dag is het opnieuw extreem heet. Het advies is al dagen om binnen te blijven, maar Niels besluit met Sem naar het zwembad te gaan.​',
      class: 'scroll-text'
    },
    {
      name:'zwembad',
      image:'png',
      time:0.18,
      text:"Ze nemen de auto. Even wat koelte van de airco. Ze hebben allebei zo'n zin om te zwemmen! Maar het zwembad blijkt dicht. Het is voor badpersoneel niet verantwoord om bij deze temperaturen te werken.",
      class: 'scroll-text'
    },
    {
      name:'nielstel',
      image:'png',
      time:0.27,
      text:'Dan ontvangt Niels een appje van Leonie: de hele stad zit zonder stroom. Het ziekenhuis draait op het noodaggregaat. “Wil je alsjeblieft even langs mijn moeder om te checken hoe het met haar gaat?”',
      class: 'scroll-text'
    },
    {
      name:'file',
      image:'png',
      time:0.36,
      text:'Niels en Sem stappen opnieuw de auto in. Het is heel druk op de weg. Veel mensen proberen de stad uit te komen. Niels maakt zich zorgen. Hoe lang gaat deze black-out duren?​',
      class: 'scroll-text'
    },
    {
      name:'kerk',
      image:'png',
      time:0.45,
      text:'Kerken, sporthallen, supermarkten en buurthuizen worden spontaan als koele schuilplekken ingericht.​​​​',
      class: 'scroll-text'
    },
    {
      name:'pomp',
      image:'png',
      time:0.63,
      text:"Voor tankstations staan enorme rijen auto's. Zat benzine, maar niemand die zijn tank kan volgooien omdat de pinautomaten niet meer werken.",
      class: 'scroll-text'
    },
    {
      name:'manonwel',
      image:'png',
      time:0.72,
      text:"Als Niels een man uitgeput op de grond ziet zitten, aarzelt hij geen moment. Hij stapt uit de auto en loopt naar de man toe. Hij lijkt last te hebben van uitdroging. Snel geeft Niels hem wat water en helpt de man op de achterbank van de auto. Samen rijden ze naar het ziekenhuis. Daar zien ze al snel Leonie.",
      class: 'scroll-text'
    },
    {
      name:'leonieradeloos',
      image:'png',
      time:0.81,
      text:'Niels legt uit dat ze nog niet bij haar moeder zijn geweest. “Maar we gaan nu poolshoogte nemen!” Niels en Leonie geven elkaar een haastige kus. “Kom Sem, wij gaan naar oma toe.”<br/><br/> Leonie kijkt om zich heen. Al die mensen die hulp nodig hebben. Ze veegt het zweet van haar voorhoofd. Hoe gaat dit verder?',
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


