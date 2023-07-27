<script>
  import { showImages } from "$lib/noncomponents/fadeOutIn";
  import { afterUpdate, onMount } from "svelte";
  import TextAndImagesScenes from "./TextAndImagesScenes.svelte";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
	import { sound } from "$lib/stores.js";

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  let stepSize;
  onMount(() => {
    stepSize = getStepSize(stepName);
  })

</script>

<div class='stepdiv'>  
  <div class='telefoon' style='top:{`${0.08*stepSize}px`}'>
    <img class='telefoonimg' style='width:100%;' src={'/images/holdingphone.png'} />
  </div>

</div>

{#if $sound && stepName === currentStepName}
  <audio src="sounds/night.mp3" autoplay loop /> 
{/if}

<style>

  .stepdiv{
    height:100%;
  }

  .item .image:after {
  width: calc(100% + 150px);
  height: 100px;
  content: '';
  position: absolute;
  bottom: -125px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: rgba(0,0,0,0.2);
  filter: blur(20px);
}

.telefoon{
  position:absolute;
  width:80%;
  left:10%;
  border: none;
  box-shadow: 0 0 5px 10px rgba(0, 0, 0, 0.7);
  border-radius: 8px;


}
  
</style>


