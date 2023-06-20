<script>
  import { browser } from "$app/environment";

  export let offset;
  export let index;
  export let currentStepName

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_ziekenhuis')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

</script>

<div class='stepdiv'>
  <div class='scroll-text-block' style='top:{`${0.1*stepSize}px`}'>
    <img class='ziekenhuischaos' width='300px' src={'/images/ziekenhuischaos.png'} />
    <p class='scroll-text'>Leonie voelt zich gefrustreerd. Het was vandaag op de spoedeisende hulp van het Catharina Ziekenhuis heel erg druk vanwege massale gezondheidsproblemen als gevolg van hittestress. Een collega had zich ziekgemeld vanwege een hitteberoerte. En morgen moet ze weer…​</p>
  </div>

  <div class='scroll-text-block' style='top:{`${0.33*stepSize}px`}'>
    <div style='float:left'>
      <img class='luchtweg' src={'/images/luchtweg.jpg'} />
      <p class='scroll-text'>Luchtwegklachten</p>
    </div>
    <div style='float:left; padding-left:30px; '>
      <img class='ouderewater' src={'/images/ouderewater.jpg'} />
      <p class='scroll-text'>Ouderen met vochttekort</p>
    </div>
  </div>

  <div class='scroll-text-block' style='float:left; top:{`${0.5*stepSize}px`}'>
    <div style='float:left'>
      <img class='zonnesteek' src={'/images/zonnesteek.jpg'} />
      <p class='scroll-text'>Verbrande huid/zonnesteek</p>
    </div>
    <div style='float:left; padding-left:30px'>
      <img class='luchtweg' src={'/images/hardloper.jpg'} />
      <p class='scroll-text'>Sporters met hitteberoerte</p>
    </div>
  </div>



</div>

<style>
  
</style>


