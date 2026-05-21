<script>
  /**
   * Krantenkoppen — Breaking news headlines, GSAP-animated
   *
   * Narrative: Niels & Leonie get home from their night walk and check their
   * phone. News headlines about the heatwave appear one by one as the user
   * scrolls. Each headline enters from the right with a GSAP fromTo animation,
   * creating the feeling of notifications arriving in real time.
   *
   * Animation strategy:
   *   • All headlines start hidden (set by GSAP on mount: opacity 0, x 18)
   *   • `afterUpdate` fires after every Svelte re-render (= every offset change)
   *   • When a threshold is crossed, GSAP animates that headline in
   *   • `_shownCount` is a plain variable (not reactive) — prevents loops
   *   • Leaving the section resets _shownCount so headlines replay on re-entry
   */

  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  import { sound } from '$lib/stores.js';

  export let offset;
  export let index;
  export let stepName;
  export let currentStepName;

  // Each headline appears when `offset` crosses its threshold (0–1)
  const HEADLINES = [
    {
      threshold: 0.08,
      time: '08:24',
      label: 'Weerbericht',
      text: 'Recordhitte treft Brabant: kwik stijgt tot 43 graden in Eindhoven',
    },
    {
      threshold: 0.22,
      time: '10:11',
      label: 'Gezondheid',
      text: 'RIVM: significante stijging hittegerelateerde sterfgevallen verwacht',
    },
    {
      threshold: 0.38,
      time: '11:47',
      label: 'Actueel',
      text: 'Spoedeisende hulp overbelast — ambulances uren in file op de A2',
    },
    {
      threshold: 0.54,
      time: '13:02',
      label: 'Klimaat',
      text: '"Dit is het nieuwe normaal" — klimatologen waarschuwen voor structurele hittezomers',
    },
    {
      threshold: 0.70,
      time: '14:55',
      label: 'Politiek',
      text: 'Minister erkent: Nederland onvoldoende voorbereid op extreme hittegolven',
    },
  ];

  let gsapRef = null;
  // Plain (non-reactive) variable — writing to it won't re-trigger $: blocks
  let _shownCount = 0;
  let _sectionActive = false;

  onMount(async () => {
    if (!browser) return;
    const { gsap } = await import('gsap');
    gsapRef = gsap;

    // Set initial hidden state on all headlines before first paint
    const els = document.querySelectorAll('.headline-item');
    gsap.set(els, { opacity: 0, x: 18, y: 4 });
  });

  afterUpdate(() => {
    if (!gsapRef || !browser) return;

    // ── Entering or active in this section ────────────────────────────────
    if (stepName === currentStepName) {
      _sectionActive = true;

      // How many headlines should be visible at this offset?
      const newCount = HEADLINES.filter(h => offset >= h.threshold).length;

      if (newCount > _shownCount) {
        // Animate each newly revealed headline
        for (let i = _shownCount; i < newCount; i++) {
          const el = document.querySelector(`[data-headline-idx="${i}"]`);
          if (el) {
            gsapRef.fromTo(
              el,
              { opacity: 0, x: 18, y: 4 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.55,
                ease: 'power3.out',
                // Slight delay between consecutive headlines that appear at once
                delay: (i - _shownCount) * 0.08,
              }
            );
          }
        }
        _shownCount = newCount;
      }
    }

    // ── Leaving the section ───────────────────────────────────────────────
    if (stepName !== currentStepName && _sectionActive) {
      _sectionActive = false;
      _shownCount = 0;

      // Reset headlines so they can animate in again on re-entry
      const els = document.querySelectorAll('.headline-item');
      gsapRef.set(els, { opacity: 0, x: 18, y: 4 });
    }
  });
</script>

