<script>
  import { started } from "$lib/stores";
  import { clamp } from "$lib/noncomponents/helperFunctions";

  export let currentStepName;
  export let offset

  $: cricketvolume = clamp(1 - Math.pow(offset, 1/4), 0, 1);

</script>

<div class='title {$started ? 'title-started' : ''}' on:click={() => document.getElementById('heat').play()}>
	{#if currentStepName === 'thuis' && window.innerWidth > 600}
		<audio src="sounds/heat.mp3" autoplay loop id='heat' bind:volume={cricketvolume} /> 
	{/if}
  {#if $started}
    
    <div>
      <h1>Ongekend heet</h1>
      <h3>Een klimaatverhaal over mogelijke exceptionele hitte in Nederland op basis van wetenschappelijke inzichten
      </h3>
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
		font-size: 5vh;
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
    animation: blurry-animation 7s;
		-webkit-animation: blurry-animation 7s;
		-moz-animation: blurry-animation 7s;
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
      opacity: 0.9;
      transform: scale(1);
    }
    50% {
      filter: blur(2px);
      opacity: 0.7  ;
      transform: scale(1.01);
    }
    100% {
      filter: blur(0);
      opacity: 0.9;
      transform: scale(1);
    }
  }

</style>