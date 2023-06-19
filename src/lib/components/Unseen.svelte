<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'
  import { browser } from "$app/environment";

  export let index
  export let maxTempData
  export let offset
  export let currentStepName

  $: ratioOfCsvData = Math.round((offset * 1.4)*maxTempData.length)

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_scatter')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  $:console.log(stepSize)

  let yScale = d3.scaleLinear()
    .domain([25, d3.max(maxTempData, function(d) { return +d.T; })])
    .range([ 270, 20 ]);

  let xScale = d3.scaleLinear()
    .domain([2017, 2021])
    .range([ 30,340 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='divscatter grafiek'>
  <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
    <p class='scroll-text'> Was de 40.3 graden uit 2019 echt zo onwaarschijnlijk?  
    </p> 
    {#if ratioOfCsvData > 63}
    <div class= 'fade-in'>
      <p class='scroll-text' > Je ziet dat de jaarlijkse maximum temperatuur in Eindhoven al behoorlijk is toegenomen. Tot 2019 was een temperatuur van boven de 40 °C nog nooit gemeten. Maar op 24 juli 2019 werd het 40.4 °C in Eindhoven. Het vorige hitterecord werd verpulverd! De reden voor deze extreme temperatuurstijgingen is klimaatverandering. 
    </p> 
    </div>   
    {/if} 
  </div>
 

  <div class='sticky-div'>
    <svg>
        <XAxis {xScale} />
        <YAxis {yScale} />
        <circle 
            cx = {xScale(2019)} 
            cy = {yScale(40.3)} 
            r = {5}
            fill = 'red'
        />
    </svg>
  </div>
</div>


<style>

.divscatter{
    height:100%;
    position:relative;
  }

  .sticky-div{
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top:100px;
    width: 100%;
    height: 300px;
    /* align-self: flex-end; */
    margin: 0 auto;
  }

  svg{
    width:50%;
    height:100%;
    float:right;
  }

  .graphtext{
    float:left;
    position: sticky;
    position: -webkit-sticky; /* Safari */
    width: 48%;
    /* align-self: flex-end; */
    margin-top: 10px;
    text-align: left;   
  }

  .fade-in {
    animation: fadeIn 2s;
  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

  @-moz-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-o-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-ms-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

</style>