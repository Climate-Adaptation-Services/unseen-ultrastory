<script>
  /**
   * ScrollScene — Reusable GSAP ScrollTrigger section wrapper
   *
   * Design intent:
   *   Coexists with @sveltejs/svelte-scroller. The scroller owns narrative paging
   *   (index/offset/audio/map). ScrollScene owns element-level GSAP animations
   *   within or around those sections.
   *
   * Usage:
   *   <ScrollScene id="temperatuurstijging" height={5000} pin>
   *     <StickyContent slot="sticky" let:progress />
   *     <ScrollContent />
   *   </ScrollScene>
   *
   * Props:
   *   id       — mirrors stepNames from +page.svelte for targeting
   *   height   — total scrollable height of the section (px)
   *   pin      — whether to pin (sticky) the inner content while scrolling
   *   scrub    — GSAP scrub: true = 1s lag, number = custom lag, false = snappy
   *   start    — ScrollTrigger start position string (default "top top")
   *   debug    — show ScrollTrigger markers (dev only)
   *
   * Events:
   *   on:enter, on:leave, on:enterBack, on:leaveBack
   *   on:update  → { progress: 0–1 }
   */

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';

  export let id = '';
  export let height = 3000;
  export let pin = false;
  export let scrub = 1;
  export let start = 'top top';
  export let debug = false;

  const dispatch = createEventDispatcher();

  let el;
  let ctx = null;

  onMount(async () => {
    if (!browser) return;

    // Dynamic import: keeps GSAP out of the SSR bundle entirely
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start,
        // end is the total scrollable distance past the trigger start
        end: `+=${height}`,
        pin,
        // scrub: ties animation to scroll position. Number = seconds of lag.
        scrub: typeof scrub === 'boolean' ? (scrub ? 1 : false) : scrub,
        markers: debug,
        onEnter: () => dispatch('enter'),
        onLeave: () => dispatch('leave'),
        onEnterBack: () => dispatch('enterBack'),
        onLeaveBack: () => dispatch('leaveBack'),
        // progress (0–1) available for consumers to drive their own animations
        onUpdate: (self) => dispatch('update', { progress: self.progress }),
      });
    }, el);
  });

  onDestroy(() => {
    // Cleans up all ScrollTriggers and tweens created in this context
    ctx?.revert();
  });
</script>

<section {id} bind:this={el} class="scroll-scene" style="--scene-height: {height}px">
  <slot />
</section>

<style>
  .scroll-scene {
    position: relative;
    height: var(--scene-height);
  }
</style>
