<script lang="ts">
  // export let data;
  ///Okay, doing some hover type things here
  import { navigating } from "$app/stores";
  import "$lib/styles/global.scss";

  // import { MetaTags } from 'svelte-meta-tags';
  import { urlFor } from "$lib/sanity";

  import { browser } from "$app/environment";
  import {  onMount, onDestroy } from "svelte";

  import throttle from "$lib/throttle";
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import type {SiteSettings} from "$lib/types/sanity";
  import SkipButton from "$lib/components/SkipButton.svelte";

  import 'vidstack/player/styles/default/theme.css';
  import 'vidstack/player';
  import 'vidstack/player/ui';

  onMount(async ()=> {
    if (browser && window) {

      getVh();
      window.addEventListener('resize', throttledVh, {passive: true});
    }
    // fonts
    const WebfontModule = await import('webfontloader');
    if (WebfontModule){
      const WebFont = WebfontModule.default;
      WebFont.load({
        typekit: {
          id: 'qie7wdg',
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
  import {pdfLoaded} from "$lib/stores";
  onMount(()=>{
    if (window.AdobeDC) {
      pdfLoaded.set(true);
      return
    }
    document.addEventListener("adobe_dc_view_sdk.ready", function() {
      console.log('Hello?')
      pdfLoaded.set(true);
    });
  })



  let vh:number | false = false;
  export let data:SiteSettings;

</script>


<svelte:head>
  <meta name="robots" content="noindex">
  <meta name="googlebot" content="noindex">
  <script defer src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>

  {#if data.seo?.favicon}
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

<main id="MainContent"  style="{vh ? `--vh: ${vh}px;` : ''}">
    <slot></slot>
</main>

{#if data.codes?.footerCode?.length}
<!-- Footer Code inserts -->
  {#each data.codes.footerCode as codeSnippet}
    {#if codeSnippet.active}
      {@html codeSnippet.code.code}
    {/if}
  {/each}
{/if}

<style lang="scss">
  @use '../../../lib/styles/abstracts' as *;

  main {
    position: relative;
    padding: 0 0px 60px;

    @media (min-width: 750px) {
      padding-inline: 30px;
    }
    --color-base-accent: 77,98,255;
    --color-base-accent-dull: 73,85,177;
    --color-base-accent-lighter: 156, 170,255;
    --color-base-accent-darker:26,41,150;
    --color-base-accent-darkest:13,20,75;
    --color-base-background: 9,16,24;
    --color-base-background-off: 22,33,51;
    --color-base-background-accent: 34,45,65;
    --color-base-border: 156,170,255;
    --color-base-text: 208,219,237;
    --color-base-text-off: 151,170,200;

    color: rgb(var(--color-base-text));
    background-color: rgb(var(--color-base-background));
    min-height: 100%;
    height: auto;
    &::before, &::after {
      @include psuedo();
      height: 100%;
    }
    &::before {
      background: linear-gradient(115deg, #242f43, #091018);
    }
    &::after {
      background-image: url('$lib/images/texture.png');
      background-size: 1000px auto;
      background-repeat: repeat;
    }


  }

</style>
