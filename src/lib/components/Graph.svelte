<script>
	import XAxis from "$lib/components/axes/XAxis.svelte";
	import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import { onMount } from 'svelte'
	import { stepValue } from "$lib/stores.js"
  import onClassChange from '$lib/noncomponents/classwatcher.js'

  export let csvData

  let xScale = d3.scaleTime()
      .domain(d3.extent(csvData, function(d) { return d.date; }))
      .range([ 30, 340 ]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, function(d) { return +d.value; })])
    .range([ 270, 0 ]);
  
  onMount(() => {
      
    var itemToWatch = document.querySelector('#graph');
    onClassChange(itemToWatch, (node) => {
      if(node.classList.contains('active')){
        const path = d3.select('svg')
          .append("path")
          .attr('class', 'graphpath')
          .datum(csvData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return xScale(d.date) })
            .y(function(d) { return yScale(d.value) })
            )
    
        const totalLength = path.node().getTotalLength();

        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition().duration(5000).ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
      }else{
        // d3.select('.graphpath').remove()
      }
    });
  })

</script>

<div class='sticky-div'>
  <svg>
    <XAxis {xScale} /> 
    <YAxis {yScale} />
  </svg>
</div>


<style>
  .sticky-div{
    position: sticky;
    position: -webkit-sticky; /* Safari */
    bottom:50px;
    width: 400px;
    height: 300px;
    align-self: flex-end;
    margin: 0 auto;
  }
  svg{
    width:100%;
    height:300px;
  }
</style>