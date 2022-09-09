<script lang="ts">


  // export let data;
  ///Okay, doing some hover type things here
  import { navigating } from "$app/stores";
  import "$lib/styles/global.scss";
  navigating.subscribe(val=> {
    if (val) {
      navOpen.set(false);
    }
  })

  import { MetaTags } from 'svelte-meta-tags';
  import { urlFor } from "$lib/sanity";
  import { hasJobs, navOpen, socials as socialStore, seo as seoStore, contact as contactStore, support as supportStore} from "$lib/stores";

  import Header from "$lib/sections/Header.svelte";
  import SkipButton from "$lib/components/SkipButton.svelte";
  import Footer from "$lib/sections/Footer.svelte";
  import { browser } from "$app/environment";
  import {  onMount } from "svelte";

  import throttle from "$lib/throttle";
  import {afterNavigate,
  beforeNavigate} from "$app/navigation";
import { onDestroy } from "svelte";

  beforeNavigate(()=> {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
  })
  afterNavigate(()=> {
    document.documentElement.style.removeProperty('scroll-behavior');
    document.body.style.removeProperty('scroll-behavior');
  })


  function setGlobalStores() {
    hasJobs.set(data.jobs.openings && data.jobs.openings.length > 0);
    socialStore.set(data.socials.socials);
    seoStore.set(data.seo);
    contactStore.set(data.contact);
    supportStore.set(data.support);
  }

  onMount(()=> {
    if (browser && window) {

      getVh();
      window.addEventListener('resize', throttledVh, {passive: true});
    }
    setGlobalStores();
  });
  onDestroy(()=>{
    if (browser && window) {
      window.removeEventListener('resize', throttledVh)
    }
  })

  const throttledVh = throttle(getVh, 300);

  function getVh() {
    if (browser && window) {
      vh = document.documentElement.clientHeight / 100;
    }
  }


  let vh:number | false = false;
  export let data:SiteSettings;

</script>

<svelte:head>
  {#if data.seo.favicon}
      <link rel="icon" type="image/png" href="{urlFor(data.seo.favicon).width(32).height(32).url()}" />
  {/if}
  {#if data.codes?.headerCode?.length}
  <!-- Header Code Inserts -->
    {#each data.codes.headerCode as codeSnippet}
      {#if codeSnippet.active}
        {@html codeSnippet.code.code}
      {/if}
    {/each}
  {/if}


</svelte:head>

<MetaTags
  title={data.seo ? data.seo.title : 'Futureshirts'}
  noindex={data.seo ? data.seo.nofollow : false}
  nofollow={data.seo ? data.seo.nofollow : false}
  description={data.seo ? data.seo.description : undefined}
  twitter={{
    handle: '@futureshirts',
    site: '@futureshirts',
    title:data.seo ? data.seo.title : 'Futureshirts',
    description: data.seo ? data.seo.description : undefined,
    image: data.seo && data.seo.image ?  urlFor(data.seo.image).width(1200).height(900).url() : undefined,
    imageAlt: 'Futureshirts'
  }}
/>

<SkipButton />

<Header {...data.header} smallMenuItems={data.footer?.menuItems}/>
<main id="MainContent"  style="{vh ? `--vh: ${vh}px;` : ''}">
<slot></slot>
</main>
<Footer {...data.footer} />

{#if data.codes?.footerCode?.length}
<!-- Footer Code inserts -->
  {#each data.codes.footerCode as codeSnippet}
    {#if codeSnippet.active}
      {@html codeSnippet.code.code}
    {/if}
  {/each}
{/if}
