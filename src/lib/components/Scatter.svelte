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
      title = 'Höchsttemperatur DWD-Station Regensburg'
    }
     else {
      xAxisScale = 0.4
      yAxisScale = 0.7
      textPadding = 0.15
      title = 'Jährlich gemessene Höchsttemperatur an der DWD-Station Regensburg'
    }
  
  $: xScale = d3.scaleLinear() 
    .domain(d3.extent(maxTempData, function(d) { return +d.year; }))
    .range([ 0,screenWidth * xAxisScale]);

  $: yScale = d3.scaleLinear()
    .domain([27, 40])
    .range([ screenHeight * yAxisScale, screenHeight * 0.05 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='grafiek'>
  <!-- Text removed for no-text version -->
  <!--
  <div class='graphtext' style='top:{`${textPadding*screenHeight}px`}'>
    {#if (currentStepName === 'temperatuurstijging') || currentStepName === 'gesprek'}
    <h1 class='scroll-text'>Temperaturmessungen</h1>
    <p class='scroll-text'>
      Die Messungen zeigen, dass die jährliche Tageshöchsttemperatur in Regensburg bereits erheblich gestiegen ist und diese hohen Temperaturen mittlerweile deutlich öfter vorkommen. Von 1950 bis 2015 wurde eine Tageshöchsttemperatur von über 37 °C nur zweimal gemessen. <mark style="background: #ffb00050 !important">(1983 und 2003)</mark>
    </p>
    <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 60 && currentStepName ==='temperatuurstijging') ? 'visible' : 'hidden'}'>
      <p class='scroll-text'> Aber am 26. Juli <mark style="background: #ff660050 !important">2019</mark> wurden in Regensburg sogar 38,9 °C erreicht. Die bis dato zweithöchste jemals gemessene Tageshöchsttemperatur.
      Sieben der 10 heißesten Tage, mit Werten von über 37 °C, traten ab 2015 auf. <mark style="background: #ff660050 !important">(2× 2015, 2× 2018, 2× 2019, 1× 2022)</mark>
      </p>
    </div>
    {/if}
  </div>
  -->

  <div class='sticky-div'>
    <svg>
      <g class = 'graphsvg' transform="translate({screenWidth * 0.25},{screenHeight * 0.08})">
      <XAxis {xScale} height={screenHeight * yAxisScale}/>
      <YAxis {yScale} height={screenHeight * yAxisScale}/>
      <text class='axistitle' x={xScale(1988)} y={yScale(26)+2}>Jahr</text>  
      <text class = 'graphtitle' x={xScale(1975)} y={yScale(41)}>{title}</text>
      <text class='axistitle' transform="translate({(xAxisScale * screenWidth * -0.07)-5},{yAxisScale * screenHeight * 0.5} ) rotate(-90)" text-anchor = 'middle'>Höchsttemperatur (°C)</text>
      <!-- Record annotation hidden for Regensburg version
      {#if ratioOfCsvData > 80 && currentStepName === 'temperatuurstijging'}
        <g transform='translate({xScale(2017)},{yScale(40)})'>
          <text x={-90} y={32} class="recordyear" font-size = "2vh">Das erste Mal</text>
          <text x={-90} y={32 + (0.02*innerHeight)} class="recordyear"font-size = "2vh"> 40+ °C in 2019</text>
          <path
            fill='none'
            stroke='darkred'
            d="M0 0 L-15 15 L0 0 L-10 0 L0 0 L0 10"
            stroke-width="2"
          />
        </g>
      {/if}
      -->
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
      <!-- Highlight rings for years mentioned in text: 1983 and 2003 (first mention) -->
      {#if currentStepName === 'temperatuurstijging'}
        {#each _.slice(maxTempData, 0, ratioOfCsvData).filter(d => [1983, 2003].includes(+d.year)) as d}
          <circle
            class='highlight-ring'
            cx = {xScale(+d.year)}
            cy = {yScale(+d.T)}
            r = {0.012 * screenHeight}
            fill = 'none'
            stroke = '#ffb000'
            stroke-width = '3'
          />
        {/each}
      {/if}
      <!-- Highlight rings for years mentioned in second text: 2015, 2018, 2019, 2022 -->
      {#if currentStepName === 'temperatuurstijging' && ratioOfCsvData > 60}
        {#each _.slice(maxTempData, 0, ratioOfCsvData).filter(d => [2015, 2018, 2019, 2022].includes(+d.year)) as d}
          <circle
            class='highlight-ring fade-in'
            cx = {xScale(+d.year)}
            cy = {yScale(+d.T)}
            r = {0.012 * screenHeight}
            fill = 'none'
            stroke = '#ff6600'
            stroke-width = '3'
          />
        {/each}
      {/if}
      </g>
    </svg>
    <!-- Graph description removed for no-text version -->
    <!--
    {#if currentStepName === 'temperatuurstijging'}
      <p class='graph-description'>Dargestellt wurden die jährlichen Tageshöchsttemperaturen der Jahre 1950 bis 2025. Diese Zahlen stammen aus Wetter- und Klimadatensätzen des Deutschen Wetterdienstes (DWD) für die Wetterstation 04104 Regensburg und sind aufbereitet unter <a href="https://www.mtwetter.de/" target="_blank">mtwetter.de</a> zu finden. Die sieben heißesten Tage beziehen sich auf eine Aussage zu den monatlichen Höchstwerten in Regensburg aus dem Klimadashboard Deutschland.
      </p>
    {/if}
    -->
  </div>
</div>


<style>

  svg{
    width:100%;
    height:100%;
    margin-top:0%;
  }

  .graph-description{
    color:#4e4e4e;
    font-size:1.5vh;
    text-align: left;
    bottom: 5%;
    position: absolute;
    left: 50%;
  }

</style>
