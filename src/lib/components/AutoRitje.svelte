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
      text:'Am nächsten Tag ist es wieder extrem heiß. Der Rat lautet seit Tagen, drinnen zu bleiben, aber Niels hat eine Idee. Er beschließt, mit Sem ins Schwimmbad zu gehen.',
      class: 'scroll-text'
    },
    {
      name:'zwembad',
      image:'png',
      time:0.18,
      text:"Sie nehmen das Auto. Kurz etwas Kühlung von der Klimaanlage genießen. Sie freuen sich beide so aufs Schwimmen! Aber das Schwimmbad ist geschlossen. Es ist für das Badpersonal nicht vertretbar, bei diesen Temperaturen zu arbeiten.",
      class: 'scroll-text'
    },
    {
      name:'nielstel',
      image:'png',
      time:0.27,
      text:'Dann erhält Niels eine Nachricht von Leonie: Die ganze Stadt ist ohne Strom. Das Krankenhaus läuft auf Notstromaggregat. "Kannst du bitte bei meiner Mutter vorbeischauen, um zu sehen, wie es ihr geht?"',
      class: 'scroll-text'
    },
    {
      name:'file',
      image:'png',
      time:0.36,
      text:'Niels und Sem steigen wieder ins Auto. Auf den Straßen ist sehr viel los. Viele Menschen versuchen, wegen des Stromausfalls aus der Stadt zu kommen. Niels macht sich Sorgen. Wie lange wird dieser Blackout dauern?',
      class: 'scroll-text'
    },
    {
      name:'kerk',
      image:'png',
      time:0.45,
      text:'Kirchen, Sporthallen, Supermärkte und Gemeindezentren werden spontan als kühle Zufluchtsorte eingerichtet.',
      class: 'scroll-text'
    },
    {
      name:'pomp',
      image:'png',
      time:0.63,
      text:"Vor den Tankstellen stehen riesige Autoschlangen. Genug Benzin vorhanden, aber niemand kann tanken, weil die Kartenlesegeräte nicht mehr funktionieren.",
      class: 'scroll-text'
    },
    {
      name:'manonwel',
      image:'png',
      time:0.72,
      text:"Als Niels einen erschöpften Mann am Boden sitzen sieht, zögert er keinen Moment. Er steigt aus dem Auto und geht zu ihm. Der Mann scheint an Dehydrierung zu leiden. Schnell gibt Niels ihm etwas Wasser und hilft ihm auf den Rücksitz des Autos. Zusammen fahren sie zum Krankenhaus. Dort sehen sie bald Leonie.",
      class: 'scroll-text'
    },
    {
      name:'leonieradeloos',
      image:'png',
      time:0.81,
      text:'Niels erklärt, dass sie noch nicht bei ihrer Mutter waren. "Aber wir schauen jetzt nach ihr!" Niels und Leonie geben sich einen hastigen Kuss. "Komm Sem, wir fahren zu Oma."<br/><br/> Leonie schaut sich um. All diese Menschen, die Hilfe brauchen. Sie wischt sich den Schweiß von der Stirn. Wie soll das weitergehen?',
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


