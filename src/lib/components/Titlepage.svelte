<script>
  import { started } from "$lib/stores";
  import { clamp } from "$lib/noncomponents/helperFunctions";
  import { browser } from "$app/environment";

  export let currentStepName;
  export let offset

  $: cricketvolume = clamp(1 - Math.pow(offset, 1/4), 0, 1);

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='title {($started) ? "started" : ""}' on:click={() => document.getElementById('heat').play()}>
	
  {#if currentStepName === 'thuis' && browser && window.innerWidth > 600 && $started}
		<audio src="sounds/heat.mp3" autoplay loop id='heat' bind:volume={cricketvolume} /> 
	{/if}

  {#if $started}
    <div class='scrolldown'>
      <h4>Scroll naar beneden</h4>
      <img  width='7%' src={'/images/arrowdown.png'} />
    </div>
  {/if}
  <div style='{(!$started) ? "cursor:pointer" : "pointer-events:none"}' on:click={() => {started.set(true)}}>
    <h1 class='title-huge'>Ongekend heet</h1>
  </div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={() => document.getElementById('heat').play()}>
  {#if !$started}
    <div class="subtitle" style='cursor:pointer' on:click={() => {started.set(true)}}>
      <em><h3>KLIK OM TE STARTEN</h3>
      <h3>Dit beeldverhaal bevat geluid. Het verhaal komt het beste over als je een koptelefoon gebruikt.</h3></em>
      <img class='headphones' src='/images/headphones.png' width='60px'/>
    </div>
  {:else}
    <div class='introtekst'>
      <h1>Een klimaatverhaal over mogelijke exceptionele hitte in Nederland op basis van wetenschappelijke inzichten</h1>
    </div>
  {/if}
  
 </div>


<style>
	h1{
		margin-bottom:1.5em;
		font-size: 3.7vh;
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
  .started{
    animation: blurry-animation 7s infinite;
		-webkit-animation: blurry-animation 7s infinite;
		-moz-animation: blurry-animation 7s infinite;
	}

  .subtitle{
    position:absolute;
    top:60%;
    width:70%;
    left:15%;
  }

  .introtekst{
    position:absolute;
    width: 80%;
    left: 50%;
    top: 62%;
    transform: translate(-50%,0%);
  }

  .title-huge{
    font-size: 12vh;
    margin:100px;
    transform: translate(0%,-50%);
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
      opacity: 1;
      transform: scale(1);
    }
    50% {
      filter: blur(8px);
      opacity: 0.7  ;
      transform: scale(1.02);
    }
    100% {
      filter: blur(0);
      opacity: 1;
      transform: scale(1);
    }
  }

</style>