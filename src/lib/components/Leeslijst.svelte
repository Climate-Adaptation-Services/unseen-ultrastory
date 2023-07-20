<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    let stepRect = document.getElementsByClassName('step_leeslijst')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  })

  const scenes = [
    {
      name:'',
      image:'',
      time:0.2,
      text:'De gebeurtenissen en personages in dit verhaal zijn verzonnen. Toch zou de extreme hitte in dit verhaal werkelijkheid kunnen worden. De laatste jaren zijn er overal in de wereld enorme uitschieters geweest aan extreme hitte, uitschieters die ook klimaatwetenschappers hebben verrast.'
    },
    {
      name:'',
      image:'',
      time:0.4,
      text:'Daarom hebben we dit klimaatverhaal gemaakt: om te bedenken en te verbeelden wat er zou kunnen gebeuren als we te maken krijgen met een hittecrisis die zijn weerga niet kent. Zodat we ons bewust zijn van de gevaren en ons op tijd gaan voorbereiden.'
    },
    {
      name:'',
      image:'',
      time:0.6,
      text:'Dit verhaal is gebaseerd op de laatste wetenschappelijke inzichten over extreme weergebeurtenissen in Nederland en op talloze gesprekken met deskundigen op het gebied van klimaatadaptatie, hitte en crisismanagement.'
    },
    {
      name:'',
      image:'',
      time:0.8,
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

</div>

<style>

  .stepdiv{
    height:100%;
  }
  
</style>


