<script>
  /**
   * AnimatedHeadline — GSAP-powered staggered character reveal
   *
   * Technique: "mask reveal from below"
   *   Each word is wrapped in overflow:hidden. Letters start transformed 40px
   *   below (outside the clip) and slide up to their natural position.
   *   Combined with opacity, this creates the classic editorial text entrance.
   *
   * The component only handles animation — all typography (font, size, color,
   * weight) is controlled by the caller via CSS on the wrapper element or via
   * the class_ prop.
   *
   * Props:
   *   text      — the headline string (spaces become word breaks)
   *   tag       — wrapper element tag (div, h1, h2, p, etc.)
   *   delay     — seconds before the stagger starts
   *   stagger   — seconds between each letter
   *   duration  — per-letter animation duration (seconds)
   *   ease      — GSAP ease string
   *   class_    — extra CSS classes on the wrapper (class is reserved in Svelte)
   *   fromY     — starting Y offset in px (increase for more dramatic slide)
   */

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let text = '';
  export let tag = 'h1';
  export let delay = 0.3;
  export let stagger = 0.045;
  export let duration = 0.75;
  export let ease = 'power3.out';
  export let class_ = '';
  export let fromY = 40;

  $: words = text.split(' ').map((w) => [...w]);

  let container;
  let ctx = null;

  onMount(async () => {
    if (!browser) return;

    const { gsap } = await import('gsap');

    const letters = container.querySelectorAll('.char');

    ctx = gsap.context(() => {
      // Set initial state *before* first paint to avoid a flash of final state.
      // We set opacity:0 and y:fromY — both GPU-friendly properties.
      gsap.set(letters, { opacity: 0, y: fromY, skewX: 4 });

      // Stagger each letter from its starting state to natural position.
      // skewX adds a subtle lean that straightens during the reveal — mimics
      // the "ink spreading" feel common in editorial design.
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration,
        ease,
        stagger,
        delay,
        // Force a composited layer during the animation — avoids layout recalcs
        force3D: true,
      });
    }, container);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<!--
  svelte:element lets us render any tag dynamically (h1, h2, div, etc.)
  class_ is the caller-supplied extra class; "headline" is always present.
-->
<svelte:element this={tag} bind:this={container} class="headline {class_}">
  {#each words as word, wi}
    <!--
      .word clips overflow so letters below y=0 are invisible.
      padding-bottom prevents descenders (g, p, y) from being clipped at rest.
      aria-label restores the word as a single accessible unit since we broke
      it into individual letter spans.
    -->
    <span class="word" aria-label={word.join('')}>
      {#each word as char}
        <!-- aria-hidden: the parent span carries the accessible label -->
        <span class="char" aria-hidden="true">{char}</span>
      {/each}
    </span>
    <!-- Preserve inter-word spacing without animating the space itself -->
    {#if wi < words.length - 1}
      <span class="word-space" aria-hidden="true">&nbsp;</span>
    {/if}
  {/each}
</svelte:element>

<style>
  .headline {
    /* flex-wrap allows multi-word headlines to break onto new lines naturally */
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    /* Reset default heading margin — callers control spacing via the class_ prop */
    margin: 0;
  }

  .word {
    display: inline-flex;
    /* The clip that makes the slide-up reveal work:
       letters at y=fromY are below this box and invisible */
    overflow: hidden;
    /* Extra bottom padding prevents descenders from clipping at rest */
    padding-bottom: 0.12em;
    /* Ensure words don't collapse their height before animation runs */
    min-height: 1em;
  }

  .char {
    display: inline-block;
    /* GSAP sets will-change: transform automatically during the tween */
    /* No explicit will-change here — avoids promoting every letter upfront */
  }

  .word-space {
    /* Non-breaking space that preserves the gap between word containers */
    display: inline-block;
    /* Match the word's padding-bottom so spacing aligns correctly */
    padding-bottom: 0.12em;
  }
</style>
