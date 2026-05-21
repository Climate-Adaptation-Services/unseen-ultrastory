<script>
  /**
   * HeatCanvas — Atmospheric canvas particle system
   *
   * Renders heat-shimmer particles directly on a 2D canvas:
   *   • Particles rise from the bottom, drift sideways, fade at top
   *   • Warm amber/orange palette, variable size and opacity
   *   • Automatically reduces particle count on mobile for performance
   *   • Device-pixel-ratio aware (crisp on retina, capped at 2× for perf)
   *   • Cleans up requestAnimationFrame on component destroy
   *
   * All drawing uses raw canvas 2D — no external dependencies.
   * Transform-only GPU composition is achieved by setting will-change: opacity
   * on the canvas element itself (the parent controls position/z-index).
   */

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let opacity = 1;
  export let maxParticles = 80;

  let canvas;
  let rafId;
  let resizeObserver;

  // Warm heat palette — RGB tuples, converted to rgba() strings per-draw
  const COLORS = [
    [255, 120, 20],  // deep orange
    [255, 160, 50],  // amber
    [255,  80, 10],  // hot red-orange
    [255, 190, 80],  // pale amber
    [220,  60,  0],  // brick red
    [255, 140, 30],  // mid orange
  ];

  function createParticle(w, h, born = false) {
    return {
      x: Math.random() * w,
      y: born ? h + Math.random() * 30 : Math.random() * h,
      size: 0.8 + Math.random() * 3.2,
      speed: 0.25 + Math.random() * 0.85,
      opacity: 0,
      maxOpacity: 0.04 + Math.random() * 0.22,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.007 + Math.random() * 0.018,
      wobbleAmplitude: 6 + Math.random() * 28,
      colorIndex: Math.floor(Math.random() * COLORS.length),
      // Newly born particles start at life=0; scattered ones get a random head start
      life: born ? 0 : Math.random(),
      lifeSpeed: 0.002 + Math.random() * 0.006,
    };
  }

  onMount(() => {
    if (!browser) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    // Reduce particle count on mobile to stay within GPU budget
    const count = isMobile ? Math.max(20, Math.floor(maxParticles * 0.35)) : maxParticles;

    let w = 0;
    let h = 0;

    /**
     * (Re)sizes the canvas to match its CSS layout size × device pixel ratio.
     * Called on mount and on every ResizeObserver callback.
     * Capped at 2× dpr — beyond that the gains are invisible on canvas paths.
     */
    function setSize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // Reset the transform after every resize — canvas.width= clears it
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setSize();

    // Initial particles: scattered across the full canvas for an immediate atmosphere
    let particles = Array.from({ length: count }, () =>
      createParticle(w, h, false)
    );

    resizeObserver = new ResizeObserver(() => {
      setSize();
      // Redistribute x positions so particles don't bunch at the old edges
      particles = particles.map((p) => ({ ...p, x: Math.random() * w }));
    });
    resizeObserver.observe(canvas);

    // ── Animation loop ────────────────────────────────────────────────────────
    function tick() {
      // clearRect is faster than fillRect for transparent backgrounds
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // ── Update ──────────────────────────────────────────────────────────
        p.y -= p.speed;
        p.wobble += p.wobbleSpeed;
        // Gentle horizontal drift via sin — creates the shimmer effect
        p.x += Math.sin(p.wobble) * 0.35;
        p.life += p.lifeSpeed;

        // Opacity envelope: sin(life × π) gives a smooth 0→peak→0 curve
        // Clamped to maxOpacity so particles have individual brightness caps
        p.opacity = Math.sin(Math.min(p.life, 1) * Math.PI) * p.maxOpacity;

        // Particle is dead when life completes or it escapes the top
        if (p.life >= 1 || p.y < -p.size * 2) {
          particles[i] = createParticle(w, h, true);
          continue;
        }

        // ── Draw ────────────────────────────────────────────────────────────
        const [r, g, b] = COLORS[p.colorIndex];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // toFixed(3) avoids creating new strings on every frame — minor GC win
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
  });
</script>

<!--
  aria-hidden: purely decorative; screen readers don't need to know about particles.
  The canvas sits behind all content via z-index on the parent.
-->
<canvas
  bind:this={canvas}
  class="heat-canvas"
  style:opacity
  aria-hidden="true"
/>

<style>
  .heat-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* Promote to its own compositor layer — prevents repaints from affecting siblings */
    will-change: opacity;
  }
</style>
