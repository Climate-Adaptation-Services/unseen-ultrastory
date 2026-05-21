<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let scenes;
  export let stepSize;
  export let imageOffset = 0.1;

  let blocks = [];
  // Hold the GSAP context so we can revert all triggers on destroy
  let ctx = null;

  onMount(async () => {
    if (!browser) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      blocks.forEach((el, i) => {
        if (!el) return;

        // Start invisible — GSAP owns the initial state
        gsap.set(el, { opacity: 0, y: 22 });

        // Trigger when the block scrolls into view.
        // `once: true` means it only plays once — no reverse on scroll-up.
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              // Slight stagger between blocks that enter at the same time
              delay: i * 0.06,
              clearProps: 'transform',
            });
          },
        });
      });
    });
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

{#each scenes as scene, i}
  <div
    class="scroll-text-block"
    style="top:{(scene['time'] + imageOffset) * stepSize}px"
    bind:this={blocks[i]}
  >
    <p class={scene['class']}>{@html scene['text']}</p>
  </div>
{/each}
