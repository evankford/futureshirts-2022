<script context="module" lang="ts">
  /** @type {import('./__types/__layout.d.ts').Load} */
  export async function load({ fetch }) {
    const url = '/site.json';
    try {
      const res = await fetch(url);
      const data:SiteSettings = await res.json();

      return {
        status: res.status,
        props: {
          codes: data.codes,
          header: data.header,
          footer: data.footer,
          seo: data.seo,
          contact: data.contact,
          jobs: data.jobs,
          socials: data.socials,
          support: data.support
        },
      }
    } catch(e) {
      return {
        status: 500
      }
    }

  }
</script>

<script lang="ts">
  ///Okay, doing some hover type things here
  import { navigating } from "$app/stores";
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
  import {  onMount } from "svelte";

  function setGlobalStores() {
    console.log(support);
    hasJobs.set(jobs.openings && jobs.openings.length > 0);
    socialStore.set(socials.socials);
    seoStore.set(seo);
    contactStore.set(contact);
    supportStore.set(support);
  }

  onMount(()=> {
    setGlobalStores();
  });


  export let header: HeaderSettings, socials: SocialMediaSettings,  footer:FooterSettings, codes:CodeSnippetSettings, contact: ContactSettings, seo: SiteSEO, jobs: JobSettings, support: SimpleSupportSettings;

</script>

<svelte:head>
  {#if seo.favicon}
      <link rel="icon" type="image/png" href="{urlFor(seo.favicon).width(32).height(32).url()}" />
  {/if}
  {#if codes?.headerCode?.length}
  <!-- Header Code Inserts -->
    {#each codes.headerCode as codeSnippet}
      {#if codeSnippet.active}
        {@html codeSnippet.code.code}
      {/if}
    {/each}
  {/if}


</svelte:head>

<MetaTags
  title={seo ? seo.title : 'Futureshirts'}
  noindex={seo ? seo.nofollow : false}
  nofollow={seo ? seo.nofollow : false}
  description={seo ? seo.description : undefined}
  twitter={{
    handle: '@futureshirts',
    site: '@futureshirts',
    title:seo ? seo.title : 'Futureshirts',
    description: seo ? seo.description : undefined,
    image: seo && seo.image ?  urlFor(seo.image).width(1200).height(900).url() : undefined,
    imageAlt: 'Futureshirts'
  }}
/>

<SkipButton />

<Header {...header} smallMenuItems={footer?.menuItems}/>
<main id="MainContent">
<slot></slot>
</main>
<Footer {...footer} />

{#if codes?.footerCode?.length}
<!-- Footer Code inserts -->
  {#each codes.footerCode as codeSnippet}
    {#if codeSnippet.active}
      {@html codeSnippet.code.code}
    {/if}
  {/each}
{/if}

<style lang="scss" global>
  //Import global styles
  @use "../lib/styles/ress";
  @use "../lib/styles/app";
  @use "../lib/styles/devices";
</style>
