<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'
  import { browser } from "$app/environment";

  export let index
  export let maxTempData
  export let offset

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

<div class='divscatter'>
  
  {#if index > 1}
  <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
    <p class='scroll-text'>Je ziet in de grafiek dat de jaarlijkse maximum temperatuur in Eindhoven al behoorlijk is toegenomen sinds 1951. Tot 2019 was een temperatuur boven de 40 °C nog nooit gemeten. Maar op 24 juli 2019 werd het 40.4 °C in Eindhoven. Het vorige hitterecord werd verpulverd! De reden voor deze extreme temperatuurstijgingen is klimaatverandering. 
    </p>      
  </div>
  {/if}
  
  <div class='sticky-div'>
    <svg >
      <g transform="translate(10,0)">
        <XAxis {xScale} /> 
        <YAxis {yScale} />
        <text x="0" y="4" fill='#404040' font-size = '2vh' transform="rotate(-90,100,100)">Maximum temperatuur (°C)</text>
        {#if ratioOfCsvData > 68 && index === 3}
          <text x={xScale(1988)} y={yScale(40)} class="recordyear" opacity = {1} font-size='2.5vh'>De eerste keer</text>
          <text x={xScale(1988)} y={yScale(39)} class="recordyear" opacity = {1} font-size='2.5vh'>40+ °C in 2019</text>
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
        {#if index === 3}
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
    background-color: #f1f1f1
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
    margin-top: 1000px;
    text-align: left;   
  }

</style>