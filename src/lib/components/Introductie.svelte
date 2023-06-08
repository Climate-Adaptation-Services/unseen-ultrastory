<script>
  import { browser } from "$app/environment";

  export let offset;
  export let index;

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_huis')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

</script>

<div class='step'>
  <div class='scroll-text-block' style='top:{`${0.2*stepSize}px`}'>
    <p class='scroll-text'>"Het is al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet. We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is adviseur duurzaamheid bij de gemeente Eindhoven. Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis.​"</p>
  </div>

  <div class='scroll-text-block' style='right: 0px; top:{`${0.24*stepSize}px`}'>
    <p class='scroll-text'>Leonie en Niels slapen al nachten slecht omdat hun slaapkamer zo warm is.</p>
    <img src={'/images/inbed.jpg'} />
  </div>

  <div class='scroll-text-block' style='left: 10%; top:{`${0.29*stepSize}px`}; width:30%'>
    <img src={'/images/tempmeter.png'} />
    <p class='temp-text'>{Math.min(30.5, Math.round(offset*1000)/10)}</p>
  </div>
</div>

<style>
  .temp-text{
    position:absolute;
    color:black;
    top:73px;
    left:41.5%;
    font-size:30px;
  }
</style>


