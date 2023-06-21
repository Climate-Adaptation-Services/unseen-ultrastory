<script>
  import { browser } from "$app/environment";
  import { afterUpdate, onMount } from "svelte";
  import { select } from "d3";

  export let offset;
  export let index;

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_huis')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  // afterUpdate(() => {
  //   var rect = document.getElementsByClassName('tempmeter')[0].getBoundingClientRect();
  //   select('.temp-text')
  //     .style('top', rect.top + 52 + 'px')
  //     .style('left', rect.left + 67 + 'px')
  // }, [offset])


</script>

<div class='stepdiv'>
  <div class='scroll-text-block block1' style='top:{`${0.2*stepSize}px`}'>
    <p class='scroll-text'>Het is al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet. We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is adviseur duurzaamheid bij de gemeente Eindhoven. Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis.​</p>
  </div>

  <div class='scroll-text-block block2' style='top:{`${0.3*stepSize}px`}'>
    <img width='300px' src={'/images/inbed.png'} />
    <p class='scroll-text'>Leonie en Niels slapen al nachten slecht omdat hun slaapkamer zo warm is.</p>
    <img src={'/images/tempmeter.png'} width='250px'/>
    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>
  </div>

  <div class='scroll-text-block block3' style='top:{`${0.55*stepSize}px`};'>
    <img width='300px' src={'/images/sem.png'} />
    <p class='scroll-text'>Hun 7-jarige zoon Sem kan niet slapen. Hij is huilerig en moe. Hij heeft ‘hittevrij’ van school. Niels heeft vrij genomen van werk om voor hem te zorgen terwijl Leonie de volgende dag weer aan de slag moet op de spoedeisende hulp. ​</p>
  </div>
</div>

<style>

  .stepdiv{
    height:100%;
  }

  .temp-text{
    color:black;
    font-size:35px;
    margin-top:-160px;
    margin-left:-20px;
  }
  
</style>


