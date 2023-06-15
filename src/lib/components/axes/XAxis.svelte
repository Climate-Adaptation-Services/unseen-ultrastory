<script>
  import { scaleLinear, axisBottom, select, selectAll, format } from "d3";

  export let xScale

  let pinXAxis; // declare pins
  let margin = 30; // declare initial values for margin and svg_height/width
  let svg_width = 400;
  let svg_height = 300;


  $: width = svg_width - margin * 2;
  $: height = svg_height - margin * 2;

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinXAxis) {
    select(pinXAxis).call(axisBottom(xScale).ticks(3).tickSizeOuter(0).tickFormat(format("")));
    selectAll(".domain, line")
      .style('stroke', '#808080')
  }

</script>

<g
  class="xAxis"
  bind:this={pinXAxis}
  transform="translate({0},{margin + height})"
  stroke='#404040'
/>

<style>

</style>
