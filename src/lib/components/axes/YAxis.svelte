<script>
  import { scaleLinear, axisLeft, select, selectAll } from "d3";

  export let yScale
  export let height

  let pinYAxis; // declare pins
  
  

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinYAxis) {
    select(pinYAxis).call(axisLeft(yScale).ticks(height / 120).tickSizeOuter(0));
    selectAll(".domain, .tick line")
      .style('stroke', '#808080')
  }
  
</script>

<g
  class="yAxis"
  bind:this={pinYAxis}
/>