<script>

  export let stepNames;
  export let currentStepName;
  export let height;
  export let offset;

  const yOffset = 40
  $: innerHeight = height - 2*yOffset;

  function click(stepNameClicked){
    document.getElementsByClassName('step_' + stepNameClicked)[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }

</script>

{#if offset > 0.1 || currentStepName !== 'thuis'}
  <svg class='navigation-svg'>
    {#each stepNames as stepName,i}
      <g class='chapterg' transform='translate(170,{yOffset + (innerHeight/stepNames.length)*i})'>
        <text class='chapter-text {(currentStepName === stepName) ? 'chapter-text-active' : ''}' fill={currentStepName !== 'wandeling' ? 'rgb(130, 130, 130)' : 'white'} dy='0.26em' dx='-25' opacity='0'>{stepName.charAt(0).toUpperCase() + stepName.slice(1)}</text>
        <circle class='chapter-circle' r={(stepName === currentStepName) ? '8' : '1'} stroke-width={(stepName === currentStepName) ? '7px' : '10px'} opacity='1' fill='cyan' />
        <rect width='130' height={innerHeight/stepNames.length} opacity='0' x='-110' y={-(innerHeight/stepNames.length)/2} on:click={() => click(stepName)} pointer-events={(currentStepName === stepName) ? 'none' : 'default'}/>
      </g>

    {/each}
  </svg>
{/if}


<style>

  .navigation-svg{
		width:100%;
		height:100%;
    color:rgb(88, 88, 88);
	}

  .navigation-svg:hover .chapter-text-active{
    opacity:1
  }

  .chapter-circle{
    fill:white;
    fill-opacity: 0.01;
    stroke:#FDB813;
    stroke-width: 10px;
    transition: all 0.5s;
    opacity:0.7;
    cursor:pointer;
  }

  .chapter-text{
    text-anchor: end;
    font-size: 16px;
  }

  .chapterg:hover .chapter-text{
    opacity:0.5;
  }

  .chapterg:hover .chapter-circle{
    r:8;
    stroke-width: 7px;
  }

  .chapterg{
    cursor: pointer;
  }

</style>