<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'

  export let index
  export let maxTempData
  export let offset

  $: ratioOfCsvData = Math.round((offset * 1.4)*maxTempData.length)

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
  <div class='sticky-div'>
    <svg>
      <XAxis {xScale} /> 
      <YAxis {yScale} />
      {#if ratioOfCsvData > 68 && index === 1}
        <text x={xScale(1988)} y={yScale(40)} class="recordyear" opacity = {1} font-size = '2.5vh'>De eerste keer</text>
        <text x={xScale(1988)} y={yScale(39)} class="recordyear" opacity = {1} font-size = '2.5vh'>40+ °C in 2019</text>
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
      {#if index === 1}
        {#each slice(maxTempData, 0, ratioOfCsvData) as d}
          <circle 
            cx = {xScale(+d.year)} 
            cy = {yScale(+d.T)} 
            r = {3}
            fill = {colorScale(+d.T)}
          />
        {/each}
      {/if}
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
    width: 400px;
    height: 300px;
    /* align-self: flex-end; */
    margin: 0 auto;
  }
  svg{
    width:100%;
    height:300px;
  }

</style>