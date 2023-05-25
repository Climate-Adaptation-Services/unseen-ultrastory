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
    <p class='scroll-text' text={"Het is al drie dagen boven de 40°C in Eindhoven. De nachttemperatuur zakt ook niet meer onder de 25°C. Iedereen heeft het snikheet. We volgen het stel Leonie en Niels en hun zevenjarige zoon Sem. Niels is adviseur duurzaamheid bij de gemeente Eindhoven. Leonie werkt op de spoedeisende hulp van het Catharina Ziekenhuis.​"} />
  </div>

  <div class='scroll-text-block' style='top:{`${0.2*stepSize}px`}'>
    <p class='scroll-text' text={"Leonie en Niels slapen al nachten slecht omdat hun slaapkamer zo warm is. ​"} />
    <img source={'/images/inbed.jpg'} />
  </div>
</div>

<style>
</style>


