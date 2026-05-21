<script>
  /**
   * SectionReveal — GSAP-powered scroll-triggered content reveal
   *
   * Wraps any content and animates it in when the element enters the viewport.
   * Uses GSAP ScrollTrigger so the animation is tied to actual scroll position.
   *
   * Unlike ScrollScene (which wraps whole sections), SectionReveal is designed
   * for individual blocks of content *within* a section — text blocks, chart
   * annotations, data callouts, etc.
   *
   * Props:
   *   from       — GSAP fromVars: initial state before reveal
   *   to         — GSAP toVars: animated-to state (default: opacity 1, y 0)
   *   threshold  — ScrollTrigger start: "top Xpx from bottom" (default 80px inside)
   *   once       — if true, animation plays only once (default true)
   *   delay      — GSAP animation delay in seconds
   *   stagger    — if content has multiple children, stagger them by this many seconds
   *
   * Usage:
   *   <SectionReveal from={{ opacity: 0, y: 30 }} delay={0.1}>
   *     <p>This text slides up when it enters the viewport.</p>
   *   </SectionReveal>
   *
   *   <SectionReveal stagger={0.08} from={{ opacity: 0, x: -20 }}>
   *     <div class="stat">…</div>
   *     <div class="stat">…</div>
   *     <div class="stat">…</div>
   *   </SectionReveal>
   */

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let from  = { opacity: 0, y: 28 };
  export let to    = { opacity: 1, y: 0 };
  export let threshold = 'top 88%';   // ScrollTrigger start string
  export let once  = true;            // whether to replay on re-entry
  export let delay = 0;
  export let duration = 0.65;
  export let ease  = 'power3.out';
  export let stagger = 0;             // seconds between child animations

  let wrapper;
  let ctx = null;

  onMount(async () => {
    if (!browser) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // If stagger > 0, animate direct children individually; otherwise animate the wrapper.
      const targets = stagger > 0
        ? wrapper.children
        : wrapper;

      gsap.set(targets, from);

      ScrollTrigger.create({
        trigger: wrapper,
        start: threshold,
        once,
        onEnter: () => {
          gsap.to(targets, {
            ...to,
            duration,
            ease,
            delay,
            stagger,
            // Clear GSAP's inline styles after animation so CSS takes over
            clearProps: 'all',
            overwrite: 'auto',
          });
        },
        onEnterBack: once ? undefined : () => {
          gsap.to(targets, { ...to, duration, ease, stagger });
        },
        onLeaveBack: once ? undefined : () => {
          gsap.to(targets, { ...from, duration: duration * 0.6, ease: 'power2.in', stagger });
        },
      });
    }, wrapper);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!--
  Role presentation: the wrapper div is invisible to screen readers.
  Content inside is fully accessible — this just controls the animation container.
-->
<div bind:this={wrapper} class="reveal-wrapper" role="presentation">
  <slot />
</div>

<style>
  .reveal-wrapper {
    /* No layout interference — let parent dictate display */
  }
</style>
