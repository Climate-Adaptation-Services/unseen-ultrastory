<script>
  import { scaleLinear, axisLeft, select, selectAll } from "d3";

  export let yScale

  let pinYAxis; // declare pins
  let margin = 30; // declare initial values for margin and svg_height/width
  let svg_width = 400;
  let svg_height = 300;
  $: height = svg_height - margin * 2;

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinYAxis) {
    select(pinYAxis).call(axisLeft(yScale).ticks(height / 60).tickSizeOuter(0));
    selectAll(".domain, line")
      .style('stroke', '#808080')
  }
  
</script>

<g
  class="yAxis"
  bind:this={pinYAxis}
  transform="translate({margin},{0})"
  stroke='#404040'
/>