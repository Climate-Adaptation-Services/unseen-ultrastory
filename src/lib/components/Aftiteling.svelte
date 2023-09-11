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
      text:'Recent years have seen record-breaking extreme heat all over the world, outliers that have even surprised climate scientists. In the Netherlands, too, it could get extremely hot one day.'
    },
    {
      name:'',
      image:'',
      time:0.25,
      text:'That is why <a style= "color:white" href="https://www.climateadaptationservices.com/en/" target="_blank">Stichting CAS</a> made this climate story. We want to depict what could happen if we face an unprecedented heat crisis, so that everyone becomes aware of the dangers and we start preparing in time. By starting the conversation with each other, we can also start thinking about courses of action.'
    },
    {
      name:'',
      image:'',
      time:0.4,
      text:'This story is based on the latest scientific insights on exceptional weather events in the Netherlands and numerous interviews with experts in climate adaptation, heat, and crisis management. The images were created with AI. '
    },
    {
      name:'',
      image:'',
      time:0.55,
      text:'Our thanks go to Marije Bakker (NIPV), Annelies Balkema (Waterboard De Dommel), Janette Bessembinder (KNMI), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Madeleen Helmer (Klimaatverbond Nederland), Frank van Lamoen (Provincie Noord-Brabant), Renee Linck (NIPV), Karla Niggebrugge (Provincie Brabant), Vikkie Thompson (KNMI), and Karin van der Wiel (KNMI). Of course, CAS alone is responsible for the final result.'
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
    <h1>Further reading</h1>
    <h3 class = 'leeslijstcat '>Scientific publications </h3>
    <ul class="myUL">
      <li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank">Article in Nature:</a> ‘Increasing probability of record-shattering climate extremes’
      </li>
      <li><a href="https://mcusercontent.com/854a9a3e09405d4ab19a4a9d5/files/95512c98-67bc-9849-c006-5fe389b776ed/WWA_scientific_report_Northern_Hemisphere_heat.pdf" target="_blank">Scientific study:</a> ‘Extreme heat in North America, Europe and China in July 2023 made much more likely by climate change’ 
      </li>
      <li><a href="/PosterEGU.pdf" target="_blank">Poster about the impacts of extreme heat</a>  
      </li>
    </ul>
    
    <h3 class = 'leeslijstcat'>KNMI articles [in Dutch] </h3>
    <ul class="myUL">  
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank">A crushing heat record every year? </a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank">Absolute temperature records due to Sahara heat </a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank">Increase in heat waves in Europe linked to changing jet stream </a></li>
      <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering" target="_blank">Extreme April heat in Mediterranean more likely due to climate change </a></li>
    </ul>
    
    <h3 class = 'leeslijstcat'>Videos and webinars</h3>
    <ul class="myUL">
      <li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank">Universiteit van Nederland mini lecture: Is the Netherlands experiencing more and more heat waves? </a> [in Dutch]</li> 
      <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank">KNMI video: Temperature above 40 degrees for the first time</a> [in Dutch]</li>
      <li><a href="https://www.youtube.com/watch?v=SiZCZG7sPoQ&t=3s" target="_blank">Klimaatverbond Nederland webinar on Portland's (heat) lessons and the Code Red scenario in the Netherlands </a></li>
    </ul>  
    
    <h3 class = 'leeslijstcat'>Fiction [in Dutch]</h3>
    <ul class="myUL">
      <li><a href="https://www.npo3.nl/hitte/POMS_S_EO_16238783" target="_blank"> Disaster series Heat </a></li>
    </ul> 
  </div>

  <div class = 'copyright'>
    <p >© 2023 <a href="http://www.climateadaptationservices.com/en/" target="_blank">Climate Adaptation Services (CAS)</a></p>
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


