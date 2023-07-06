<script>

  export let stepNames;
  export let currentStepName;
  export let height;

  const yOffset = 40
  $: innerHeight = height - 2*yOffset;

  function click(stepNameClicked){
    document.getElementsByClassName('step_' + stepNameClicked)[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }

</script>

<svg class='navigation-svg'>
  {#each stepNames as stepName,i}
    <g transform='translate(170,{yOffset + (innerHeight/stepNames.length)*i})'>
      {#if stepName === currentStepName}
          <text class='chapter-text' dy='0.26em' dx='-25'>{stepName}</text>
          <circle class='chapter-circle' r='10' stroke-width='5px' opacity='1' fill='cyan' pointer-events='none'/>
      {:else}
          <circle class='chapter-circle' r='3' stroke-width='10px' on:click={() => click(stepName)}/>
      {/if}
    </g>

  {/each}
</svg>


<style>

  .navigation-svg{
		width:100%;
		height:100%;
	}

  .chapter-circle{
    fill:white;
    fill-opacity: 0.01;
    stroke:rgb(122, 38, 38);
    stroke-width: 10px;
    transition: all 0.5s;
    opacity:0.7;
  }

  .chapter-text{
    text-anchor: end;
  }

  .chapter-circle:hover{
    r:10;
    stroke-width: 5px;
  }

</style>