<script>
  export let scenes;
  export let stepSize;
</script>

{#each scenes as scene,i}
  <div class='scroll-text-block' style='top:{`${(scene['time']+0.1)*stepSize}px`}'>
    <p class='scroll-text'>{@html scene['text']}</p>
  </div>
{/each}