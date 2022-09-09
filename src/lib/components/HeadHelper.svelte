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

  twitter={{
    handle: '@futureshirts',
    site: '@futureshirts',
    title: seo && seo.title  ? seo.title : $seoStore && $seoStore.title ? $seoStore.title : 'Futureshirts',
    description: seo && seo.description ? seo.description : $seoStore && $seoStore.description ? $seoStore.description : undefined,
    image: seo && seo.image ?  urlFor(seo.image).width(1200).height(900).url() : $seoStore && $seoStore.image ? urlFor($seoStore.image).width(1200).height(900).url() : undefined,
    imageAlt: 'Futureshirts'
  }}
/>
{/if}