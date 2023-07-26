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
      text:'De gebeurtenissen en personages in dit verhaal zijn verzonnen. Toch zou de extreme hitte in dit verhaal werkelijkheid kunnen worden. De laatste jaren zijn er overal in de wereld enorme uitschieters geweest aan extreme hitte, uitschieters die ook klimaatwetenschappers hebben verrast.'
    },
    {
      name:'',
      image:'',
      time:0.25,
      text:'Daarom hebben we dit klimaatverhaal gemaakt: om te bedenken en te verbeelden wat er zou kunnen gebeuren als we te maken krijgen met een hittecrisis die zijn weerga niet kent. Zodat we ons bewust zijn van de gevaren en ons op tijd gaan voorbereiden.'
    },
    {
      name:'',
      image:'',
      time:0.4,
      text:'Dit verhaal is gebaseerd op de laatste wetenschappelijke inzichten over extreme weergebeurtenissen in Nederland en op talloze gesprekken met deskundigen op het gebied van klimaatadaptatie, hitte en crisismanagement.'
    },
    {
      name:'',
      image:'',
      time:0.55,
      text:'Onze dank gaat uit naar: Marije Bakker (NIPV), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Edwin Kok (NIPV), Frank van Lamoen (Provincie Noord-Brabant), Renee Linck (NIPV) en Brian Verhoeven (NIPV)'
    }
  ]

</script>

<div class='stepdiv aftiteling'>
  {#each scenes as scene,i}
    <div class='scroll-text-block outro' style='top:{`${(scene['time']+0.05)*stepSize}px`}'>
      <p class='scroll-text outro-text'>{scene['text']}</p>
    </div>
  {/each}

  <div class='stepdiv aftiteling'>
    <div class = 'leeslijst'>
      <h1>Meer lezen?</h1>
      <ul class="myUL">
        <li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank">Wetenschappelijk Artikel </a> over de toenemende kans op recordbrekende klimaatextremen</li>
        <li>KNMI berichten:</li>
          <ol style="list-style-type: circle;">
            <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank">Ieder jaar een verpletterend hitterecord?</a></li>
            <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank">Absolute temperatuurrecords door Saharahitte</a></li>
            <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank">Toename hittegolven in Europa gelinkt aan veranderende straalstroom</a></li>
          </ol>
        <li><a href="https://www.ad.nl/binnenland/50-graden-in-nederland-moeten-rekening-houden-met-extreme-temperaturen~a9038ba2" target="_blank">50 graden in Nederland? </a></li>
        <li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank">Filmpje: Krijgt Nederland steeds vaker te maken met hittegolven?</a></li>
        <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank">Filmpje: Temperatuur voor het eerst boven de 40 graden</a></li>
        <li>Poster EGU</li>
      </ul> 
    </div>
  </div>
  <img class='einde' src='/images/heatwave1.png' width='100%'/>

</div>

<style>

  .stepdiv{
    height:100%;
  }

  .stepdiv{
    height:100%;
  }
  .leeslijst{
    width:50%;
    left:25%;
    position: relative;
    font-size: 3vh !important;
    top:75%;
  }

  
  ul.myUL {
    display: inline-block;
    text-align: left;
  }

a:link {    /* unvisited link */
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid;
}
a:visited {    /* visited link */
    color: #ffffff;
}
a:hover {    /* mouse over link */
    color: #ffffff;
    border-bottom: none;
}
a:active {    /* active link */
    color: #ffffff;
}
  
</style>


