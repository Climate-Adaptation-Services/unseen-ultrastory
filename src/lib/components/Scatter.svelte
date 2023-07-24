<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import * as _ from 'lodash'
  import { fade } from 'svelte/transition';
  import { fly } from 'svelte/transition'
  import { onMount } from "svelte";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";

  export let index
  export let maxTempData
  export let offset
  export let currentStepName
  export let stepName;

  let visible = true;

  $: ratioOfCsvData = Math.round((offset * 1.4)*maxTempData.length)

  let stepSize;
  let screenHeight
  let screenWidth

  onMount(() => {
    stepSize = getStepSize(stepName);
    screenHeight = document.documentElement.clientHeight
    screenWidth = document.documentElement.clientWidth
  })

  $: xScale = d3.scaleLinear()
      .domain(d3.extent(maxTempData, function(d) { return +d.year; }))
      .range([ 0,screenWidth * 0.4]);

  $: yScale = d3.scaleLinear()
    .domain([27, d3.max(maxTempData, function(d) { return +d.T; })])
    .range([ screenHeight * 0.7, screenHeight * 0.05 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='divscatter grafiek'>
  <div class='graphtext' style='top:{`${0.25*screenHeight}px`}'>
    {#if (currentStepName === 'temperatuurstijging') || currentStepName === 'ziekenhuis'}
    <p class='scroll-text'> Je ziet dat de jaarlijkse maximum temperatuur in Eindhoven al behoorlijk is toegenomen. Tot 2019 was een temperatuur van boven de 40°C nog nooit gemeten. Maar op 24 juli 2019 werd het 40.4°C in Eindhoven. Het hitterecord uit 2018 werd verpulverd met 3.7°C!
    </p>
    {/if}
  </div>

  <div class='sticky-div'>
    <svg>
      <g transform="translate({screenWidth * 0.45},{screenHeight * 0.05})">
      <XAxis {xScale} height={screenHeight * 0.7}/>
      <YAxis {yScale} height={screenHeight * 0.7}/>
      <text x={xScale(1988)} y={yScale(26)} font-size = "2vh" fill = '#4e4e4e'>Jaar</text>  
      <text x={xScale(1985)} y={yScale(41)} font-size = "2.5vh" text-anchor="middle" fill = '#4e4e4e'>Jaarlijks gemeten maximum temperatuur op KNMI-station Eindhoven</text>
      <text x={xScale(1915)} y={yScale(42.3)}  transform="rotate(-90)" font-size = "2vh" fill = '#4e4e4e'>Maximum temperatuur (°C)</text>
      {#if ratioOfCsvData > 80 && currentStepName === 'temperatuurstijging'}
        <text x={xScale(2010)} y={yScale(39)} class="recordyear" opacity = {1} fill = '#4e4e4e'>De eerste keer</text>
        <text x={xScale(2010)} y={yScale(39)+15} class="recordyear" opacity = {1} fill = '#4e4e4e'>40+ °C in 2019</text>
        <path
          transform="translate( {xScale(2019)-40} {yScale(39)-30} ) rotate(-45)"
          id='arrow-line'
          marker-end='url(#head)'
          stroke-width='1'
          fill='none'
          stroke='darkred'
          d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        />
      {/if}
      {#if currentStepName === 'temperatuurstijging'}
        {#each _.slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle
            cx = {xScale(+d.year)}
            cy = {yScale(+d.T)}
            r = {2}
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
            r = {5}
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
    top:0px;
    width: 100%;
    height: 100vh;
    /* align-self: flex-end; */
    margin: 0 auto;
  }

  svg{
    width:100%;
    height:100%;
    margin-top:0%
  }

  .fade-in {
    animation: fadeIn 2s;
  }

  .fade-in {
    animation: fadeIn 1s;
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
