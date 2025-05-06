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

  // import { MetaTags } from 'svelte-meta-tags';
  import { urlFor } from "$lib/sanity";
  import { hasJobs, navOpen, socials as socialStore, seo as seoStore, contact as contactStore, support as supportStore} from "$lib/stores";

  import Header from "$lib/sections/Header.svelte";
  import SkipButton from "$lib/components/SkipButton.svelte";
  import Footer from "$lib/sections/Footer.svelte";
  import { browser } from "$app/environment";
  import {  onMount } from "svelte";

  import throttle from "$lib/throttle";
  import {afterNavigate, beforeNavigate} from "$app/navigation";
  import { onDestroy } from "svelte";
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import type {SiteSettings} from "$lib/types/sanity";

  beforeNavigate(()=> {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
  })
  afterNavigate(()=> {
    document.documentElement.style.removeProperty('scroll-behavior');
    document.body.style.removeProperty('scroll-behavior');
  })


  function setGlobalStores() {
    const activeJobs = data.jobs.openings ? data.jobs.openings.filter(opening=> opening.active == true): false;

    hasJobs.set(activeJobs && activeJobs.length > 0);
    socialStore.set(data.socials.socials);
    seoStore.set(data.seo);
    contactStore.set(data.contact);
    supportStore.set(data.support);
  }

  onMount(async ()=> {
    if (browser && window) {
      await import("@evankford/video-background");

      getVh();
      window.addEventListener('resize', throttledVh, {passive: true});
    }
    setGlobalStores();
    // fonts
    const WebfontModule = await import('webfontloader');
    if (WebfontModule){
      const WebFont = WebfontModule.default;
      WebFont.load({
        typekit: {
          id: 'fqx6xtc',
        }
      });
    }
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

  <script type="application/ld+json">
    {
      "url":"https://futureshirts.co",
      "name":"Futureshirts",
      "description":"{ data.seo.description }",
      "@context":"http://schema.org",
      "@type":"WebSite"
    }
  </script>

</svelte:head>

<HeadHelper seo={data.seo}/>
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
