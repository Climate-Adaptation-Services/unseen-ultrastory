<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import * as _ from 'lodash'
  import { afterUpdate, onMount } from 'svelte'
  import { getStepSize } from "$lib/noncomponents/helperFunctions";

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
      d3.select('.kansgraphpathconfidencezonder').remove() 
      
      d3.select('.svgkansgrafiek')
      .append("path")
      .attr('class', 'kansgraphpathzonder')
      .datum((currentStepName === 'kansgrafiek') ? _.slice(middellijnData, 0, ratioOfCsvData) : [])
      .attr("fill", "none")
      .attr("stroke", "#648fff")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Kans) })
        .y(function(d) { return yScale(d.vroeger) })
        )
       
      d3.select(".svgkansgrafiek")
          .append("path")
          .attr('class', 'kansgraphpathconfidencezonder')
          .attr("d", areaZonder(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 4))))
          .attr("fill", "#648fff")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2")

      if (ratioOfCsvData > 189){  
        
        d3.select('.svgkansgrafiek')
        .append("path")
        .attr('class', 'kansgraphpathmet')
        .datum(_.slice(middellijnData, 0, Math.max(0, ratioOfCsvData-190)))
        .attr("fill", "none")
        .attr("stroke", "#ffb000")
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
          .attr("fill", "#ffb000")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
      }

      if (ratioOfCsvData > 329){          
        d3.select('.svgkansgrafiek')
        .append("path")
        .attr('class', 'kansgraphpath2050')
        .datum(_.slice(middellijnData2050, 0, Math.max(0, ratioOfCsvData-330)))
        .attr("fill", "none")
        .attr("stroke", "#93003a")
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
          .attr("fill", "#93003a")
          .attr("stroke", "none")
          .attr("fill-opacity", "0.2");
      }
    }
  }
  )
</script>

<div class='grafiek'>
  {#if index > 1}
    <div class='graphtext' style='top:{`${0.15*screenHeight}px`}'>
      {#if currentStepName ==='scatter' || currentStepName ==='kansgrafiek'}
        <p class='scroll-text'>
          De kans dat 40°C wordt gehaald in een jaar is sterk toegenomen door klimaatverandering. Statistische berekeningen aan temperatuurreeksen van Eindhoven laten zien hoe groot de kans is dat een temperatuur in een jaar voorkomt.   
        </p>   
      {/if}
      {#if ratioOfCsvData > 100 && currentStepName ==='kansgrafiek'}
        <div class= 'fade-in'>
          <p class='scroll-text'> Toen Niels klein was, <mark style="background: #648fff50 !important"> rond 1980,</mark> zie je dat 40°C bijna onmogelijk was.  
          </p> 
        </div>   
      {/if}
      {#if ratioOfCsvData > 250 && currentStepName ==='kansgrafiek'}
        <div class= 'fade-in'>
          <p class='scroll-text'> Inmiddels, <mark style="background: #ffb00050 !important">in 2023</mark>, nu Sem jong is, is de kans op 40 °C ongeveer 2%. 
          </p> 
        </div>   
      {/if}   
      {#if ratioOfCsvData > 360 && currentStepName ==='kansgrafiek' }
        <div class= 'fade-in'>
          <p class='scroll-text'> <mark style="background: #93003a50 !important">In 2050</mark>, als Sem inmiddels volwassen is, is de kans op 40 °C toegenomen tot ongeveer 7%. 
          </p> 
        </div>   
      {/if}      
    </div>
  {/if}
  
    <div class='sticky-div' >
      <svg >
        <g class='svgkansgrafiek' transform="translate({screenWidth * 0.45},{screenHeight * 0.05})">
        <XAxis {xScale} height={screenHeight * 0.7}/> 
        <YAxis {yScale} height={screenHeight * 0.7}/>
        <text class = 'legendtext' x={screenWidth * 0.33} y={yScale(31.8)}>Statistiek voor:</text> 
        <text class = 'legendtext' x={screenWidth * 0.355} y={yScale(31)}>1980</text>  
        <line x1={screenWidth * 0.33}  y1={yScale(31)} x2={screenWidth * 0.35} y2={yScale(31)} stroke="#648fff" stroke-width="0.3vh"/>
        <text x={xScale(1.5)} class='axistitle' y={yScale(26)}>Kans (%)</text>  
        <text x={xScale(9000)} class='axistitle' y={yScale(50.5)} transform="rotate(-90)">Temperatuur (°C)</text>  
        <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/> 
        <text class = 'graphtitle' x={xScale(1)} y={yScale(48)}>De kans op hitte per generatie</text>
        {#if ratioOfCsvData > 170 && currentStepName === 'kansgrafiek'} 
          <line x1={xScale(0.008)}  y1={yScale(37.0855)} x2={xScale(0.008)} y2={yScale(44.0244)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(37.0855)} x2={xScale(0.0085)} y2={yScale(37.0855)} stroke="grey"/>
          <line x1={xScale(0.0075)}  y1={yScale(44.0244)} x2={xScale(0.0085)} y2={yScale(44.0244)} stroke="grey"/>
          <text x={xScale(0.0075)} y={yScale(40.5)} font-size = "1.3vh" marker-end="url(#triangle)">Bandbreedte</text>
        {/if}
        {#if ratioOfCsvData > 270}
          <line x1={xScale(1.65)}  y1={yScale(28)} x2={xScale(1.7)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>   
          <text class = 'legendtext' x={screenWidth * 0.355} y={yScale(31)+(screenHeight * 0.02)}>2023</text>  
          <line x1={screenWidth * 0.33}  y1={yScale(31)+(screenHeight * 0.02)} x2={screenWidth * 0.35} y2={yScale(31)+(screenHeight * 0.02)} stroke="#ffb000" stroke-width="0.3vh"/>    
        {/if}
        {#if ratioOfCsvData > 360}
          <line x1={xScale(7.8)}  y1={yScale(28)} x2={xScale(7.8)} y2={yScale(40)} stroke="grey" stroke-dasharray="5,5"/>  
          <text class = 'legendtext' x={screenWidth * 0.355} y={yScale(31)+(screenHeight * 0.04)}>2050</text>  
          <line x1={screenWidth * 0.33}  y1={yScale(31)+(screenHeight * 0.04)} x2={screenWidth * 0.35} y2={yScale(31)+(screenHeight * 0.04)} stroke="#93003a" stroke-width="0.3vh"/>     
        {/if}

      </g>
      </svg>
      <p class='graph-description'>Hittestatistieken voor Eindhoven voor het klimaat van 1980, 2023 en 2050. Deze zijn berekend op basis van metingen van KNMI-station Eindhoven en het KNMI'14 WH scenario voor 2050. Gebruikte tools:  
        <a href="https://climexp.knmi.nl">KNMI Climate Explorer</a> en het <a href="https://www.knmi.nl/nederland-nu/KNMI14_klimaatscenarios/transformatieprogramma">KNMI'14 transformatieprogramma</a>.  
      </p>
    </div>
  </div>


<style>
  svg{
    width:100%;
    height: 90%;
    float:right;
  }

  .kansgraphpathconfidence{
    opacity:0.15;
  }

  .legendtext{
    font-size: 2vh;
     dominant-baseline: middle;
  }

  .graph-description{
    color:#4e4e4e;
    font-size:1.5vh;
    text-align: left;
    top: 92%;
    position: absolute;
    left: 50%;
  }
</style>