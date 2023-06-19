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
  export let currentStepName

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
      .range([ 40, 350 ]);

  let yScale = d3.scaleLinear()
    .domain([25, 46])
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
  
    if(currentStepName === 'kansen'){
      d3.select('.kansgraphpathzonder').remove()
      
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
      
    if(currentStepName === 'kansen'){
      d3.select('.kansgraphpathconfidencezonder').remove() 
      
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(slice(confidenceData, 0, ratioOfCsvDataConfidence - 4)))
          .attr("fill", "lightgreen")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
    }
      
    if(currentStepName === 'kansen' && ratioOfCsvData > 200){  
      d3.select('.kansgraphpathmet').remove()
      
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

    if(currentStepName === 'kansen' && ratioOfCsvData > 265){    
      d3.select('.kansgraphpathconfidencemet').remove()    
      
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

<div class='divkansgrafiek grafiek'>

  {#if index > 1}
    <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
      <p class='scroll-text'>
        Wat is dan de kans dat 40 °C wordt gehaald in een jaar? Dat zie je hiernaast.  
      </p>
      {#if ratioOfCsvData > 100}
        <div class= 'fade-in'>
          <p class='scroll-text'> Allereerst kijken we naar de kans <mark style="background: #bcf5bc !important">zonder klimaatverandering.</mark> Je ziet dat 40 °C bijna onmogelijk is.  
          </p> 
        </div>   
      {/if}
      {#if ratioOfCsvData > 250}
        <div class= 'fade-in'>
          <p class='scroll-text'> Maar door het effect van <mark style="background: #ff9194 !important">klimaatverandering</mark> is de kans op 40 °C in ons huidige klimaat ongeveer 2%. In de toekomst zal deze kans alleen maar groter worden. 
          </p> 
        </div>   
      {/if}       
    </div>
  {/if}
  
    <div class='sticky-div'>
      <svg class='svgkansgrafiek'>
        <XAxis {xScale} /> 
        <g transform="translate(10,0)">
          <YAxis {yScale} /> 
        </g>
      <svg class='svgkansgrafiek' xmlns="http://www.w3.org/2000/svg">
        <text x={xScale(1.5)} y={yScale(22.5)} font-size = "12px">Kans (%)</text>  
        <text x={xScale(100000)} y={yScale(46.9)} transform="rotate(-90)" font-size = "12px">Temperatuur (°C)</text>  
        <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/> 
        {#if ratioOfCsvData > 270}
          <line x1={xScale(2)}  y1={yScale(25)} x2={xScale(2)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>       
        {/if}
        {#if ratioOfCsvData > 180 && currentStepName === 'kansen'}
            <text x={xScale(0.1)} y={yScale(34)} class="recordyear" fill="green" font-size = "12px">Zonder klimaatverandering</text>
            <text x={xScale(0.1)} y={yScale(33)} class="recordyear" font-size = "12px">kon 40°C niet voorkomen</text>
        {/if}
        {#if ratioOfCsvData > 120 && currentStepName === 'kansen'}
          <line x1={xScale(0.008)}  y1={yScale(35.4371)} x2={xScale(0.008)} y2={yScale(42.2131)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(35.4371)} x2={xScale(0.0085)} y2={yScale(35.4371)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(42.2131)} x2={xScale(0.0085)} y2={yScale(42.2131)} stroke="grey"/>
          <text x={xScale(0.007)} y={yScale(38.5)} fill="grey" font-size = "10px" marker-end="url(#triangle)">Bandbreedte</text>
        {/if}
        {#if ratioOfCsvData > 280 && currentStepName === 'kansen'}
            <text x={xScale(29)} y={yScale(43)} class="recordyear" fill="red" font-size = "12px">Met klimaatverandering</text>
            <text x={xScale(29)} y={yScale(42)} class="recordyear" font-size = "12px">wel!</text>
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