<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import * as _ from 'lodash'
  import { afterUpdate, onMount } from 'svelte'
  import { getStepSize } from "$lib/noncomponents/stepFunctions";

  export let index
  export let middellijnData
  export let middellijnData2050
  export let offset
  export let confidenceData
  export let currentStepName
  export let stepName

  let stepSize;
  let screenHeight
  let screenWidth

  $: ratioOfCsvData = Math.round((offset*6)*middellijnData.length)
  $: ratioOfCsvDataConfidence = Math.round((offset*6)*confidenceData.length)
  
  onMount(() => {
    stepSize = getStepSize(stepName);
    screenHeight = document.documentElement.clientHeight
    screenWidth = document.documentElement.clientWidth
  })

  $: console.log()

  $: xScale = d3.scaleLog()
      .domain([100,0.01])
      .range([ 0,screenWidth * 0.4]);

  $: yScale = d3.scaleLinear()
    .domain([28, 49])
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

  const area2050 = d3
    .area()
    .x(d => xScale(d.Kans))
    .y0(d => yScale(d.Lower_2050))
    .y1(d => yScale(d.Upper_2050))
    
  afterUpdate(() => {
  
    if(currentStepName === 'kansgrafiek' ){
      d3.select('.kansgraphpathzonder').remove()
      d3.select('.kansgraphpathconfidencemet').remove()
      d3.select('.kansgraphpathconfidence2050').remove()
      d3.select('.kansgraphpathmet').remove()
      d3.select('.kansgraphpath2050').remove()
      
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathzonder')
      .datum((currentStepName === 'kansgrafiek') ? _.slice(middellijnData, 0, ratioOfCsvData) : [])
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Kans) })
        .y(function(d) { return yScale(d.vroeger) })
        )

      d3.select('.kansgraphpathconfidencezonder').remove() 
      
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 4))))
          .attr("fill", "lightgreen")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2")

      if (ratioOfCsvData > 189){  
        
        d3.select('.svgkansgrafiek')
        .append("path")
        .attr('class', 'kansgraphpathmet')
        .datum(_.slice(middellijnData, 0, Math.max(0, ratioOfCsvData-190)))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Kans) })
          .y(function(d) { return yScale(d.nu) })
          )
      }   
    
      if( ratioOfCsvDataConfidence > 20){    
        d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencemet')
          .attr("d", areaMet(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 16))))
          .attr("fill", "red")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
      }

      if (ratioOfCsvData > 329){          
        d3.select('.svgkansgrafiek')
        .append("path")
        .attr('class', 'kansgraphpath2050')
        .datum(_.slice(middellijnData2050, 0, Math.max(0, ratioOfCsvData-330)))
        .attr("fill", "none")
        .attr("stroke", "#5c3765")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Kans)})
          .y(function(d) { return yScale(d.Klimaat_2050)})
          )
      }
      
      if( ratioOfCsvDataConfidence > 30){    
        d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidence2050')
          .attr("d", area2050(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 26))))
          .attr("fill", "#5c3765")
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
        De kans dat 40°C wordt gehaald in een jaar is sterk toegenomen door klimaatverandering. Statistische berekeningen aan temperatuurreeksen van Eindhoven laten zien hoe groot de kans is dat een temperatuur in een jaar voorkomt.   
      </p>
      {#if ratioOfCsvData > 100}
        <div class= 'fade-in'>
          <p class='scroll-text'> Toen Niels klein was, <mark style="background: #bcf5bc !important"> rond 1980,</mark> zie je dat 40°C bijna onmogelijk was.  
          </p> 
        </div>   
      {/if}
      {#if ratioOfCsvData > 250}
        <div class= 'fade-in'>
          <p class='scroll-text'> Inmiddels, <mark style="background: #ff9194 !important">in 2023</mark>, nu Sem jong is, is de kans op 40 °C ongeveer 2%. 
          </p> 
        </div>   
      {/if}   
      {#if ratioOfCsvData > 360}
        <div class= 'fade-in'>
          <p class='scroll-text'> <mark style="background: #b49eb8 !important">In 2050</mark>, als Sem inmiddels volwassen is, is de kans op 40 °C toegenomen tot ongeveer 7%. 
          </p> 
        </div>   
      {/if}      
    </div>
  {/if}
  
    <div class='sticky-div'>
      <svg >
        <g class='svgkansgrafiek' transform="translate({screenWidth * 0.5},{screenHeight * 0.05})">
        <XAxis {xScale} height={screenHeight * 0.7}/> 
        <YAxis {yScale} height={screenHeight * 0.7}/>
        <text x={xScale(1.5)} y={yScale(26)} font-size = "2vh">Kans (%)</text>  
        <text x={xScale(9000)} y={yScale(50.5)} transform="rotate(-90)" font-size = "2vh">Temperatuur (°C)</text>  
        <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/> 
        <text x={xScale(100)} y={yScale(21)} font-size = "1.5vh" text-color = 'grey'>bron: KNMI</text>
        <text x={xScale(1)} y={yScale(52)} font-size = "2.5vh" text-anchor="middle">De kans op hitte per generatie</text>
        {#if ratioOfCsvData > 270}
          <line x1={xScale(1.65)}  y1={yScale(28)} x2={xScale(1.65)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>       
        {/if}
        {#if ratioOfCsvData > 360}
          <line x1={xScale(7.8)}  y1={yScale(28)} x2={xScale(7.8)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>       
        {/if}
        <!-- {#if ratioOfCsvData > 180 && currentStepName === 'kansgrafiek'}
            <text x={xScale(0.1)} y={yScale(34)} class="recordyear" fill="green" font-size = "1.5vh">Zonder klimaatverandering</text>
            <text x={xScale(0.1)} y={yScale(34) + 15} class="recordyear" font-size = "1.5vh">kon 40°C niet voorkomen</text>
        {/if} -->
        {#if ratioOfCsvData > 170 && currentStepName === 'kansgrafiek'}
          <line x1={xScale(0.008)}  y1={yScale(37.0855)} x2={xScale(0.008)} y2={yScale(44.0244)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(37.0855)} x2={xScale(0.0085)} y2={yScale(37.0855)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(44.0244)} x2={xScale(0.0085)} y2={yScale(44.0244)} stroke="grey"/>
          <text x={xScale(0.0075)} y={yScale(40.5)} fill="grey" font-size = "10px" marker-end="url(#triangle)">Bandbreedte</text>
        {/if}
        <!-- {#if ratioOfCsvData > 280 && currentStepName === 'kansgrafiek'}
            <text x={xScale(29)} y={yScale(43)} class="recordyear" fill="red" font-size = "1.5vh">Met klimaatverandering</text>
            <text x={xScale(29)} y={yScale(43  )+ 15} class="recordyear" font-size = "1.5vh">wel!</text>
        {/if} -->
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
  }
  svg{
    width:100%;
    height:100%;
    float:right;
  }

  .kansgraphpathconfidence{
    opacity:0.15;
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