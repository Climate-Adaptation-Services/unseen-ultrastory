<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { slice } from 'lodash'
  import _ from 'lodash';
  import { browser } from "$app/environment";
  import { scaleLinear, axisBottom, select, selectAll, format } from "d3";

  export let index
  export let maxTempData
  export let offset
  export let currentStepName
  export let unseenData

  $: unseenDataYear = unseenData.filter(d => d.year === '2019');

  $: unseenDataExtreme = unseenData.filter(d => d.celcius > 40);

  $: unseenDataYear = _.sortBy(unseenDataYear, 'number');

  $: ratioOfCsvData = Math.round((offset * 2)*unseenDataYear.length)

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_scatter')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  $:console.log(unseenDataExtreme)

  let yScale = d3.scaleLinear()
    .domain([28, 42])
    .range([ 270, 20 ]);

  let xScale = d3.scaleLinear()
    .domain([1990, 2022])
    .range([ 30,340 ]);

  let colorScale = d3
  .scaleLinear()
  .domain([28,42])
  .range(['orange', 'darkred'])

</script>

<div class='divscatter grafiek'>
  <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
    <p class='scroll-text'> We gebruiken de UNSEEN methode om dit te onderzoeken. Laten we beginnen met het jaar 2019.
    </p> 
    {#if ratioOfCsvData > 63}
    <div class= 'fade-in'>
      <p class='scroll-text'>Weermodellen maken temperatuurvoorspellingen voor het komende seizoen. Dit model wordt vele malen gedraaid met variërende startomstandigheden. Hierdoor ontstaan er jaarlijks ongeveer 75 verschillende ‘virtuele waarnemingen’ voor maximale temperatuur. Deze zie je hiernaast als grijze stip.
    </p> 
    </div>   
    {/if} 
    {#if ratioOfCsvData > 200}
    <div class= 'fade-in'>  
      <p class='scroll-text'> De meeste virtuele waarnermingen zijn onder de 40 °C. Maar één waarneming laat een temperatuur zien van 40.6 °C. We zien dus dat de extremen uit de weermodellen wel degelijk kunnen voorkomen.
    </p> 
    </div>   
    {/if} 
    {#if ratioOfCsvData > 230}
    <div class= 'fade-in'>  
      <p class='scroll-text'> Als we dan naar de extremen in andere jaren kijken zien we sinds 1991 vaker 40 °C in de modellen. Deze 'virtuele waarnemingen' zijn toen niet uitgekomen maar hadden zo hoog kunnen zijn als 42 graden. 
    </p> 
    </div>   
    {/if}
  </div>
 

  <div class='sticky-div'>
    <svg>
        <YAxis {yScale} />
        <XAxis {xScale} />
        <circle 
            cx = {xScale(2019)} 
            cy = {yScale(40.3)} 
            r = {5}
            fill = 'red'
        />
        {#if currentStepName === 'unseen'&& ratioOfCsvData > 50}
            {#each slice(unseenDataYear, 0, ratioOfCsvData - 50) as d}
            <circle 
                cx = {xScale(+d.year)} 
                cy = {yScale(+d.celcius)} 
                r = {3}
                fill = {colorScale(+d.T)}
                opacity = {0.5}
            />
            {/each}
        {/if}
        <!-- {#if ratioOfCsvData > 200}
            <text x={xScale(2018.15)} y={yScale(40.4)} class="recordyear" fill="grey" font-size = "12px">UNSEEN</text>
            <path
                transform="translate(100 18)"
                id='arrow-line'
                marker-end='url(#head)'
                stroke-width='1'
                fill='none' 
                stroke='grey'  
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
            />
        {/if} -->
        {#if currentStepName === 'unseen'&& ratioOfCsvData > 230}
            {#each slice(unseenDataExtreme, 0, ratioOfCsvData - 230) as d}
            <circle 
                cx = {xScale(+d.year)} 
                cy = {yScale(+d.celcius)} 
                r = {3}
                fill = {colorScale(+d.T)}
                opacity = {0.5}
            />
            {/each}
        {/if}
        
        <text x={xScale(2020.2)} y={yScale(40)} class="recordyear" fill="red" font-size = "12px">2019 hitterecord</text>
        
    </svg>
  </div>
</div>


<style>

.divscatter{
    height:100%;
    position:relative;
  }

  .sticky-div{
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top:100px;
    width: 100%;
    height: 600px;
    /* align-self: flex-end; */
    margin: 0 auto;
  }

  svg{
    width:50%;
    height:100%;
    float:right;
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