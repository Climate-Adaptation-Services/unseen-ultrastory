<script>
	// import Scrolly from "$lib/components/Scrolly.svelte";
	import Graph from "$lib/components/Graph.svelte";
	import BackgroundMap from "$lib/components/BackgroundMap.svelte";
	import 'leaflet/dist/leaflet.css';

	import Scatter from "$lib/components/Scatter.svelte";
	import Kansgrafiek from "$lib/components/Kansgrafiek.svelte";
	import { timeParse } from 'd3'

	import Scroller from "@sveltejs/svelte-scroller";

	export let data;
	
	let leafletMap;
	

	const csvData = data['data'].map(d => {
		return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }
	})

	const maxTempData = data.datatest
	const middellijnData = data.datamiddellijn
	const confidenceData = data.dataconfidence

	$: console.log(data.datatest)

	const steps = ["Test", "scatter", "kansen", "Test3"];

	let index = 0;
	let offset;
	let progress;

</script>

<div class='title'>
	<h1>Brabant onvoorbereid <br></h1>
</div>

<Scroller bind:index bind:offset bind:progress>
	<div slot='background' top='0' bottom='0'>
		{#if data}
			<BackgroundMap {leafletMap} {offset} {index}/>
		{/if}

	</div>

	<div slot='foreground'>
		<div class="info">
			<p>Step: {index}</p>
			<p>Step progress: {offset>0 ? Math.round(offset*100) : 0}%</p>
			<p>Total progress: {progress>0 ? Math.round(progress*100) : 0}%</p>
		</div>
		{#each steps as stepName, i}
			<section class='step'>
				{#if stepName === 'scatter'}
					<Scatter {maxTempData} {offset} {index} {stepName}/>
				{:else if stepName === 'kansen'}
					<Kansgrafiek {middellijnData} {offset} {index} {stepName} {confidenceData}/>
				{:else}
				<p>{stepName}</p>
				{/if}
			</section>

		{/each}
	</div>
</Scroller>


<style>

	.title{
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		background-image: url('images/heatwave.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.info {
		padding: 0.5em;
		position: fixed;
		top: 0;
		left: 0;
		color: black !important;
		z-index: 1000;
	}

	[slot="foreground"] {
	}

	[slot="background"] {
		color: white;
		position: fixed;
		left:0px;
		top:0px;
		height:100vh;
		width:100vw;
	}
	
	section {
		width:50%;
		margin: 0 auto;
		position:relative;
	}

  .step {
    height: 5000px;
    background: #aaaaaa2b;
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