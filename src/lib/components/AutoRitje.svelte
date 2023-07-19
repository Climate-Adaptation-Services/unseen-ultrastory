<script>
  import { browser } from "$app/environment";
  import { showImages } from "$lib/noncomponents/fadeOutIn";
    import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { afterUpdate, onMount } from "svelte";
    import TextAndImagesScenes from "./TextAndImagesScenes.svelte";

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
      name:'weeralarm',
      image:'jpg',
      time:0.1,
      text:'De volgende dag is het opnieuw extreem heet. Het advies is al dagen om binnen te blijven, maar Niels besluit met Sem naar het zwembad te gaan.​',
      class: 'scroll-text'
    },
    {
      name:'ritje',
      image:'jpg',
      time:0.25,
      text:"Ze nemen de auto. Even wat koelte van de airco. Ze hebben allebei zo'n zin om te zwemmen! Maar het zwembad blijkt dicht. Het is voor badpersoneel niet veilig om bij deze temperaturen te werken.",
      class: 'scroll-text'
    },
    {
      name:'smeltend-asfalt',
      image:'jpg',
      time:0.4,
      text:"Dan ontvangt hij een appje van Leonie: de hele stad zit zonder stroom. Het ziekenhuis draait op het noodaggregaat. 'Wil je alsjeblieft even langs mijn moeder om te checken hoe het met haar gaat?' Ook dat nog...",
      class: 'scroll-text'
    },
    {
      name:'koelkerk',
      image:'jpg',
      time:0.55,
      text:'Niels en Sem stappen opnieuw de auto in. Het is heel druk op de weg.  Veel mensen proberen de stad uit te komen. Niels maakt zich zorgen. Hoe lang gaat deze black-out duren? Het begint aan te voelen als een oorlogssituatie. ​',
      class: 'scroll-text'
    },
    {
      name:'koelkerk',
      image:'jpg',
      time:0.7,
      text:'Kerken, sporthallen, supermarkten en buurthuizen worden spontaan als schuilplekken ingericht.​​',
      class: 'scroll-text'
    },
    {
      name:'verneveling',
      image:'jpg',
      time:0.85,
      text:'Bewoners van verpleeg- en verzorgingshuizen worden geëvacueerd. ​',
      class: 'scroll-text'
    },
    {
      name:'verneveling',
      image:'jpg',
      time:0.95,
      text:"Voor tankstations staan  enorme rijen auto's. Zat benzine, maar niemand die zijn tank kan volgooien omdat de pinautomaten niet meer werken.",
      class: 'scroll-text'
    }
  ]

  let currentScene;
  afterUpdate(() => {
    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);
  })

</script>

<div class='stepdiv'>

  <TextAndImagesScenes {scenes} {stepSize} />

</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


