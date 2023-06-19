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

  let xScale = d3.scaleLinear()
      .domain(d3.extent(maxTempData, function(d) { return +d.year; }))
      .range([ 30,340 ]);

  let yScale = d3.scaleLinear()
    .domain([25, d3.max(maxTempData, function(d) { return +d.T; })])
    .range([ 270, 20 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='divscatter grafiek'>
  <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
    <p class='scroll-text'> De grafiek aan de rechterkant weergeeft de jaarlijkse maximum temperatuur van 1951 tot en met 2022.  
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
      <g transform="translate(10,0)">
      <XAxis {xScale} /> 
      <YAxis {yScale} />
      <text x={xScale(1985)} y={yScale(23.3)} font-size = "12px">Jaar</text>  
      <text x={xScale(1900)} y={yScale(41.7)}  transform="rotate(-90)" font-size = "12px">Maximum temperatuur (°C)</text>
      {#if ratioOfCsvData > 68 && currentStepName === 'scatter'}
        <text x={xScale(1986)} y={yScale(40)} class="recordyear" opacity = {1}>De eerste keer</text>
        <text x={xScale(1986)} y={yScale(39)} class="recordyear" opacity = {1}>40+ °C in 2019</text>
        <path
          transform="translate(290 10)"
          id='arrow-line'
          marker-end='url(#head)'
          stroke-width='1'
          fill='none' 
          stroke='darkred'  
          d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        />
      {/if}
      {#if currentStepName === 'scatter'}
        {#each slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle 
            cx = {xScale(+d.year)} 
            cy = {yScale(+d.T)} 
            r = {3}
            fill = {colorScale(+d.T)}
          />
        {/each}
      {/if}
      {#if currentStepName === 'scatter'}
        {#each slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle 
            cx = {xScale(+d.year)} 
            cy = {yScale(+d.T)} 
            r = {3}
            fill = {colorScale(+d.T)}
          />
        {/each}
      {/if}
      </g>
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