<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import * as _ from 'lodash'
  import { afterUpdate } from 'svelte'
  import { browser } from "$app/environment";

  export let index
  export let middellijnData
  export let offset
  export let confidenceData
  export let currentStepName

  let stepSize;
  let stepWidth
  let screenHeight
  let screenWidth

  $: ratioOfCsvData = Math.round((offset*4)*middellijnData.length)
  $: ratioOfCsvDataConfidence = Math.round((offset*6)*confidenceData.length)
  
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_scatter')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
    screenHeight = document.documentElement.clientHeight
    screenWidth = document.documentElement.clientWidth
    stepWidth = stepRect.width;
  }

  $: xScale = d3.scaleLog()
      .domain([100,0.01])
      .range([ 0,screenWidth * 0.45]);

  $: yScale = d3.scaleLinear()
    .domain([25, 46])
    .range([ screenHeight * 0.7, 0 ]);

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
  
    if(currentStepName === 'kansen' ){
      d3.select('.kansgraphpathzonder').remove()
      
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathzonder')
      .datum((currentStepName === 'kansen') ? _.slice(middellijnData, 0, ratioOfCsvData) : [])
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Kans) })
        .y(function(d) { return yScale(d.Zonder) })
        )

      d3.select('.kansgraphpathconfidencezonder').remove() 
      
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 4))))
          .attr("fill", "lightgreen")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2")

      if (ratioOfCsvData > 199){  
        d3.select('.kansgraphpathmet').remove()
        
        d3.select('.svgkansgrafiek')
        .append("path")
        .attr('class', 'kansgraphpathmet')
        .datum(_.slice(middellijnData, 0, ratioOfCsvData-200))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Kans) })
          .y(function(d) { return yScale(d.Klimaatverandering) })
          )
      }   
    
    if( ratioOfCsvDataConfidence > 30){    
      d3.select('.kansgraphpathconfidencemet').remove()    
      
      d3.select(".svgkansgrafiek")
        .append("path")
        .attr('class', 'kansgraphpathconfidencemet')
        .attr("d", areaMet(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 30))))
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("fill-opacity", "0.2");
      }
    }
  }
  )
      
    
    

    
  

</script>

<div class='divkansgrafiek grafiek'>

  {#if index > 1}
    <div class='graphtext' style='top:{`${0.15*screenHeight}px`}'>
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
      <svg >
        <g class='svgkansgrafiek' transform="translate({screenWidth * 0.5},{screenHeight * 0.15})">
        <XAxis {xScale} height={screenHeight * 0.7}/> 
        <YAxis {yScale} height={screenHeight * 0.7}/>
        <text x={xScale(1.5)} y={yScale(23.5)} font-size = "1.5vh">Kans (%)</text>  
        <text x={xScale(5000)} y={yScale(47.5)} transform="rotate(-90)" font-size = "1.5vh">Temperatuur (°C)</text>  
        <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/> 
        {#if ratioOfCsvData > 270}
          <line x1={xScale(2)}  y1={yScale(25)} x2={xScale(2)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>       
        {/if}
        {#if ratioOfCsvData > 180 && currentStepName === 'kansen'}
            <text x={xScale(0.1)} y={yScale(34)} class="recordyear" fill="green" font-size = "1.5vh">Zonder klimaatverandering</text>
            <text x={xScale(0.1)} y={yScale(34) + 15} class="recordyear" font-size = "1.5vh">kon 40°C niet voorkomen</text>
        {/if}
        {#if ratioOfCsvData > 120 && currentStepName === 'kansen'}
          <line x1={xScale(0.008)}  y1={yScale(35.4371)} x2={xScale(0.008)} y2={yScale(42.2131)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(35.4371)} x2={xScale(0.0085)} y2={yScale(35.4371)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(42.2131)} x2={xScale(0.0085)} y2={yScale(42.2131)} stroke="grey"/>
          <text x={xScale(0.0075)} y={yScale(38.5)} fill="grey" font-size = "10px" marker-end="url(#triangle)">Bandbreedte</text>
        {/if}
        {#if ratioOfCsvData > 280 && currentStepName === 'kansen'}
            <text x={xScale(29)} y={yScale(43)} class="recordyear" fill="red" font-size = "1.5vh">Met klimaatverandering</text>
            <text x={xScale(29)} y={yScale(43  )+ 15} class="recordyear" font-size = "1.5vh">wel!</text>
        {/if}
      </g>
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
    top:0px;
    width: 100%;
    height: 100vh;
    /* align-self: flex-end; */
    margin: 0 auto;
  }
  svg{
    width:100%;
    height:100%;
    float:right;
  }

  .kansgraphpathconfidence{
    opacity:0.2;
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