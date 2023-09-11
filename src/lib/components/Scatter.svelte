<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import * as _ from 'lodash'
  import { onMount } from "svelte";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";

  export let index
  export let maxTempData
  export let offset
  export let currentStepName
  export let stepName;

  let visible = true;

  $: ratioOfCsvData = Math.round((offset * 1.6)*maxTempData.length)

  let stepSize;
  let screenHeight
  let screenWidth

  onMount(() => {
    stepSize = getStepSize(stepName);
    screenHeight = document.documentElement.clientHeight
    screenWidth = document.documentElement.clientWidth
  })

  let xAxisScale
  let yAxisScale
  let textPadding
  let title
  
  $: if(screenWidth < 600){
      xAxisScale = 0.7
      yAxisScale = 0.5
      textPadding = 0.65
      title = 'Maximum temperature KNMI-station Eindhoven'
    
    }
     else {
      xAxisScale = 0.4
      yAxisScale = 0.7
      textPadding = 0.15
      title = 'Yearly recorded maximum temperature at KNMI-station Eindhoven'
    }
      

  $: xScale = d3.scaleLinear()
      .domain(d3.extent(maxTempData, function(d) { return +d.year; }))
      .range([ 0,screenWidth * xAxisScale]);

  $: yScale = d3.scaleLinear()
    .domain([27, d3.max(maxTempData, function(d) { return +d.T; })])
    .range([ screenHeight * yAxisScale, screenHeight * 0.05 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='grafiek'>
  <div class='graphtext' style='top:{`${textPadding*screenHeight}px`}'>
    {#if (currentStepName === 'temperatuurstijging') || currentStepName === 'gesprek'}
    <h1 class='scroll-text'>Temperature measurements</h1>
    <p class='scroll-text'> 
      Measurements show that the annual maximum temperature in Eindhoven has already increased considerably. Until 2019, a temperature above 37 degrees had never been recorded.   
    </p>
    <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 60 && currentStepName ==='temperatuurstijging') ? 'visible' : 'hidden'}'>
      <p class='scroll-text'> But on 24 July 2019, it reached 40.4 degrees Celsius in Eindhoven. The 2018 heat record was smashed by 3.7 degrees!
      </p> 
    </div>  
    {/if}
  </div>

  <div class='sticky-div'>
    <svg>
      <g class = 'graphsvg' transform="translate({screenWidth * 0.45},{screenHeight * 0})">
      <XAxis {xScale} height={screenHeight * yAxisScale}/>
      <YAxis {yScale} height={screenHeight * yAxisScale}/>
      <text class='axistitle' x={xScale(1988)} y={yScale(26)+2}>Year</text>  
      <text class = 'graphtitle' x={xScale(1985)} y={yScale(41)}>{title}</text>
      <text class='axistitle' transform="translate({(xAxisScale * screenWidth * -0.07)-5},{yAxisScale * screenHeight * 0.5} ) rotate(-90)" text-anchor = 'middle'>Maximum temperature (°C)</text>
      {#if ratioOfCsvData > 80 && currentStepName === 'temperatuurstijging'}
        <g transform='translate({xScale(2017)},{yScale(40)})'>
          <text x={-90} y={32} class="recordyear" font-size = "2vh">The first time</text>
          <text x={-90} y={32 + (0.02*innerHeight)} class="recordyear"font-size = "2vh"> 40+ °C in 2019</text>
          <path
            fill='none'
            stroke='darkred'
            d="M0 0 L-15 15 L0 0 L-10 0 L0 0 L0 10"
            stroke-width="2"
          />
        </g>
      {/if}
      {#if currentStepName === 'temperatuurstijging'}
        {#each _.slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle
            cx = {xScale(+d.year)}
            cy = {yScale(+d.T)}
            r = {0.003 * screenHeight}
            fill = {colorScale(+d.T)}
          />
        {/each}
      {/if}
      {#if currentStepName === 'temperatuurstijging'}
        {#each _.slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle
            class= 'fade-in dot'
            cx = {xScale(+d.year)}
            cy = {yScale(+d.T)}
            r = {0.007 * screenHeight}
            fill = {colorScale(+d.T)}
          />
        {/each}
      {/if}
      </g>
    </svg>
  </div>

   
</div>


<style>
  
  svg{
    width:100%;
    height:100%;
    margin-top:0%;
  }

</style>
