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
      text:'In den letzten Jahren gab es weltweit extreme Hitzeausreißer, die selbst Klimawissenschaftler überrascht haben. Auch in den Niederlanden könnte es einmal extrem heiß werden.'
    },
    {
      name:'',
      image:'',
      time:0.25,
      text:'Deshalb haben wir mit der <a style= "color:white" href="https://www.climateadaptationservices.com" target="_blank">Stiftung CAS</a> diese Klimageschichte erstellt. Wir wollen erzählen und veranschaulichen, was passieren kann, wenn wir mit einer beispiellosen Hitzekrise konfrontiert werden. Damit sich jeder der Gefahren bewusst wird und wir uns rechtzeitig vorbereiten können. Durch den Dialog miteinander können wir auch beginnen, über Handlungsmöglichkeiten nachzudenken.'
    },
    {
      name:'',
      image:'',
      time:0.4,
      text:'Diese Geschichte basiert auf den neuesten wissenschaftlichen Erkenntnissen über außergewöhnliche Wetterereignisse in den Niederlanden und auf zahlreichen Gesprächen mit Experten auf dem Gebiet der Klimaanpassung, Hitze und Krisenmanagement. Die Bilder wurden mit KI erstellt.'
    },
    {
      name:'',
      image:'',
      time:0.55,
      text:'Unser Dank gilt Marije Bakker (NIPV), Annelies Balkema (Waterschap De Dommel), Janette Bessembinder (KNMI), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Madeleen Helmer (Klimaatverbond Nederland), Frank van Lamoen (Provinz Noord-Brabant), Renee Linck (NIPV), Karla Niggebrugge (Provinz Brabant) und Karin van der Wiel (KNMI). Selbstverständlich ist nur CAS für das Endergebnis verantwortlich.'
    }
  ]

</script>

<div class = 'aftitelingdiv'>
  <img class='imgaftiteling' src='/images/heatwave1.png' width='100%'/>
  
  {#each scenes as scene,i}
    <div class='scroll-text-block outro' style='top:{`${(scene['time']+0.05)*stepSize}px`}'>
      <p class='scroll-text outro-text'>{@html scene['text']}</p>
    </div>
  {/each}

  
  <div class = 'leeslijst'>
    <h1>Weiterlesen?</h1>
    <h3 class = 'leeslijstcat '>Wissenschaftliche Publikationen</h3>
    <ul class="myUL">
      <li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank">Artikel in Nature:</a> 'Zunehmende Wahrscheinlichkeit von rekordbrechenden Klimaextremen'
      </li>
      <li><a href="https://mcusercontent.com/854a9a3e09405d4ab19a4a9d5/files/95512c98-67bc-9849-c006-5fe389b776ed/WWA_scientific_report_Northern_Hemisphere_heat.pdf" target="_blank">Wissenschaftliche Studie:</a> 'Extreme Hitze in Nordamerika, Europa und China im Juli 2023 durch Klimawandel viel wahrscheinlicher' 
      </li>
      <li><a href="/PosterEGU.pdf" target="_blank">Poster über die Folgen extremer Hitze</a>  
      </li>
    </ul>
    
    <h3 class = 'leeslijstcat'>KNMI-Meldungen</h3>
    <ul class="myUL">  
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank">Jedes Jahr ein vernichtender Hitzerekord?</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank">Absolute Temperaturrekorde durch Sahara-Hitze</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank">Zunahme von Hitzewellen in Europa mit verändertem Jetstream verbunden</a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering" target="_blank">Extreme Hitze im April im Mittelmeerraum durch Klimawandel wahrscheinlicher</a></li>
    </ul>
    
    <h3 class = 'leeslijstcat'>Videos und Webinare</h3>
    <ul class="myUL">
      <li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank">Mini-Vorlesung der Universität der Niederlande: Werden die Niederlande immer häufiger mit Hitzewellen konfrontiert?</a></li>
      <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank">KNMI-Video: Temperatur zum ersten Mal über 40 Grad</a></li>
      <li><a href="https://klimaatverbond.nl/actueel/terugblik-op-het-webinar-de-hittelessen-van-portland-en-het-code-rood-scenario-in-nederland/" target="_blank">Webinar des Klimaatverbond Nederland über die (Hitze-)Lektionen von Portland und das Code-Rot-Szenario in den Niederlanden</a></li>
    </ul>  
    
    <h3 class = 'leeslijstcat'>Fiktion</h3>
    <ul class="myUL">
      <li><a href="https://www.npo3.nl/hitte/POMS_S_EO_16238783" target="_blank">Katastrophenserie Hitze</a></li>
    </ul> 
  </div>

  <div class = 'copyright'>
    <p >© 2023 <a href="http://www.climateadaptationservices.com" target="_blank">Climate Adaptation Services (CAS)</a></p>
  </div>
</div>

<style>

  .aftitelingdiv{
    height:100%;
  }

  .leeslijstcat{
    text-align: left;
    font-size: 2.3vh;
  }

  .copyright{
    font-size: 2.3vh !important;
    bottom:10px; 
    position:absolute;
    left:20%;
    width:60%;
    padding:20px;
    color: white !important;
  }

  .leeslijst{
    font-size: 2.3vh !important;
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

  .imgaftiteling{
    height:100%;
    object-fit: cover;
    visibility:visible;
  }

  .leeslijst{
    width:90%;
    left:2%;
    padding:0;
    
  }


}

    
</style>


