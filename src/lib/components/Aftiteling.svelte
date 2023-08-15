<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    let stepRect = document.getElementsByClassName('step_aftiteling')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  })

  const scenes = [
    {
      name:'',
      image:'',
      time:0.1,
      text:'De laatste jaren zijn er overal in de wereld enorme uitschieters geweest van extreme hitte, uitschieters die ook klimaatwetenschappers hebben verrast. Ook Nederland krijgt hier mogelijk mee te maken.'
    },
    {
      name:'',
      image:'',
      time:0.27,
      text:'Daarom hebben we dit klimaatverhaal gemaakt. We willen vertellen en verbeelden wat er kan gebeuren als we te maken krijgen met een hittecrisis die zijn weerga niet kent. Zodat iedereen zichs bewust wordt van de gevaren en we ons op tijd gaan voorbereiden.'
    },
    {
      name:'',
      image:'',
      time:0.44,
      text:'Dit verhaal is gebaseerd op de laatste wetenschappelijke inzichten over exceptionele weergebeurtenissen in Nederland en op talloze gesprekken met deskundigen op het gebied van klimaatadaptatie, hitte en crisismanagement. De beelden zijn gemaakt met AI.'
    },
    {
      name:'',
      image:'',
      time:0.61,
      text:'Onze dank gaat uit naar Marije Bakker (NIPV), Annelies Balkema (Waterschap De Dommel), Janette Bessembinder (KNMI), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Madeleen Helmer (Klimaatverbond Nederland), Edwin Kok (NIPV), Frank van Lamoen (Provincie Noord-Brabant), Renee Linck (NIPV), Karla Niggebrugge (Provincie Brabant), Brian Verhoeven (NIPV) en Karin van der Wiel (KNMI). '
    }
  ]

</script>

<div class = 'aftitelingdiv'>
  <img class='imgaftiteling' src='/images/heatwave1.png' width='100%'/>
  
  {#each scenes as scene,i}
    <div class='scroll-text-block outro' style='top:{`${(scene['time']+0.05)*stepSize}px`}'>
      <p class='scroll-text outro-text'>{scene['text']}</p>
    </div>
  {/each}

  
  <div class = 'leeslijst'>
    <h1>Meer lezen?</h1>
    <h3 class = 'leeslijstcat '>Wetenschappelijke publicaties</h3>
    <ul class="myUL">
      <li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank">Artikel in Nature:</a> ‘Toenemende kans op recordbrekende klimaatextremen’
      </li>
      <li><a href="https://www.worldweatherattribution.org/reporting-extreme-weather-and-climate-change-a-guide-for-journalists/" target="_blank">Wetenschappelijke studie:</a> ‘Extreme hitte in Noord-Amerika, Europa en China in juli 2023 veel waarschijnlijker door klimaatverandering’ 
      </li>
      <li><a href="/PosterEGU.pdf" target="_blank">Poster over gevolgen van exceptionele hitte</a>  
      </li>
    </ul>
    
    <h3 class = 'leeslijstcat'>KNMI berichten</h3>
    <ul class="myUL">  
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank">Ieder jaar een verpletterend hitterecord?</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank">Absolute temperatuurrecords door Saharahitte</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank">Toename hittegolven in Europa gelinkt aan veranderende straalstroom</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering" target="_blank">Extreme hitte in april in Middellandse Zeegebied waarschijnlijker door klimaatverandering</a></li>
    </ul>
    
    <h3 class = 'leeslijstcat'>Video's en webinars</h3>
    <ul class="myUL">
      <li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank">Mini-college van Universiteit van Nederland: Krijgt Nederland steeds vaker te maken met hittegolven?</a></li>
      <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank">KNMI filmpje: Temperatuur voor het eerst boven de 40 graden</a></li>
      <li><a href="https://klimaatverbond.nl/actueel/terugblik-op-het-webinar-de-hittelessen-van-portland-en-het-code-rood-scenario-in-nederland/" target="_blank">Webinar van het Klimaatverbond Nederland over de (hitte)lessen van Portland en het Code Rood-scenario in Nederland</a></li>
    </ul>    
  </div>

  <div class = 'copyright'>
    <p >© 2023 Climate Adaptation Services (CAS).</p>
  </div>
</div>

<style>

  .aftitelingdiv{
    height:100%;
  }

  .leeslijstcat{
    text-align: left;
    font-size: 2.5vh;
  }

  .copyright{
    font-size: 2.5vh !important;
    bottom:10px; 
    position:absolute;
    left:20%;
    width:60%;
    padding:20px;
    color: white !important;
  }

  .leeslijst{
    font-size: 2.5vh !important;
    bottom:100px; 
    position:absolute;
    left:20%;
    width:60%;
    padding:20px;
    background-color: rgba(81, 71, 71, 0);
    color: white !important;
  }

  .imgaftiteling{
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0px;
    max-width: 100%;
    max-height: 100%;
  }
  
  ul.myUL {
    text-align: left;
  }

  a:link {    /* unvisited link */
    color: #ffffff;
    text-decoration: none;
    border-bottom: 1px solid;
  }
  a:visited {    /* visited link */
      color: white;
  }
  a:hover {    /* mouse over link */
      color: #ffffff;
      border-bottom: none;
  }
  a:active {    /* active link */
      color: #ffffff;
  }

  @media only screen and (max-width: 600px) and (orientation:portrait){
  
  /* .imgaftiteling{
    height:100%;
    object-fit: cover;
    visibility:hidden;
  } */

  /* .aftitelingdiv{
    background-image: url('$lib/heatwave.png');
    background-repeat: no-repeat;
  } */

  /* .imgaftiteling{
    height:100%;
    object-fit: cover;
    visibility:visible;
  }

  .leeslijst{
    width:90%;
    left:2%;
    padding:0;
    
  } */


}
    
</style>


