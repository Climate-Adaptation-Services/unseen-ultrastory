<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { afterUpdate } from 'svelte'
  import { slice } from 'lodash'

  export let index
  export let csvData
  export let offset

  $: ratioOfCsvData = Math.round((offset*1.4)*csvData.length)

  let xScale = d3.scaleTime()
      .domain(d3.extent(csvData, function(d) { return d.date; }))
      .range([ 30, 340 ]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, function(d) { return +d.value; })])
    .range([ 270, 0 ]);
  
  afterUpdate(() => {

    d3.select('.graphpath').remove()
    
    if(index === 1){
      d3.select('svg')
      .append("path")
      .attr('class', 'graphpath')
      .datum(slice(csvData, 0, ratioOfCsvData))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.date) })
        .y(function(d) { return yScale(d.value) })
        )
    }

  })

</script>

<div class='divgraph'>
  <div class='sticky-div'>
    <svg>
      <XAxis {xScale} /> 
      <YAxis {yScale} />
    </svg>
  </div>
</div>


<style>
  .divgraph{
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