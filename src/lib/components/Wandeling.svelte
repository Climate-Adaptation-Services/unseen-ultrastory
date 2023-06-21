<script>
  import { browser } from "$app/environment";

  export let offset;
  export let index;
  export let currentStepName

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_wandeling')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

</script>

<div class='stepdiv'>
  <div class='scroll-text-block' style='top:{`${0*stepSize}px`}'>
    <img class='semslaapt' style='width:250px' src={'/images/semslaapt.jpg'} />
    <p class='scroll-text'>Als Sem eindelijk slaapt, wil Niels niet weer in bed gaan liggen dus besluit een rondje te lopen buiten. ​</p>
  </div>

  <div class='scroll-text-block' style='top:{`${0.15*stepSize}px`}'>
    <img class='nielsgaatwandelen' style='width:300px' src={'/images/nielsgaatwandelen.jpg'} />
    <p class='scroll-text'>Het is buiten nog steeds heel warm. De stenen op straat stralen nog steeds warmte uit. ​​</p>
  </div>

  <div class='scroll-text-block' style='top:{`${0.315*stepSize}px`}'>
    <img class='dommelplantsoen' style='width:300px' src={'/images/dommelplantsoen.jpg'} />
    <p class='scroll-text'>Gelukkig is het in het Dommelplantsoen een stukje koeler. Het is hier wel ontzettend druk.​</p>
  </div>

  <div class='scroll-text-block' style='top:{`${0.49*stepSize}px`}'>
    <img class='festival' style='width:300px' src={'/images/festival.jpg'} />
    <p class='scroll-text'>Ook al is het festival afgelast, wordt er alsnog veel lawaai gemaakt en gedronken. <strong>Ondanks het lawaai slapen sommige mensen buiten.​</strong></p>
  </div>

  <div class='scroll-text-block' style='top:{`${0.68*stepSize}px`}'>
    <img class='politie' style='width:250px' src={'/images/politie.jpg'} />
    <p class='scroll-text'>Er is politie in de buurt om de situatie in de gaten te houden.</p>
  </div>

  <div class='scroll-text-block' style='right:100; top:{`${0.84*stepSize}px`}'>
    <img class='rustigplekje' style='width:250px' src={'/images/rustigplekje.jpg'} />
    <p class='scroll-text'>Hij vindt eindelijk een rustig plekje bij een boom. Terwijl hij terugdenkt aan de vraag over hitte van Sem, mijmert hij over een zorgwekkende vraag: <em>“Hoe heet kan het eigenlijk worden?” ​</em></p>
  </div>


</div>

<style>
  
</style>


