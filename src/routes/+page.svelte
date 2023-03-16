<script>
	import Scrolly from "$lib/components/Scrolly.svelte";
	import Graph from "$lib/components/Graph.svelte";
	import { timeParse } from 'd3'

	import { stepValue } from "$lib/stores.js"

	export let data;

	const csvData = data['data'].map(d => {
		return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }
	})

	$: console.log(csvData)

	const steps = ["Test", "graph", "Test2", "Test3"];

</script>


<div class="info">
	<h1>Svelte Scrollytelling Component</h1>
	<mark>Active: {$stepValue}</mark>
</div>

<section >
	<div class="spacer" />

	<Scrolly bind:value={$stepValue}>
		{#each steps as stepName, i}
			<div id={stepName} class="step" class:active={$stepValue === i}>
			{#if stepName === 'graph'}
				<Graph {csvData} />
			{:else}
				<p>{stepName}</p>
			{/if}
			</div>
		{/each}
	</Scrolly>
	
	<div class="spacer" />
</section>

<style>
	mark {
		padding: 0.5em;
		position: fixed;
		top: 0;
		right: 0;
	}
	
	section {
		width:50%;
		margin: 0 auto;
	}
	
	.spacer {
		height: 100vh;
	}

  .step {
    height: 80vh;
    background: #aaa;
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
  }

	#graph{
		height: 200vh;
		display: flex;
	}

  .step p {
    font-size: 4em;
  }

  .step.active {
    background: #ddd;
  }

</style>