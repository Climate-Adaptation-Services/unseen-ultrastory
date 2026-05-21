<script>
  import { fadeOut } from "$lib/noncomponents/fadeOutIn";
  import { getStepSize } from "$lib/noncomponents/helperFunctions";
  import { onMount, onDestroy } from "svelte";
  import { sound } from "$lib/stores.js";
  import { browser } from "$app/environment";

  export let offset;
  export let index;
  export let currentStepName;
  export let stepName;

  let stepSize;
  let blocks = [];
  let ctx = null;

  $: if (currentStepName === stepName) {
    fadeOut();
  }

  onMount(async () => {
    stepSize = getStepSize(stepName);

    if (!browser) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      blocks.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              delay: i * 0.05,
              clearProps: 'transform',
            });
          },
        });
      });
    });
  });

  onDestroy(() => ctx?.revert());
</script>

{#if stepName === currentStepName && $sound}
  <audio src="sounds/night.mp3" autoplay loop />
{/if}

<div class="stepdiv">

  <div class="scroll-text-block night" style="top:{0.125 * stepSize}px" bind:this={blocks[0]}>
    <img class="nielsgaatwandelen night-image" src="/images/nielsgaatwandelen.png" alt="" />
    <p class="scroll-text nighttext">Als Sem eindelijk slaapt, besluit Niels een ommetje te maken. Het is buiten nog steeds heel heet. Hij merkt dat de stenen op straat veel warmte uitstralen.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound}
    <audio src="sounds/voetstappen.mp3" autoplay loop />
  {/if}

  {#if stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound}
    <audio src="sounds/crowd.mp3" autoplay loop />
  {/if}

  <div class="scroll-text-block night" style="top:{0.36 * stepSize}px" bind:this={blocks[1]}>
    <img class="festival night-image" src="/images/gasten.png" alt="" />
    <p class="scroll-text nighttext">Gelukkig voelt het Dommelplantsoen wat koeler aan. Het festival dat hier gepland stond is afgelast, maar toch is het heel druk in het park. Er wordt veel lawaai gemaakt en gedronken. Ondanks de herrie slapen sommige mensen buiten.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.4 && offset < 0.85 && $sound}
    <audio src="sounds/drunk.mp3" autoplay loop />
  {/if}

  <div class="scroll-text-block night" style="top:{0.63 * stepSize}px" bind:this={blocks[2]}>
    <img class="politie night-image" src="/images/politie.png" alt="" />
    <p class="scroll-text nighttext">Er is politie in de buurt om de situatie in de gaten te houden. De sfeer wordt onaangenaam. Niels loopt snel verder.</p>
  </div>

  {#if stepName === currentStepName && offset > 0.65 && offset < 0.85 && $sound}
    <audio src="sounds/politie.mp3" autoplay loop />
  {/if}

  <div class="scroll-text-block night" style="top:{0.87 * stepSize}px" bind:this={blocks[3]}>
    <img class="rustigplekje night-image" src="/images/nielsboom.png" alt="" />
    <p class="scroll-text nighttext">Verderop vindt Niels een rustige plek bij een boom. Hij moet denken aan het gesprek met Sem over de hitte en checkt het laatste nieuws op zijn telefoon.</p>
  </div>

</div>
