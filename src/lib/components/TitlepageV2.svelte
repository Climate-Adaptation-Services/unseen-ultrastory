<script>
  /**
   * TitlepageV2 — Premium atmospheric landing section
   *
   * Drop-in replacement for Titlepage.svelte. Accepts the same props so
   * +page.svelte only needs a one-line import swap.
   *
   * Layers (back → front):
   *   1. HeatCanvas    — rising ambient particles (canvas, GPU layer)
   *   2. Base gradient — deep dark atmospheric background
   *   3. Vignette      — warm upward glow from the bottom (heat source feel)
   *   4. Top fade      — letterbox darkening at the top edge
   *   5. City silhouette — abstract SVG skyline at the horizon
   *   6. Content       — headline + subtitle + CTA (GSAP animated)
   *   7. Scroll hint   — animated bottom indicator
   *   8. Heat line     — glowing horizontal rule at the section boundary
   *
   * Scroll behaviour:
   *   The entire component fades out driven by `offset` from svelte-scroller.
   *   offset 0.0–0.2 = fully visible; 0.2–0.6 = fade out; 0.6+ = gone.
   *   Content also drifts upward slightly during this fade (parallax feel).
   *
   * Audio:
   *   Identical behaviour to the original — cricket ambience on desktop,
   *   volume curve fading with offset.
   */

  import { browser } from '$app/environment';
  import { started } from '$lib/stores';
  import { clamp } from '$lib/noncomponents/helperFunctions';
  import HeatCanvas from './HeatCanvas.svelte';
  import AnimatedHeadline from './AnimatedHeadline.svelte';

  export let offset = 0;
  export let currentStepName = '';

  // ── Derived reactive values ────────────────────────────────────────────────

  // Cricket volume: 1 at rest, fades to 0 as user scrolls — same curve as original
  $: cricketVolume = clamp(1 - Math.pow(offset || 0, 1 / 4), 0, 1);

  // Whole-component opacity: starts fading at 20% scroll, fully gone by 60%
  $: titleOpacity = clamp(1 - Math.max(0, (offset || 0) - 0.2) / 0.4, 0, 1);

  // Content parallax: drifts upward as section fades — max 50px upward travel
  $: contentY = (offset || 0) * -50;

  // Disable pointer events when invisible to allow interaction with content below
  $: pointerEvents = titleOpacity < 0.05 ? 'none' : 'auto';

  // ── Interaction ────────────────────────────────────────────────────────────

  function handleStart() {
    started.set(true);
    if (browser) {
      // Audio play must be initiated by a user gesture — catch policy rejections
      const audio = document.getElementById('heat-audio');
      audio?.play().catch(() => {});
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="titlepage"
  style:opacity={titleOpacity}
  style:pointer-events={pointerEvents}
  on:click={() => { if (!$started) handleStart(); }}
>

  <!-- ── Layer 1: Particle canvas ────────────────────────────────────────── -->
  <!--
    z-index: 1. Sits behind all overlays.
    opacity=0.65 so particles blend with the gradient rather than dominating.
  -->
  <HeatCanvas maxParticles={90} opacity={0.65} />

  <!-- ── Layer 2-4: Gradient overlays ───────────────────────────────────── -->
  <!-- Base: deep atmospheric dark with a warm brown bias at the bottom -->
  <div class="overlay overlay--base"      aria-hidden="true" />
  <!-- Vignette: warm radial glow rising from below the frame — the heat source -->
  <div class="overlay overlay--vignette"  aria-hidden="true" />
  <!-- Top: subtle letterbox darkening to frame the content -->
  <div class="overlay overlay--top"       aria-hidden="true" />

  <!-- ── Audio (desktop only, matching original behaviour) ──────────────── -->
  {#if currentStepName === 'thuis' && browser && window.innerWidth > 600}
    <audio
      src="sounds/heat.mp3"
      loop
      id="heat-audio"
      bind:volume={cricketVolume}
    />
  {/if}

  <!-- ── Layer 5: City silhouette ────────────────────────────────────────── -->
  <!--
    Abstract skyline anchored to the bottom of the viewport.
    Very low contrast — suggests urban geography without competing with content.
    The slight parallax (translateY driven by offset) makes it feel three-dimensional.
  -->
  <div
    class="city-wrap"
    style:transform="translateY({(offset || 0) * -20}px)"
    aria-hidden="true"
  >
    <svg
      class="city-svg"
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Each rect is a building. Heights and widths tuned for a credible skyline rhythm. -->
      <!-- Far background: low, blurred impression -->
      <rect x="0"    y="160" width="80"  height="60"  fill="#1a0a06" opacity="0.6"/>
      <rect x="75"   y="140" width="50"  height="80"  fill="#1a0a06" opacity="0.6"/>
      <rect x="120"  y="155" width="100" height="65"  fill="#1a0a06" opacity="0.6"/>
      <rect x="215"  y="130" width="40"  height="90"  fill="#1a0a06" opacity="0.6"/>
      <rect x="250"  y="150" width="70"  height="70"  fill="#1a0a06" opacity="0.6"/>
      <!-- Mid: more defined buildings -->
      <rect x="310"  y="100" width="55"  height="120" fill="#160806" opacity="0.75"/>
      <rect x="360"  y="120" width="90"  height="100" fill="#160806" opacity="0.75"/>
      <rect x="445"  y="85"  width="35"  height="135" fill="#160806" opacity="0.75"/>
      <rect x="475"  y="130" width="120" height="90"  fill="#160806" opacity="0.75"/>
      <rect x="590"  y="110" width="45"  height="110" fill="#160806" opacity="0.75"/>
      <!-- Foreground: tallest, most detailed -->
      <rect x="630"  y="60"  width="30"  height="160" fill="#120704" opacity="0.85"/>
      <!-- Antenna on the tall building -->
      <rect x="643"  y="40"  width="4"   height="22"  fill="#120704" opacity="0.85"/>
      <rect x="680"  y="90"  width="80"  height="130" fill="#120704" opacity="0.85"/>
      <rect x="755"  y="70"  width="50"  height="150" fill="#120704" opacity="0.85"/>
      <rect x="800"  y="110" width="110" height="110" fill="#120704" opacity="0.85"/>
      <rect x="905"  y="80"  width="40"  height="140" fill="#120704" opacity="0.85"/>
      <rect x="940"  y="100" width="75"  height="120" fill="#120704" opacity="0.85"/>
      <!-- Right side buildings -->
      <rect x="1010" y="130" width="100" height="90"  fill="#160806" opacity="0.75"/>
      <rect x="1105" y="105" width="55"  height="115" fill="#160806" opacity="0.75"/>
      <rect x="1155" y="140" width="80"  height="80"  fill="#160806" opacity="0.75"/>
      <rect x="1230" y="120" width="60"  height="100" fill="#1a0a06" opacity="0.6"/>
      <rect x="1285" y="150" width="90"  height="70"  fill="#1a0a06" opacity="0.6"/>
      <rect x="1370" y="135" width="70"  height="85"  fill="#1a0a06" opacity="0.6"/>
      <!-- Ground plane -->
      <rect x="0"    y="218" width="1440" height="4"  fill="#1a0a06" opacity="0.5"/>
    </svg>
  </div>

  <!-- ── Layer 6: Content ────────────────────────────────────────────────── -->
  <div
    class="content"
    style:transform="translateY({contentY}px)"
  >
    <!-- Eyebrow label — sets context before the main title hits -->
    <p class="eyebrow">Een klimaatscenario voor Nederland</p>

    <!-- Main headline: two AnimatedHeadline components staggered in sequence -->
    <div class="headline-wrap" role="heading" aria-level={1} aria-label="Ongekend Heet">
      <!--
        "ONGEKEND" reveals first (delay 0.5s), letters staggering left-to-right.
        "HEET" follows (delay 0.85s) and is styled in the warm accent colour.
        Both are aria-hidden; the role=heading above provides the accessible label.
      -->
      <AnimatedHeadline
        text="Ongekend"
        tag="div"
        delay={0.5}
        stagger={0.055}
        duration={0.85}
        ease="power4.out"
        class_="title-line"
        fromY={45}
      />
      <AnimatedHeadline
        text="Heet"
        tag="div"
        delay={0.85}
        stagger={0.07}
        duration={0.9}
        ease="power4.out"
        class_="title-line title-line--hot"
        fromY={45}
      />
    </div>

    <!-- Subtitle: CSS animation so it doesn't need GSAP loaded -->
    <p class="subtitle">
      Een verhaal over mogelijke exceptionele hitte in Nederland<br
      />op basis van wetenschappelijke inzichten
    </p>

    <!-- CTA / scroll hint — mutually exclusive depending on started state -->
    {#if !$started}
      <div class="cta">
        <button class="cta-btn" on:click|stopPropagation={handleStart}>
          Klik om te starten
        </button>
        <span class="headphones-hint">
          <img src="/images/headphones.png" width="30" alt="" />
          Beste beleving met koptelefoon
        </span>
      </div>
    {:else}
      <div class="scroll-hint" aria-live="polite">
        <span>Scroll naar beneden</span>
        <img src="/images/arrowdown.png" width="22" alt="" />
      </div>
    {/if}
  </div>

  <!-- ── Layer 7: Heat line ──────────────────────────────────────────────── -->
  <!--
    A glowing horizontal rule at the very bottom of the section.
    Suggests a horizon shimmering with heat. Pulses subtly.
  -->
  <div class="heat-line" aria-hidden="true" />

</div>

<style>
  /* ── Base container ──────────────────────────────────────────────────────── */
  .titlepage {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Stacking context — keeps overlays contained */
    isolation: isolate;
    /* Transition the scroll-driven opacity for smoother perceived fade */
    transition: opacity 0.1s linear;
  }

  /* ── Overlays ────────────────────────────────────────────────────────────── */
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  /* Deep dark base with warm undertone — the "night heat" atmosphere */
  .overlay--base {
    background: linear-gradient(
      185deg,
      #06020e 0%,
      #0e0508 55%,
      #180906 100%
    );
    opacity: 0.88;
    z-index: 2;
  }

  /* Warm radial glow erupting from below — simulates the city heat island */
  .overlay--vignette {
    background: radial-gradient(
      ellipse 130% 60% at 50% 108%,
      rgba(130, 35, 8, 0.6) 0%,
      rgba(90, 20, 4, 0.35) 40%,
      transparent 68%
    );
    z-index: 3;
  }

  /* Letterbox: darkens the top ~25% so the headline has a clean reading surface */
  .overlay--top {
    background: linear-gradient(
      180deg,
      rgba(3, 1, 8, 0.75) 0%,
      transparent 28%
    );
    z-index: 3;
  }

  /* ── City silhouette ─────────────────────────────────────────────────────── */
  .city-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    /* GPU-friendly parallax — transform only, no layout properties */
    will-change: transform;
    pointer-events: none;
  }

  .city-svg {
    display: block;
    width: 100%;
    height: auto;
    /* Mask the top edge of the silhouette so buildings fade into the scene */
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 30%);
  }

  /* ── Content ─────────────────────────────────────────────────────────────── */
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 5vw;
    /* Parallax driven by offset — GPU transform only */
    will-change: transform;
    /* Prevent content from overlapping the city silhouette */
    padding-bottom: 8vh;
  }

  /* ── Eyebrow ─────────────────────────────────────────────────────────────── */
  .eyebrow {
    font-family: Belanosima, sans-serif;
    font-size: clamp(0.65rem, 1.2vw, 0.85rem);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(220, 160, 100, 0.55);
    margin: 0 0 1.2rem;
    animation: fadeUp 0.6s ease both;
    animation-delay: 0.2s;
  }

  /* ── Headline ────────────────────────────────────────────────────────────── */
  .headline-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.6rem;
    /* Negative margin compensates for the padding-bottom inside each .word
       so the two words sit tightly stacked */
    gap: -0.05em;
  }

  /*
    Target the AnimatedHeadline wrapper via :global() because the class lives
    inside a child component's shadow DOM equivalent.
    All typography is here — AnimatedHeadline owns only animation.
  */
  :global(.title-line) {
    font-family: Belanosima, sans-serif;
    font-size: clamp(4.5rem, 13vw, 11rem);
    line-height: 0.88;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    color: #f0e6d8;
    /* Layered text shadow: warm glow + sharp drop for depth */
    text-shadow:
      0 0 100px rgba(200, 70, 15, 0.25),
      0 0 30px  rgba(160, 50, 10, 0.15),
      0 3px 6px rgba(0, 0, 0, 0.85);
    justify-content: center;
  }

  /* "HEET" — the second word, in the signature heat colour */
  :global(.title-line--hot) {
    color: #e06015;
    text-shadow:
      0 0 140px rgba(230, 100, 20, 0.55),
      0 0 50px  rgba(200, 70, 10, 0.45),
      0 0 15px  rgba(180, 60, 5, 0.3),
      0 3px 6px rgba(0, 0, 0, 0.9);
  }

  /* ── Subtitle ────────────────────────────────────────────────────────────── */
  .subtitle {
    font-family: Belanosima, sans-serif;
    font-size: clamp(0.8rem, 1.6vw, 1rem);
    line-height: 1.65;
    color: rgba(235, 215, 195, 0.55);
    max-width: 500px;
    margin: 0 auto 2.8rem;
    /* Animate in after the headline finishes */
    animation: fadeUp 0.7s ease both;
    animation-delay: 1.4s;
  }

  /* ── CTA ─────────────────────────────────────────────────────────────────── */
  .cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    animation: fadeUp 0.6s ease both;
    animation-delay: 1.8s;
  }

  .cta-btn {
    font-family: Belanosima, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(240, 220, 200, 0.85);
    background: transparent;
    border: 1px solid rgba(200, 90, 25, 0.45);
    padding: 0.8em 2.8em;
    cursor: pointer;
    /* Smooth hover — not too fast, not too slow */
    transition:
      border-color  0.35s ease,
      color         0.35s ease,
      background    0.35s ease,
      box-shadow    0.35s ease;
  }

  .cta-btn:hover,
  .cta-btn:focus-visible {
    border-color: rgba(220, 100, 30, 0.85);
    color: #fff;
    background: rgba(110, 28, 6, 0.28);
    box-shadow: 0 0 24px rgba(200, 70, 10, 0.2);
    outline: none;
  }

  .headphones-hint {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-family: Belanosima, sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    color: rgba(230, 200, 170, 0.35);
  }

  .headphones-hint img {
    filter: invert(1);
    opacity: 0.35;
  }

  /* ── Scroll hint (post-start) ────────────────────────────────────────────── */
  .scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.55rem;
    font-family: Belanosima, sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(235, 210, 185, 0.45);
    animation: flicker 3.5s ease-in-out infinite;
  }

  .scroll-hint img {
    filter: invert(1);
    opacity: 0.4;
    animation: arrowBounce 2.2s ease-in-out infinite;
  }

  /* ── Heat line ───────────────────────────────────────────────────────────── */
  .heat-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    z-index: 15;
    background: linear-gradient(
      90deg,
      transparent           0%,
      rgba(180, 65, 15, 0.5) 20%,
      rgba(230, 105, 25, 0.85) 50%,
      rgba(180, 65, 15, 0.5) 80%,
      transparent           100%
    );
    animation: heatPulse 4.5s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Keyframe animations ─────────────────────────────────────────────────── */

  /* Shared fade-up: used by eyebrow, subtitle, CTA */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* Scroll hint pulse — slow enough to be calm, not distracting */
  @keyframes flicker {
    0%, 100% { opacity: 0.45; }
    50%       { opacity: 0.15; }
  }

  /* Arrow indicator bounce */
  @keyframes arrowBounce {
    0%, 100% { transform: translateY(0);   }
    50%       { transform: translateY(7px); }
  }

  /* Heat line throb */
  @keyframes heatPulse {
    0%, 100% { opacity: 0.55; transform: scaleX(0.75); }
    50%       { opacity: 1;    transform: scaleX(1);    }
  }

  /* ── Mobile ──────────────────────────────────────────────────────────────── */
  @media (max-width: 600px) {
    :global(.title-line) {
      font-size: clamp(3.8rem, 20vw, 5.5rem);
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-size: 0.78rem;
      padding: 0 0.5rem;
      color: rgba(235, 215, 195, 0.5);
    }

    .eyebrow {
      font-size: 0.6rem;
    }

    /* Move CTA up so it clears the city silhouette on small screens */
    .content {
      padding-bottom: 14vh;
    }
  }
</style>
