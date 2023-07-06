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
	import AutoRitje from "$lib/components/AutoRitje.svelte";
	import Aftiteling from "$lib/components/Aftiteling.svelte";

	import { timeParse } from 'd3'

	import Scroller from "@sveltejs/svelte-scroller";
	import { onMount } from "svelte";

	// for preloading images
	let imageModules = import.meta.glob("/static/images/*");

	export let data;
	
	let leafletMap;

	const csvData = data['data'].map(d => {
		return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }
	})

	const maxTempData = data.datatest
	const middellijnData = data.datamiddellijn
	const middellijnData2050 = data.datamiddellijn2050
	const confidenceData = data.dataconfidence
	const unseenData = data.unseen

	$: console.log(data.datatest)

	const stepNames = [
		"huis", 
		"ziekenhuis", 
		"scatter", 
		"kansen", 
		"wandeling", 
		"unseen", 
		"autoritje",
		"aftiteling"
	];

	let index = 0;
	let offset;
	let progress;

	$: currentStepName = stepNames[index];

	// onMount(() => {
	// 	const cloud = select('.cloud')
	// 	function moveCloud(){
	// 		cloud
	// 			.style('left', '-900px')
			
	// 		cloud
	// 			.transition().ease(easeLinear).duration(200000)
	// 			.style('left', '4000px')
	// 			.on('end', moveCloud)
	// 	}
	// 	moveCloud();

	// })

</script>

<!-- preload images -->
<svelte:head>
	{#each Object.keys(imageModules) as imageUrl}
    <link rel="preload" as="image" href={imageUrl.slice(7)} />
	{/each}
</svelte:head>

<div class='title' on:click={() => document.getElementById('heat').play()}>
	{#if currentStepName === 'huis'}
		<audio src="sounds/heat.mp3" autoplay loop id='heat'/> 
	{/if}
	<div>
		<h1>Ongekend heet</h1>
		<h3>Een verhaal over extreme hitte in Nederland</h3>
		<!-- <h3>In dit beeldverhaal volg je de consequenties van ongeziene hitte door de ogen van een jong gezin in Eindhoven</h3> -->
	</div>
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
		<!-- <img class='cloud' src='images/cloud.png' width='400px'/> -->

	</div>

	<div slot='foreground'>
		<div class="info">
			<p>Step: {index}</p>
			<p>Step progress: {offset>0 ? Math.round(offset*100) : 0}%</p>
			<p>Total progress: {progress>0 ? Math.round(progress*100) : 0}%</p>
		</div>
		
		<img class='fixed-image' src='' style='opacity:0'/>

		{#each stepNames as stepName, i}
			{#if ['scatter', 'kansen', 'unseen', 'aftiteling'].includes(stepName)}
				<section class='widestep step_{stepName}'>
					{#if stepName === 'scatter'}
						<Scatter {maxTempData} {offset} {index} {stepName} {currentStepName}/>
					{:else if stepName === 'kansen'}
						<Kansgrafiek {middellijnData} {middellijnData2050} {offset} {index} {stepName} {confidenceData} {currentStepName}/>
					{:else if stepName === 'unseen'}
						<Unseen {maxTempData} {offset} {index} {stepName} {currentStepName} {unseenData}/>
					{:else if stepName === 'aftiteling'}
						<Aftiteling {offset} {index} {stepName} {currentStepName} />
					{/if}
				</section>
			{:else}
				<section class='step step_{stepName}'>		
					{#if stepName === 'huis'}
						<Introductie {offset} {index} {currentStepName} {stepName} />
					{:else if stepName === 'ziekenhuis'}
						<Ziekenhuis {offset} {index} {currentStepName} {stepName} />
					{:else if stepName === 'wandeling'}
						<Wandeling {offset} {index} {currentStepName} {stepName} />
					{:else if stepName === 'autoritje'}
						<AutoRitje {offset} {index} {stepName} {currentStepName} />
					{/if}
				</section>
			{/if}
		{/each}
	</div>
</Scroller>


<style>
	.cloud{
		position: fixed;
		z-index: 1000;
		top:300px;
		filter: contrast(0) sepia(100%) hue-rotate(116deg) brightness(1.3) saturate(0.28) grayscale(100%) opacity(60%);
	}


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
		animation: blur 7s ease 0s infinite;
		-webkit-animation: blur 7s ease 0s infinite;
		-moz-animation: blur 7s ease 0s infinite;
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
		margin: 0 auto;
		position:relative;
	}

  .step, .widestep {
    height: 3000px;
    /* background: #aaaaaa2b; */
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
		position: relative;
		width:90%;
  }

  .step {
		width:90%;
  }

  .widestep {
		width:100%;
  }

	.outrostep{
		width:100%;
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

	@keyframes blur {
		0%,
		90% {
			-webkit-filter: blur(0px);
			-moz-filter: blur(0px);
			-o-filter: blur(0px);
			-ms-filter: blur(0px);
		}
		50% {
			-webkit-filter: blur(4px);
			-moz-filter: blur(4px);
			-o-filter: blur(4px);
			-ms-filter: blur(4px);
		}
	}

</style>