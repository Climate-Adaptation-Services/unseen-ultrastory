<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { afterUpdate } from 'svelte'
  import { slice } from 'lodash'
  import onClassChange from '$lib/noncomponents/classwatcher.js'

  export let index
  export let maxTempData
  export let offset
  export let stepName

  $: ratioOfCsvData = Math.round((offset * 1.4)*maxTempData.length)
  $: console.log(offset, ratioOfCsvData, index)

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

  
  afterUpdate(() => {

    d3.select('.scatterpath').remove()
    
    if(index === 1){
      d3.select('svg') 
      .selectAll("dot")
      .attr('class', 'scatterpath')
      .data(slice(maxTempData, 0, ratioOfCsvData))
      .enter()
      .append("circle")
        .attr("cx", function (d) {return xScale(+d.year) ; } )
        .attr("cy", function (d) {return yScale(+d.T); } )
        .attr("r", 3)
        .style("fill", function (d) {return colorScale(+d.T) ; } )
    }

    if(offset > 0.7 && index === 1){
      d3.select('.recordyear')
      .attr('opacity', 1)
    }
  })

</script>

<div class='divscatter'>
  <div class='sticky-div'>
    <svg>
      <XAxis {xScale} /> 
      <YAxis {yScale} />
      <text x={xScale(2019)-40} y={yScale(40)} class="recordyear" opacity = {0}>2019</text>
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