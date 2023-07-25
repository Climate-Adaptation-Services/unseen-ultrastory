<script>
  import { scaleLinear, axisBottom, select, selectAll, format } from "d3";

  export let xScale
  export let height

  let pinXAxis; // declare pins

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinXAxis) {
    select(pinXAxis).call(axisBottom(xScale).ticks(3).tickSizeOuter(0).tickFormat(format("")));
    selectAll(".domain, .tick line")
      .style('stroke', '#808080')
  }

</script>

<g
  class="xAxis"
  bind:this={pinXAxis}
  transform="translate({0},{height})"
  stroke='#404040'
/>

<style>

</style>