<!-- Night ambience — same as original -->
{#if $sound && stepName === currentStepName}
  <audio src="sounds/night.mp3" autoplay loop />
{/if}

<div class="scene">
  <div class="sticky-div">
    <div class="layout">

      <!-- Left column: phone mockup (same image as original) -->
      <div class="phone-col">
        <div class="phone-frame">
          <img
            class="phone-img"
            src="/images/holdingphone.png"
            alt="Persoon houdt telefoon vast"
          />
        </div>
      </div>

      <!-- Right column: news feed -->
      <div class="news-col">
        <div class="news-header">
          <span class="news-label">Nieuws</span>
          <span class="news-dot" aria-hidden="true" />
          <span class="news-live">LIVE</span>
        </div>

        {#each HEADLINES as h, i}
          <!--
            data-headline-idx is used by GSAP to target specific items.
            Initial hidden state is set in onMount — no inline style needed.
          -->
          <article class="headline-item" data-headline-idx={i}>
            <div class="headline-meta">
              <time class="headline-time">{h.time}</time>
              <span class="headline-category">{h.label}</span>
            </div>
            <p class="headline-text">{h.text}</p>
            <div class="headline-divider" aria-hidden="true" />
          </article>
        {/each}
      </div>

    </div>
  </div>
</div>

<style>
  .scene {
    height: 100%;
    position: relative;
  }

  /* ── Sticky viewport ───────────────────────────────────────────────────── */
  /* Reuses the global .sticky-div class (position:sticky, height:100vh) */

  .layout {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5vw;
    padding: 0 4vw;
  }

  /* ── Phone column ─────────────────────────────────────────────────────── */
  .phone-col {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .phone-frame {
    position: relative;
    /* Subtle warm glow around the phone — matches night/heat atmosphere */
    filter: drop-shadow(0 0 40px rgba(200, 80, 20, 0.18));
  }

  .phone-img {
    height: 62vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    display: block;
  }

  /* ── News feed column ─────────────────────────────────────────────────── */
  .news-col {
    flex: 0 1 380px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .news-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .news-label {
    font-family: Belanosima, sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(240, 210, 180, 0.5);
  }

  /* Pulsing live indicator dot */
  .news-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e05a2b;
    animation: livePulse 2s ease-in-out infinite;
  }

  .news-live {
    font-family: Belanosima, sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: #e05a2b;
  }

  /* ── Headline item ────────────────────────────────────────────────────── */
  .headline-item {
    /* Initial hidden state is set by GSAP in onMount */
    padding: 1rem 0;
  }

  .headline-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.4rem;
  }

  .headline-time {
    font-family: Belanosima, sans-serif;
    font-size: 0.65rem;
    color: rgba(240, 210, 180, 0.4);
    letter-spacing: 0.05em;
    font-variant-numeric: tabular-nums;
  }

  .headline-category {
    font-family: Belanosima, sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(200, 110, 50, 0.75);
    background: rgba(200, 80, 20, 0.12);
    padding: 0.15em 0.55em;
    border: 1px solid rgba(200, 80, 20, 0.25);
  }

  .headline-text {
    font-family: Chunk, Belanosima, sans-serif;
    font-size: clamp(0.85rem, 1.6vw, 1.05rem);
    line-height: 1.4;
    color: rgba(240, 225, 210, 0.9);
    margin: 0;
    text-align: left;
    /* Subtle text shadow — legibility against the map background */
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }

  .headline-divider {
    margin-top: 1rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(200, 80, 20, 0.3) 0%,
      rgba(255, 255, 255, 0.08) 60%,
      transparent 100%
    );
  }

  /* ── Animations ───────────────────────────────────────────────────────── */
  @keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.8); }
  }

  /* ── Mobile ───────────────────────────────────────────────────────────── */
  @media (max-width: 600px) {
    .layout {
      flex-direction: column;
      align-items: center;
      gap: 2vh;
      padding: 2vh 4vw 0;
    }

    .phone-img {
      height: 30vh;
    }

    .news-col {
      flex: 1;
      width: 92vw;
    }

    .headline-text {
      font-size: 0.82rem;
    }
  }
</style>
