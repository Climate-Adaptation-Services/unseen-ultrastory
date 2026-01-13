<script>
  import * as d3 from 'd3'
  import { onMount } from 'svelte'
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

  onMount(() => {
    stepSize = getStepSize(stepName);
    screenHeight = document.documentElement.clientHeight
    screenWidth = document.documentElement.clientWidth
  })

  let textPaddingKans
  let grafiekPositionY
  let grafiekPositionX
  let barChartHeight
  let barWidth
  let barSpacing

  $: if(screenWidth < 600){
      textPaddingKans = 0.52
      grafiekPositionY = 0.55
      grafiekPositionX = 0.15
      barChartHeight = screenHeight * 0.35
      barWidth = screenWidth * 0.18
      barSpacing = screenWidth * 0.22
    }
     else {
      textPaddingKans = 0.25
      grafiekPositionY = 0.65
      grafiekPositionX = 0.47
      barChartHeight = screenHeight * 0.5
      barWidth = screenWidth * 0.08
      barSpacing = screenWidth * 0.12
    }

  // Scale for bar height (0 to 35 to accommodate 33.5)
  $: yScale = d3.scaleLinear()
      .domain([0, 35])
      .range([0, barChartHeight]);

</script>

<div class='grafiek'>
  {#if index > 1}
    <div class='graphtext' style='top:{`${textPaddingKans*screenHeight}px`}'>
      {#if currentStepName ==='scatter' || currentStepName ==='kansgrafiek'}
        <h1 class='scroll-text-kansgraph'>Klimaforschung</h1>
        <p class='scroll-text-kansgraph'>
          Klimaforscher der Vrije Universität Brüssel haben untersucht, wie viele zusätzliche Hitzewellen Menschen wegen des Klimawandels in ihrem Leben erleben werden. Mit ihrem <a href="https://myclimatefuture.info/de" target="_blank" style="color: inherit;">Online-Tool</a> kann man sehen, wie viele zusätzliche Klimaextreme es in einer stark erwärmten Welt gibt, in der die Temperatur bis 2100 um 3,5 Grad steigt.
        </p>
        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 100 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>
          <p class='scroll-text-kansgraph'> Pauls Großmutter, <mark style="background: #648fff50 !important">geboren 1960</mark>, wird bei dieser Erwärmung in ihrem Leben 5,3-mal mehr Hitzewellen erleben als in einer Welt ohne Klimawandel.
          </p>
        </div>
        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 250 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>
          <p class='scroll-text-kansgraph'> Daniel, <mark style="background: #ffb00050 !important">geboren 1990</mark>, wird dadurch in seinem Leben 14-mal mehr Hitzewellen erleben als ohne Klimawandel.
          </p>
        </div>
        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 360 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>
          <p class='scroll-text-kansgraph'> Und der kleine Paul, <mark style="background: #93003a50 !important">geboren 2020</mark>, wird wegen des Klimawandels in seinem Leben 33,5-mal mehr Hitzewellen erleben als ohne Klimawandel.
          </p>
        </div>
      {/if}
    </div>
  {/if}

    <div class='sticky-div' >
      <svg>
        <g class='svgkansgrafiek' transform="translate({screenWidth * grafiekPositionX},{screenHeight * grafiekPositionY})" >
          <!-- Chart title -->
          <text class='graphtitle' x={barSpacing * 1} y={-barChartHeight - 30} text-anchor="middle">Zusätzliche Hitzewellen pro Generation</text>

          <!-- Bar 1: 1960 - Grandmother -->
          {#if ratioOfCsvData > 100 && currentStepName === 'kansgrafiek'}
            <g class="bar-group" transform="translate(0, 0)">
              <rect
                x={0}
                y={-yScale(5.3)}
                width={barWidth}
                height={yScale(5.3)}
                fill="#648fff"
                rx="4"
              />
              <text class='bar-value' x={barWidth/2} y={-yScale(5.3) - 10} text-anchor="middle" fill="#648fff">5,3×</text>
              <text class='bar-label' x={barWidth/2} y={25} text-anchor="middle" fill="#648fff">1960</text>
            </g>
          {/if}

          <!-- Bar 2: 1990 - Daniel -->
          {#if ratioOfCsvData > 250 && currentStepName === 'kansgrafiek'}
            <g class="bar-group" transform="translate({barSpacing}, 0)">
              <rect
                x={0}
                y={-yScale(14)}
                width={barWidth}
                height={yScale(14)}
                fill="#ffb000"
                rx="4"
              />
              <text class='bar-value' x={barWidth/2} y={-yScale(14) - 10} text-anchor="middle" fill="#ffb000">14×</text>
              <text class='bar-label' x={barWidth/2} y={25} text-anchor="middle" fill="#ffb000">1990</text>
            </g>
          {/if}

          <!-- Bar 3: 2020 - Paul -->
          {#if ratioOfCsvData > 360 && currentStepName === 'kansgrafiek'}
            <g class="bar-group" transform="translate({barSpacing * 2}, 0)">
              <rect
                x={0}
                y={-yScale(33.5)}
                width={barWidth}
                height={yScale(33.5)}
                fill="#93003a"
                rx="4"
              />
              <text class='bar-value' x={barWidth/2} y={-yScale(33.5) - 10} text-anchor="middle" fill="#93003a">33,5×</text>
              <text class='bar-label' x={barWidth/2} y={25} text-anchor="middle" fill="#93003a">2020</text>
            </g>
          {/if}

          <!-- X-axis baseline -->
          {#if currentStepName === 'kansgrafiek' && ratioOfCsvData > 100}
            <line x1={-10} y1={0} x2={barSpacing * 2 + barWidth + 10} y2={0} stroke="#999" stroke-width="1"/>
          {/if}
        </g>
      </svg>
      <p class='graph-description'>In einer Welt, die bis 2100 auf eine Erwärmung von 3,5 Grad zusteuert, werden jüngere Generationen in ihrem Leben viel mehr Hitzewellen erleben als ältere Generationen. Diese Zahlen stammen aus zuverlässiger Klimaforschung der Vrije Universität Brüssel und sind auf <a href="https://myclimatefuture.info/de" target="_blank">myclimatefuture.info</a> zu finden.
      </p>
    </div>
  </div>


<style>
  svg{
    width:100%;
    height: 90%;
    float:right;
  }

  .bar-label{
    font-size: 2vh;
    font-weight: bold;
  }

  .bar-value{
    font-size: 2.5vh;
    font-weight: bold;
  }

  .axis-label{
    font-size: 1.8vh;
    fill: #666;
  }

  .graph-description{
    color:#4e4e4e;
    font-size:1.5vh;
    text-align: left;
    bottom: 8%;
    position: absolute;
    left: 50%;
  }
</style>
