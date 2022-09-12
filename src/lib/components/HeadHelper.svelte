<script lang="ts">
  import {seo as seoStore} from "$lib/stores";
  import { urlFor } from "$lib/sanity";
  import { MetaTags } from 'svelte-meta-tags';
  export let seo: PageSEO | SiteSEO | undefined = undefined;
</script>

{#if seo}
<MetaTags
  title={seo && seo.title ? seo.title : $seoStore && $seoStore.title ? $seoStore.title : 'Futureshirts'}
  noindex={seo ? seo.nofollow : $seoStore && $seoStore.nofollow ? $seoStore.nofollow : false}
  nofollow={seo ? seo.nofollow : $seoStore && $seoStore.nofollow ? $seoStore.nofollow : false}
  description={seo && seo.description ? seo.description : $seoStore && $seoStore.description ? $seoStore.description : undefined}

  openGraph={{
    type: 'website',
    site_name:"Futureshirts",
    title:seo && seo.title ? seo.title : $seoStore && $seoStore.title ? $seoStore.title : 'Futureshirts',
    description:seo && seo.description ? seo.description : $seoStore && $seoStore.description ? $seoStore.description : undefined,
    images:[ {
      url:  seo && seo.image ?  urlFor(seo.image).width(1200).height(900).url() : $seoStore && $seoStore.image ? urlFor($seoStore.image).width(1200).height(900).url() : undefined,
      width: 1200,
      height: 911,
  }]}}

  twitter={{
    handle: '@futureshirts',
    site: 'https://futureshirts.com',
    title: seo && seo.title  ? seo.title : $seoStore && $seoStore.title ? $seoStore.title : 'Futureshirts',
    description: seo && seo.description ? seo.description : $seoStore && $seoStore.description ? $seoStore.description : undefined,
    imageAlt: 'Futureshirts'
  }}

/>
{/if}