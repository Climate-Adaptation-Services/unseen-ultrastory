<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'
  import { afterUpdate } from 'svelte'

  export let index
  export let middellijnData
  export let offset
  export let confidenceData

  $:console.log(confidenceData)
  
  $: ratioOfCsvData = Math.round((offset*4)*middellijnData.length)
  $: ratioOfCsvDataConfidence = Math.round((offset*4)*confidenceData.length)
  $: console.log(ratioOfCsvDataConfidence)

  let xScale = d3.scaleLog()
      .domain(d3.extent(middellijnData, function(d) { return +d.Return; }))
      .range([ 30, 340 ]);

  let yScale = d3.scaleLinear()
    .domain([25, d3.max(middellijnData, function(d) { return +d.Klimaatverandering; })])
    .range([ 270, 20 ]);

  const areaZonder = d3
    .area()
    .x(d => xScale(d.Return))
    .y0(d => yScale(d.Lower_zonder))
    .y1(d => yScale(d.Upper_zonder))

  const areaMet = d3
    .area()
    .x(d => xScale(d.Return))
    .y0(d => yScale(d.Lower_met))
    .y1(d => yScale(d.Upper_met))
    
  afterUpdate(() => {
  
    if(index === 2){
      d3.select('.kansgraphpathzonder').remove()
      
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathzonder')
      .datum(slice(middellijnData, 0, ratioOfCsvData))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Return) })
        .y(function(d) { return yScale(d.Zonder) })
        )
    }
      
    if(index === 2){
      d3.select('.kansgraphpathconfidencezonder').remove() 
      
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(slice(confidenceData, 0, ratioOfCsvDataConfidence-13)))
          .attr("fill", "lightgreen")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
    }
      
    if(index === 2 && ratioOfCsvData > 200){  
      d3.select('.kansgraphpathmet').remove()
      
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathmet')
      .datum(slice(middellijnData, 0, ratioOfCsvData-200))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Return) })
        .y(function(d) { return yScale(d.Klimaatverandering) })
        )
    }

    if(index === 2 && ratioOfCsvData > 265){    
      d3.select('.kansgraphpathconfidencemet').remove()    
      
      d3.select(".svgkansgrafiek")
        .append("path")
        .attr('class', 'kansgraphpathconfidencemet')
        .attr("d", areaMet(slice(confidenceData, 0, ratioOfCsvDataConfidence-15)))
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("fill-opacity", "0.2");
      }
    })

</script>

<div class='divkansgrafiek'>
    <div class='sticky-div'>
      <svg class='svgkansgrafiek'>
        <XAxis {xScale} /> 
        <YAxis {yScale} />     
        <line x1={xScale(1)}  y1={yScale(40)} x2={xScale(10000)} y2={yScale(40)} stroke="red" stroke-dasharray="5,5"/>        
        {#if ratioOfCsvData > 180 && index === 2}
            <text x={xScale(800)} y={yScale(35)} class="recordyear" fill="green" font-size = "12px">Zonder klimaatverandering</text>
            <text x={xScale(800)} y={yScale(34)} class="recordyear" font-size = "12px">kon 40°C niet voorkomen</text>
        {/if}
        {#if ratioOfCsvData > 280 && index === 2}
            <text x={xScale(20)} y={yScale(38)} class="recordyear" fill="red" font-size = "12px">Met klimaatverandering</text>
            <text x={xScale(20)} y={yScale(37)} class="recordyear" font-size = "12px">wel!</text>
        {/if}
      </svg>
    </div>
  </div>
<style>

.divkansgrafiek{
    height:100%;
    position:relative;
    background-color: #f1f1f1;
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

  .kansgraphpathconfidence{
    opacity:0.2;
  }

</style>