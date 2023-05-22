<script>
	// import Scrolly from "$lib/components/Scrolly.svelte";
	import Graph from "$lib/components/Graph.svelte";
	import Scatter from "$lib/components/Scatter.svelte";
	import { timeParse } from 'd3'

	import Scroller from "@sveltejs/svelte-scroller";

	export let data;
	

	const csvData = data['data'].map(d => {
		return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }
	})

	const maxTempData = data.datatest

	$: console.log(data.datatest)

	const steps = ["Test", "scatter", "graph", "Test3"];

	let index = 0;
	let offset;
	let progress;

</script>


<h1>Svelte Scrollytelling Component</h1>
<div class="info">
	<p>Step: {index}</p>
	<p>Step progress: {offset>0 ? Math.round(offset*100) : 0}%</p>
	<p>Total progress: {progress>0 ? Math.round(progress*100) : 0}%</p>
</div>

<Scroller bind:index bind:offset bind:progress>
	<div slot='background' top='0' bottom='0'>
	</div>

	<div class='spacer'></div>

	<div slot='foreground' class='foreground'>
		{#each steps as stepName, i}
			
			<section class='step'>
				{#if stepName === 'scatter'}
					<Scatter {maxTempData} {offset} {index} {stepName}/>
				<!-- {:else if stepName === 'scatter'}
					<Scatter {maxTempData} {offset} {index}/>
				{:else} -->
				<p>{stepName}</p>
				{/if}
			</section>

		{/each}
	</div>
</Scroller>


	

<style>
	.info {
		padding: 0.5em;
		position: fixed;
		top: 10;
		left: 0;
		color: white !important;
	}

	.foreground{
		margin-top:500px;
	}

	.background{
		color: white;
		position: fixed;
		left:10px;
		top:10px;
	}
	
	section {
		width:50%;
		margin: 0 auto;
		position:relative;
	}

  .step {
    height: 200vh;
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


</style>