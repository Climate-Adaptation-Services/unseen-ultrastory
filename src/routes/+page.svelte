<script>
	import BackgroundMap from "$lib/components/BackgroundMap.svelte";
	import 'leaflet/dist/leaflet.css';

	import Titlepage from "$lib/components/Titlepage.svelte";
	import Introductie from "$lib/components/Introductie.svelte";
	import Ziekenhuis from "$lib/components/Ziekenhuis.svelte";
	import Gesprek from "$lib/components/Gesprek.svelte";
	import Wandeling from "$lib/components/Wandeling.svelte";
	import Scatter from "$lib/components/Scatter.svelte";
	import Kansgrafiek from "$lib/components/Kansgrafiek.svelte";
	import Krantenkoppen from "$lib/components/Krantenkoppen.svelte";
	import AutoRitje from "$lib/components/AutoRitje.svelte";
	import Aftiteling from "$lib/components/Aftiteling.svelte";
	import Leeslijst from "$lib/components/Leeslijst.svelte";
	import NavigationPanel from "$lib/components/NavigationPanel.svelte";

	import { timeParse } from 'd3'

	import Scroller from "@sveltejs/svelte-scroller";
	import { onMount } from "svelte";
	import { started } from "$lib/stores.js";

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

	$: console.log(data.datatest)

	const stepNames = [
		"thuis",
		"ziekenhuis",
		"gesprek",
		"temperatuurstijging",
		"kansgrafiek",
		"wandeling",
		"krantenkoppen",
		"autoritje",
		"aftiteling",
		"leeslijst"
	];

	let index = 0;
	let offset;
	let progress;

	let navigationPanelHeight;

	$: currentStepName = stepNames[index];

	// $: if($started){
	// 	function scroll(){
	// 		setTimeout(() => {
	// 			window.scrollBy(0, 1)
	// 			scroll()
	// 		}, 7);
	// 	}
	// 	scroll()
	// }

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

<Titlepage {currentStepName} {offset}/>

{#if $started}
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

			<div class='navigation-panel' bind:clientHeight={navigationPanelHeight}>
				<NavigationPanel {stepNames} {currentStepName} height={navigationPanelHeight} {offset}/>
			</div>
			<img class='fixed-image' src='' style='opacity:0'/>

			{#each stepNames as stepName, i}
				{#if ['temperatuurstijging', 'kansgrafiek', 'unseen', 'aftiteling', 'leeslijst'].includes(stepName)}
					<section class='widestep step_{stepName}'>
						{#if stepName === 'temperatuurstijging'}
							<Scatter {maxTempData} {offset} {index} {stepName} {currentStepName}/>
						{:else if stepName === 'kansgrafiek'}
							<Kansgrafiek {middellijnData} {middellijnData2050} {offset} {index} {stepName} {confidenceData} {currentStepName}/>
						{:else if stepName === 'aftiteling'}
							<Aftiteling {offset} {index} {stepName} {currentStepName} />
						{:else if stepName === 'leeslijst'}
							<Leeslijst {offset} {index} {stepName} {currentStepName} />
						{/if}
					</section>
				{:else}
					<section class='step step_{stepName}'>
						{#if stepName === 'thuis'}
							<Introductie {offset} {index} {currentStepName} {stepName} />
						{:else if stepName === 'gesprek'}
							<Gesprek {offset} {index} {currentStepName} {stepName} />
						{:else if stepName === 'ziekenhuis'}
							<Ziekenhuis {offset} {index} {currentStepName} {stepName} />
						{:else if stepName === 'wandeling'}
							<Wandeling {offset} {index} {currentStepName} {stepName} />
						{:else if stepName === 'krantenkoppen'}
							<Krantenkoppen {offset} {index} {currentStepName} {stepName} />
						{:else if stepName === 'autoritje'}
							<AutoRitje {offset} {index} {stepName} {currentStepName} />
						{/if}
					</section>
				{/if}
			{/each}
		</div>
	</Scroller>
{/if}


<style>
	.cloud{
		position: fixed;
		z-index: 1000;
		top:300px;
		filter: contrast(0) sepia(100%) hue-rotate(116deg) brightness(1.3) saturate(0.28) grayscale(100%) opacity(60%);
	}

	.info {
		padding: 0.5em;
		position: fixed;
		top: 0;
		left: 0;
		color: black !important;
		z-index: 1000;
	}

	.navigation-panel{
		position: fixed;
		z-index: 20000;
		right:0px;
		width:200px;
		height:60%;
		top:20%;
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

	.step_gesprek{
    height:1000px !important;
  }

  .step_autoritje{
	height:7000px !important;
  }

  .step_leeslijst{
	margin-top: 1em !important;
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

</style>
