<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'
  import { afterUpdate } from 'svelte'
  import { browser } from "$app/environment";

  export let index
  export let middellijnData
  export let offset
  export let confidenceData

  $: ratioOfCsvData = Math.round((offset*4)*middellijnData.length)
  $: ratioOfCsvDataConfidence = Math.round((offset*6)*confidenceData.length)
  $: console.log(middellijnData, confidenceData)

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_scatter')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  let xScale = d3.scaleLog()
      .domain([100,0.01])
      .range([ 30, 340 ]);

  

  let yScale = d3.scaleLinear()
    .domain([25, d3.max(middellijnData, function(d) { return +d.Klimaatverandering; })])
    .range([ 270, 20 ]);

  const areaZonder = d3
    .area()
    .x(d => xScale(d.Kans))
    .y0(d => yScale(d.Lower_zonder))
    .y1(d => yScale(d.Upper_zonder))

  const areaMet = d3
    .area()
    .x(d => xScale(d.Kans))
    .y0(d => yScale(d.Lower_met))
    .y1(d => yScale(d.Upper_met))
    
  afterUpdate(() => {
  
    d3.select('.kansgraphpathzonder').remove()
    if(index === 2){     
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathzonder')
      .datum(slice(middellijnData, 0, ratioOfCsvData))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Kans) })
        .y(function(d) { return yScale(d.Zonder) })
        )
    }
      
    d3.select('.kansgraphpathconfidencezonder').remove() 
    if(index === 2 && ratioOfCsvData > 67){    
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(slice(confidenceData, 0, ratioOfCsvDataConfidence - 4)))
          .attr("fill", "lightgreen")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
    }
    
    d3.select('.kansgraphpathmet').remove()
    if(index === 2 && ratioOfCsvData > 200){  
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathmet')
      .datum(slice(middellijnData, 0, ratioOfCsvData-200))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Kans) })
        .y(function(d) { return yScale(d.Klimaatverandering) })
        )
    }
    d3.select('.kansgraphpathconfidencemet').remove()  
    if(index === 2 && ratioOfCsvData > 265){    
      d3.select(".svgkansgrafiek")
        .append("path")
        .attr('class', 'kansgraphpathconfidencemet')
        .attr("d", areaMet(slice(confidenceData, 0, ratioOfCsvDataConfidence-30)))
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("fill-opacity", "0.2");
      }
    })

</script>

<div class='divkansgrafiek'>

  {#if index > 1}
    <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
      <p class='scroll-text'>In deze grafiek zie je dat de kans op 40 graden in een gegeven jaar in het huidig klimaat ongeveer 2 procent is. Zonder klimaatverandering is die kans heel veel kleiner, en was het virtueel onmogelijk om 40 graden mee te maken. In de toekomst zal deze kans alleen maar groter worden
      </p>      
    </div>
  {/if}
  
    <div class='sticky-div'>
      <svg class='svgkansgrafiek'>
        <XAxis {xScale} /> 
        <YAxis {yScale} />     
        <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke="red" stroke-dasharray="5,5"/>        
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
    width: 100%;
    height: 300px;
    /* align-self: flex-end; */
    margin: 0 auto;
  }
  svg{
    width:50%;
    height:300px;
    float:right;
  }

  .kansgraphpathconfidence{
    opacity:0.2;
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