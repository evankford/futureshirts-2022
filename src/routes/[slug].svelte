<script lang="ts">
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import PageHero from "$lib/sections/PageHero.svelte";
  import { PortableText} from "@portabletext/svelte";
  let visible: boolean = false;
  export let
  content: Block[] | undefined = undefined,
  slug: string| undefined = undefined,
  title:string | undefined = undefined,
  subtitle: string | undefined = undefined,
  image: SanityImageObject | undefined = undefined,
  seo: PageSeo | undefined = undefined;


</script>

<HeadHelper {seo} {slug} />

<PageHero {image} >
  <heading class="page-heading">
    {#if title}
    <h1 class:long={title.length > 12}>{title}</h1>
    {/if}
    {#if subtitle}
    <h2 class="h3">{subtitle}</h2>
    {/if}
    </heading>
</PageHero>
<div class:hasImage={image} class="page-content" class:invisible={!visible} use:isOnScreen on:onscreen={(e)=>{visible = true; stopWatching(e.target); }}>

    {#if content && content.length > 0}
    <PortableText value={content} components={{listItem: {normal: LiNormal}}} />
    {/if}
</div>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;

  .page-content {
    @include content-wrap;
    @include page-wrap;

    &.hasImage {
        --page-margin-top: 0;

    }
  }

  .page-heading {
    text-align: center;
  }

  h1 {
    @include extra;
    font-size: var(--font-title-size);
    &.long {
      font-size: var(--font-title-long-size);
    }
  }
  h2 {
    @include mono;
    font-style: italic;
    font-size: var(--font-subtitle-size);
    text-transform: lowercase;
    letter-spacing: 0;
  }
</style>