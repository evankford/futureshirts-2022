<script lang="ts">
  import Hero from "$lib/sections/Hero.svelte";
  import More from "$lib/sections/More.svelte";
  import Product from "$lib/sections/Product.svelte";
  import Tour from "$lib/sections/Tour.svelte";
  import Team from "$lib/sections/Team.svelte";
  import Connect from "$lib/sections/Connect.svelte";
  import Ecommerce from "$lib/sections/Ecommerce.svelte";
  import Licensing from "$lib/sections/Licensing.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { browser } from "$app/env";
  import Fa from "svelte-fa";
  import {  faChevronDown } from "@fortawesome/pro-regular-svg-icons";


  export let sections: SectionShape[];
  let scrolled: boolean = false;

  function changeScroll() {
    if (window.scrollY < 50) {
      return;
    }
    scrolled = true;
    if (browser) {
      window.removeEventListener('scroll', changeScroll);
    }
  }

  onMount(()=> {
    if (browser) {
      window.addEventListener('scroll', changeScroll);
    }
  });

</script>
{#if !scrolled}
  <div transition:fade class="scroll-helper" aria-hidden="true"><Fa icon={faChevronDown} /> Scroll For More </div>
{/if}
{#each sections as section}
  {#if section.layout == 'hero'}
  <Hero {...section} />
   {:else if section.layout == 'more'}
  <More {...section} />
{:else if section.layout == 'product'}
  <Product {...section}/>
  {:else if section.layout == 'tour'}
  <Tour {...section} />
  {:else if section.layout == 'ecommerce'}
  <Ecommerce {...section} />
  {:else if section.layout == 'licensing'}
  <Licensing {...section} />
  {:else if section.layout == 'team'}
  <Team {...section } />
  {:else if section.layout == 'connect'}
  <Connect {...section}/>
  {/if}
{/each}


<style lang="scss">
  @use "../lib/styles/abstracts/mixins/type-elements" as t;
  .scroll-helper {
    position: fixed;
    z-index: 100;
    bottom: 5%;
    left: 0;
    width: 100%;
    color: white;
    --color-foreground: 255,255,255;
    text-shadow: 0 0 20px rgba(black, 0.85);
    text-align: center;
    @include t.label;
    animation: scrollIndicate 4s linear infinite;
  }
  @keyframes scrollIndicate {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    } 30% {
      opacity: 0.5;
      transform: translateY(-2px);
    }
    50% {
      opacity: 0.9;
      transform: translateY(0px);
    }
    70% {
      opacity: 0.5;
      transform: translateY(2px);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
</style>