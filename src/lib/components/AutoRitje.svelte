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

  $: console.log('hi', stepSize)

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
      text:"Ze nemen de auto. Even wat koelte van de airco. Ze hebben allebei zo'n zin om te zwemmen! Maar het zwembad blijkt dicht. Het is voor badpersoneel niet veilig om bij deze temperaturen te werken.",
      class: 'scroll-text'
    },
    {
      name:'nielstel',
      image:'png',
      time:0.27,
      text:"Dan ontvangt hij een appje van Leonie: de hele stad zit zonder stroom. Het ziekenhuis draait op het noodaggregaat. 'Wil je alsjeblieft even langs mijn moeder om te checken hoe het met haar gaat?' Ook dat nog...",
      class: 'scroll-text'
    },
    {
      name:'file',
      image:'png',
      time:0.36,
      text:'Niels en Sem stappen opnieuw de auto in. Het is heel druk op de weg. Veel mensen proberen de stad uit te komen. Niels maakt zich zorgen. Hoe lang gaat deze black-out duren? Het begint aan te voelen als een oorlogssituatie. ​',
      class: 'scroll-text'
    },
    {
      name:'kerk',
      image:'png',
      time:0.45,
      text:'Kerken, sporthallen, supermarkten en buurthuizen worden spontaan als schuilplekken ingericht.​​',
      class: 'scroll-text'
    },
    {
      name:'evacuatie1',
      image:'png',
      time:0.54,
      text:'Bewoners van verpleeg- en verzorgingshuizen worden geëvacueerd. ​',
      class: 'scroll-text'
    },
    {
      name:'pomp',
      image:'png',
      time:0.63,
      text:"Voor tankstations staan enorme rijen auto's. Zat benzine, maar niemand die zijn tank kan volgooien omdat de pinautomaten niet meer werken.",
      class: 'scroll-text'
    },
    {
      name:'manonwel',
      image:'png',
      time:0.72,
      text:"Als Sem een man op straat ziet die een beroerte krijgt, aarzelt Niels geen moment en neemt de man mee naar het ziekenhuis. Sem geeft de man wat water uit zijn bidon. Bij de eerste hulp is ontzettend druk. Gelukkig zien ze al snel Leonie! Zij wikkelt gauw een natte doek om het hoofd van de man. ",
      class: 'scroll-text'
    },
    {
      name:'leonieradeloos',
      image:'png',
      time:0.81,
      text:"Niels legt uit dat ze nog niet bij haar moeder zijn geweest. 'Maar we gaan nu poolshoogte nemen!' Niels en Leonie geven elkaar een haastige kus. 'Kom, Sem, mama moet werken. Wij gaan naar oma toe. <br/><br/> Leonie kijkt om zich heen. Al die mensen die hulp nodig hebben. Ze veegt het zweet van haar voorhoofd. Hoe gaat dit verder?",
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

  {#if $sound && stepName === currentStepName && ((offset > 0.1 && offset < 0.27) || offset > 0.36) && offset < 0.84}
    <audio src="sounds/cardriving.mp3" autoplay loop /> 
  {/if}

  {#if $sound && stepName === currentStepName && (offset > 0.27 || offset > 0.72)}
    <audio src="sounds/gettingoutcar.mp4" autoplay /> 
  {/if}

  {#if $sound && stepName === currentStepName && offset > 0.36 && offset < 0.74}
    <audio src="sounds/trafficjam.mp3" autoplay /> 
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


