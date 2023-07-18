<script>
  import { started } from "$lib/stores";

  export let currentStepName;
  export let offset

  $: cricketvolume = Math.max(0, Math.min(1, 1 - offset*2.5));

</script>

<div class='title {$started ? 'title-started' : ''}' on:click={() => document.getElementById('heat').play()}>
	{#if currentStepName === 'thuis'}
		<audio src="sounds/heat.mp3" autoplay loop id='heat' bind:volume={cricketvolume} /> 
	{/if}

  {#if $started}
    <div>
      <h1>Ongekend heet</h1>
      <h3>Een verhaal over exceptionele hitte in Nederland</h3>
      <!-- <h3>In dit beeldverhaal volg je de consequenties van ongeziene hitte door de ogen van een jong gezin in Eindhoven</h3> -->
    </div>
    <div class = 'scrolldown'>
      <h4>Scroll naar beneden</h4>
      <img  width='7%' src={'/images/arrowdown.png'} />
    </div>
  {:else}
    <div style='cursor:pointer' on:click={() => {started.set(true)}}>
      <em><h3>KLIK OM TE STARTEN</h3><br/>
      <h3>Dit beeldverhaal bevat audio. Het is aanbevolen om een koptelefoon op te doen.</h3></em>
      <img class='headphones' src='/images/headphones.png' width='60px'/>
    </div>
  {/if}
</div>


<style>
	h1{
		margin-bottom:1.5em;
		font-size: 40px;
	}

  .headphones{
    filter:invert(1);
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

  .title-started{
    animation: blurry-animation 4s infinite alternate;
		-webkit-animation: blurry-animation 4s infinite alternate;
		-moz-animation: blurry-animation 4s infinite alternate;
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

  @keyframes blurry-animation {
    0% {
      filter: blur(0);
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      filter: blur(8px);
      opacity: 0.7  ;
      transform: scale(1.02);
    }
    100% {
      filter: blur(0);
      opacity: 0.8;
      transform: scale(1);
    }
  }

</style>