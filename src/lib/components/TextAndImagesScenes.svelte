<script>
  export let scenes;
  export let stepSize;

  export let imageOffset = 0.1;
</script>

{#each scenes as scene,i}
  <div class='scroll-text-block' style='top:{`${(scene['time']+imageOffset)*stepSize}px`}'>
    <p class={scene['class']}>{@html scene['text']}</p>
  </div>
{/each}