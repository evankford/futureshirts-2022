<script lang="ts">
  import Hero from "$lib/sections/Hero.svelte";
  import More from "$lib/sections/More.svelte";
  import Product from "$lib/sections/Product.svelte";
  import Tour from "$lib/sections/Tour.svelte";
  import Team from "$lib/sections/Team.svelte";
  import Connect from "$lib/sections/Connect.svelte";
  import Ecommerce from "$lib/sections/Ecommerce.svelte";
  import Licensing from "$lib/sections/Licensing.svelte";

  export let sections: SectionShape[];
</script>

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

