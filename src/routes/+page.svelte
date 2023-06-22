<script>
	// import Scrolly from "$lib/components/Scrolly.svelte";
	import Graph from "$lib/components/Graph.svelte";
	import BackgroundMap from "$lib/components/BackgroundMap.svelte";
	import 'leaflet/dist/leaflet.css';

	import Introductie from "$lib/components/Introductie.svelte";
	import Ziekenhuis from "$lib/components/Ziekenhuis.svelte";
	import Wandeling from "$lib/components/Wandeling.svelte";
	import Scatter from "$lib/components/Scatter.svelte";
	import Kansgrafiek from "$lib/components/Kansgrafiek.svelte";
	import Unseen from "$lib/components/Unseen.svelte";
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
	const unseenData = data.unseen

	$: console.log(data.datatest)

	const stepNames = ["huis", "ziekenhuis", "scatter", "kansen", "wandeling", "unseen"];

	let index = 0;
	let offset;
	let progress;

	$: currentStepName = stepNames[index];

</script>

<div class='title'>
	<h1>Brabant onvoorbereid</h1>
	<h3>In dit beeldverhaal volg je de consequenties van ongeziene hitte door de ogen van een jong gezin in Eindhoven</h3>

	<div class = 'scrolldown'>
		<h4>Scroll naar beneden</h4>
		<img  width='7%' src={'/images/arrowdown.png'} />
	</div>
</div>

<Scroller bind:index bind:offset bind:progress>
	<div slot='background' top='0' bottom='0'>
		{#if data}
			<BackgroundMap {leafletMap} {offset} {index} {currentStepName}/>
		{/if}

	</div>

	<div slot='foreground'>
		<div class="info">
			<p>Step: {index}</p>
			<p>Step progress: {offset>0 ? Math.round(offset*100) : 0}%</p>
			<p>Total progress: {progress>0 ? Math.round(progress*100) : 0}%</p>
		</div>
		{#each stepNames as stepName, i}
			<section class='step step_{stepName}'>
				{#if stepName === 'scatter'}
					<Scatter {maxTempData} {offset} {index} {stepName} {currentStepName}/>
				{:else if stepName === 'kansen'}
					<Kansgrafiek {middellijnData} {offset} {index} {stepName} {confidenceData} {currentStepName}/>
				{:else if stepName === 'huis'}
					<Introductie {offset} {index} {currentStepName}/>
				{:else if stepName === 'ziekenhuis'}
					<Ziekenhuis {offset} {index} {currentStepName}/>
				{:else if stepName === 'wandeling'}
					<Wandeling {offset} {index} {currentStepName}/>
				{:else if stepName === 'unseen'}
					<Unseen {maxTempData} {offset} {index} {stepName} {currentStepName} {unseenData}/>
				{/if}
			</section>

		{/each}
	</div>
</Scroller>


<style>
	h1{
		margin-bottom:1.5em;
		font-size: 40px;
	}

	.title{
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		background-image: url('$lib/heatwave.png');
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
		width:90%;
		margin: 0 auto;
		position:relative;
	}

  .step {
    height: 3000px;
    /* background: #aaaaaa2b; */
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
		position: relative;
  }

	#graph{
		height: 200vh;
		display: flex;
	}

  .step p {
    font-size: 4em;
  }

  .scrolldown{
	position: absolute;
	margin-left:auto;
	margin-right:auto;
	bottom: 1%;
	-webkit-animation: flickerAnimation 3s infinite;
    -moz-animation: flickerAnimation 3s infinite;
    -o-animation: flickerAnimation 3s infinite;
    animation: flickerAnimation 3s infinite;
  }

	@keyframes flickerAnimation {
	0%   { opacity:1; }
	50%  { opacity:0; }
	100% { opacity:1; }
	}
	@-o-keyframes flickerAnimation{
	0%   { opacity:1; }
	50%  { opacity:0; }
	100% { opacity:1; }
	}
	@-moz-keyframes flickerAnimation{
	0%   { opacity:1; }
	50%  { opacity:0; }
	100% { opacity:1; }
	}
	@-webkit-keyframes flickerAnimation{
	0%   { opacity:1; }
	50%  { opacity:0; }
	100% { opacity:1; }
}


</style>