<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'

  export let index
  export let middellijnData
  export let offset
  
  $: ratioOfCsvData = Math.round((offset*4)*middellijnData.length)
  
  let xScale = d3.scaleLog()
      .domain(d3.extent(middellijnData, function(d) { return +d.Return; }))
      .range([ 30, 340 ]);

  let yScale = d3.scaleLinear()
    .domain([25, d3.max(middellijnData, function(d) { return +d.Klimaatverandering; })])
    .range([ 270, 20 ]);

</script>

<div class='divkansgrafiek'>
    <div class='sticky-div'>
      <svg>
        <XAxis {xScale} /> 
        <YAxis {yScale} />
        <text x= '100' y= '20' class="titel" opacity = {1}>Hoe vaak kon 40+ °C voorkomen?</text>
        <line x1={xScale(1)}  y1={yScale(40)} x2={xScale(10000)} y2={yScale(40)} stroke="red" stroke-dasharray="5,5"/>
        {#if index === 2}
            {#each slice(middellijnData, 0, ratioOfCsvData) as d}
            <circle 
                cx = {xScale(+d.Return)} 
                cy = {yScale(+d.Zonder)} 
                r = {3}
                fill = 'green'
            />
            {/each}
        {/if}
        {#if index === 2 && ratioOfCsvData > 200}
            {#each slice(middellijnData, 0, (ratioOfCsvData - 200)) as d}
                <circle 
                    cx = {xScale(+d.Return)} 
                    cy = {yScale(+d.Klimaatverandering)} 
                    r = {3}
                    fill = 'red'
                />
            {/each}
        {/if}
        {#if ratioOfCsvData > 180 && index === 2}
            <text x={xScale(800)} y={yScale(35)} class="recordyear" opacity = {1} fill="green" font-size = "12px">Zonder klimaatverandering</text>
            <text x={xScale(800)} y={yScale(34)} class="recordyear" opacity = {1} font-size = "12px">kon 40°C niet voorkomen</text>
        {/if}
        {#if ratioOfCsvData > 280 && index === 2}
            <text x={xScale(20)} y={yScale(38)} class="recordyear" opacity = {1} fill="red" font-size = "12px">Met klimaatverandering</text>
            <text x={xScale(20)} y={yScale(37)} class="recordyear" opacity = {1} font-size = "12px">wel!</text>
        {/if}
      </svg>
    </div>
  </div>


<style>

.divkansgrafiek{
    height:100%;
    position:relative;
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