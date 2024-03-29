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
      title = 'Maximumtemperatuur KNMI-station Eindhoven'
    
    }
     else {
      xAxisScale = 0.4
      yAxisScale = 0.7
      textPadding = 0.15
      title = 'Jaarlijks gemeten maximumtemperatuur op KNMI-station Eindhoven'
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
    <h1 class='scroll-text'>Temperatuurmetingen</h1>
    <p class='scroll-text'> 
      Metingen laten zien dat de jaarlijkse maximumtemperatuur in Eindhoven al behoorlijk is toegenomen. Tot 2019 was een temperatuur van boven de 37 graden nog nooit gemeten.  
    </p>
    <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 60 && currentStepName ==='temperatuurstijging') ? 'visible' : 'hidden'}'>
      <p class='scroll-text'> Maar op 24 juli 2019 werd het 40,4 graden in Eindhoven. Het hitterecord van 2018 werd verpulverd met 3,7 graden!  
      </p> 
    </div>  
    {/if}
  </div>

  <div class='sticky-div'>
    <svg>
      <g class = 'graphsvg' transform="translate({screenWidth * 0.45},{screenHeight * 0})">
      <XAxis {xScale} height={screenHeight * yAxisScale}/>
      <YAxis {yScale} height={screenHeight * yAxisScale}/>
      <text class='axistitle' x={xScale(1988)} y={yScale(26)+2}>Jaar</text>  
      <text class = 'graphtitle' x={xScale(1985)} y={yScale(41)}>{title}</text>
      <text class='axistitle' transform="translate({(xAxisScale * screenWidth * -0.07)-5},{yAxisScale * screenHeight * 0.5} ) rotate(-90)" text-anchor = 'middle'>Maximumtemperatuur (°C)</text>
      {#if ratioOfCsvData > 80 && currentStepName === 'temperatuurstijging'}
        <g transform='translate({xScale(2017)},{yScale(40)})'>
          <text x={-90} y={32} class="recordyear" font-size = "2vh">De eerste keer</text>
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
