<script lang="ts">

  import Hero from "$lib/sections/Hero.svelte";
  import More from "$lib/sections/More.svelte";
  import Product from "$lib/sections/Product.svelte";
  import Tour from "$lib/sections/Tour.svelte";
  import Team from "$lib/sections/Team.svelte";
  import Connect from "$lib/sections/Connect.svelte";
  import Ecommerce from "$lib/sections/Ecommerce.svelte";
  import Licensing from "$lib/sections/Licensing.svelte";

  import { onMount } from "svelte";
  import {fade} from "svelte/transition";
  import { browser } from "$app/environment";
  import {  faChevronDown } from "@fortawesome/free-solid-svg-icons";
  import throttle from "$lib/throttle"
  import { onDestroy } from "svelte";
  import type {SiteSettings} from "$lib/types/sanity";
  import { default as Fa } from "svelte-fa";

  export let data: SiteSettings;
  let scrolled = false;

  const throttleChangeScroll = throttle( changeScroll, 30);
  function changeScroll() {
    if (!browser ) {
      return;
    }
    if ( window.scrollY < 50) {
      scrolled = false;
      return;
    }
    scrolled = true;
    window.removeEventListener('scroll', throttleChangeScroll);
    return;

  }

  onMount(()=> {
    if (browser) {
      window.addEventListener('scroll', throttleChangeScroll, {passive: true});
    }
  });
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', throttleChangeScroll);
    }
  })
</script>

<svelte:head>
  <title>Futureshirts | Making Merch Easy</title>
</svelte:head>
{#if !scrolled}
  <div transition:fade|local class="scroll-helper visible" aria-hidden="true" aria-label="Scroll For More">
    <Fa icon={faChevronDown} />
  </div>
  {/if}
{#each data.sections as section}
  {#if section.layout === 'hero'}
  <Hero {...section} />
  {:else if section.layout === 'more'}
  <More {...section} />
  {:else if section.layout === 'product'}
  <Product {...section}/>
  {:else if section.layout === 'tour'}
  <Tour {...section} />
{:else if section.layout === 'ecommerce'}
  <Ecommerce {...section} />
  {:else if section.layout === 'licensing'}
  <Licensing {...section} />
  {:else if section.layout === 'team'}
  <Team {...section } />
  {:else if section.layout === 'connect'}
  <Connect {...section}/>
  {/if}
{/each}


<style lang="scss">
  @use "../lib/styles/abstracts/mixins/type-elements" as t;
  .scroll-helper {
    position: fixed;
    z-index: 100;
    bottom: 5%;
    left: 50%;
    background: rgb(var(--color-accent));
    border-radius: 50px;
    color: white;
    --color-foreground: 255,255,255;
    height: 50px;
    line-height: 50px;
    width: 50px;
    opacity: 1;
    transition: opacity 300ms ease, transform 300ms ease;
    &[aria-hidden="true"] {
      opacity: 0;
      transform: translateY(200px);
      animation: slideOut 1s ease 1 forwards;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    text-align: center;
    @include t.label;
    animation: scrollIndicate 4s ease infinite alternate-reverse;
  }
  @keyframes scrollIndicate {
    0% {
      opacity: 0.5;
      transform: translate3d(-50%, -20px, 0);
    }
    50% {
      opacity: 1;
      transform: translateY(-50%, 0px, 0);
    }

    100% {
      opacity: 0.5;
      transform: translateY(-50%, -20px, 0);
    }
  }
  @keyframes slideOut {
    0% {
      opacity: 0.5;
      transform: translate3d(-50%,-20px,0);
    }

    100% {
      opacity: 0;
      transform: translateY(-50%, 240px, 0);
    }
  }
</style>
