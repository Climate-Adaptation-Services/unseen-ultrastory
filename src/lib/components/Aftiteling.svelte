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
      text:'In den letzten Jahren gab es weltweit extreme Hitzeausreißer, die selbst Klimawissenschaftler überrascht haben. Auch in Deutschland könnte es einmal extrem heiß werden.'
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
      text:'Diese Geschichte basiert auf den neuesten wissenschaftlichen Erkenntnissen über außergewöhnliche Wetterereignisse in Deutschland und auf zahlreichen Gesprächen mit Experten auf dem Gebiet der Klimaanpassung, Hitze und Krisenmanagement. Die Bilder wurden mit KI erstellt.'
    },
    {
      name:'',
      image:'',
      time:0.55,
      text:'Selbstverständlich ist nur CAS für das Endergebnis verantwortlich.'
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
    <h3 class = 'leeslijstcat '>Regensburg</h3>
    <ul class="myUL">
      <li><a href="https://www.dwd.de/DE/klimaumwelt/klimaforschung/klimawirk/stadtpl/projekt_waermeinseln/sksm/sksm_node.html" target="_blank">Wetter und Klima - Deutscher Wetterdienst - Wärmeinsel - Stadtklimastationen</a></li>
      <li><a href="https://www.dwd.de/DE/wetter/wetterundklima_vorort/bayern/regensburg/_node.html" target="_blank">Wetter und Klima - Deutscher Wetterdienst - Regensburg (Umlandstation)</a></li>
      <li><a href="https://cdc.dwd.de/portal/shortlink/65e09639-c6ca-4e52-9fca-5066f313998c" target="_blank">DWD Climate Data Center - Regensburg</a></li>
    </ul>

    <h3 class = 'leeslijstcat'>Regional</h3>
    <ul class="myUL">
      <li><a href="https://klimainformationssystem.bayern.de/" target="_blank">BayKIS - Bayerisches Klimainformationssystem</a></li>
      <li><a href="https://www.dwd.de/DE/leistungen/zeitreihen/zeitreihen.html" target="_blank">Wetter und Klima - Deutscher Wetterdienst - Zeitreihen und Trends</a></li>
      <li><a href="https://era-explorer.climate.copernicus.eu/?lat=49.02&lng=12.10&plot=5" target="_blank">ERA Explorer (nur auf Englisch verfügbar)</a></li>
    </ul>

    <h3 class = 'leeslijstcat'>National</h3>
    <ul class="myUL">
      <li><a href="https://www.dwd.de/DE/klimaumwelt/klimaatlas/klimaatlas_node.html" target="_blank">Wetter und Klima - Deutscher Wetterdienst - Deutscher Klimaatlas</a></li>
    </ul>

    <h3 class = 'leeslijstcat'>International</h3>
    <ul class="myUL">
      <li><a href="https://myclimatefuture.info/de" target="_blank">MyClimateFuture - Wie werde ich den Klimawandel erleben?</a></li>
      <li><a href="https://thermaltrace.climate.copernicus.eu/?agg=daily&anomaly=false&date=2025-12-13&heat=true&lat=50.86&lng=4.35&variable=utci_daily_max_cat" target="_blank">Thermal Trace (nur auf Englisch verfügbar)</a></li>
      <li><a href="https://amocscenarios.org/?lat=49&lon=12.25&model=cc_RCP85&is_amoc_on=false&is_delta=false&metric=temp_1_in_10_yr_max" target="_blank">AMOC Scenarios (nur auf Englisch verfügbar)</a></li>
      <li><a href="https://en.vedur.is/media/ads_in_header/AMOC-letter_Final.pdf" target="_blank">AMOC-letter_Final.pdf (nur auf Englisch verfügbar)</a></li>
    </ul>
  </div>

  <div class = 'copyright'>
    <p >© 2026 <a href="http://www.climateadaptationservices.com" target="_blank">Climate Adaptation Services (CAS)</a></p>
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
