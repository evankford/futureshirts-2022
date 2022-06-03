<script lang="ts">
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import { PortableText} from "@portabletext/svelte";
  let visible: boolean = false;
  export let content: Block[] | undefined = undefined, slug: string| undefined = undefined, title:string | undefined = undefined, subtitle: string | undefined = undefined, seo: PageSeo | undefined = undefined;

</script>

<HeadHelper {seo} {slug} />
<div class="page-content" class:invisible={!visible} use:isOnScreen on:onscreen={(e)=>{visible = true; stopWatching(e.target); }}>
  <heading class="page-heading">
    {#if title}
    <h1 class:long={title.length > 12}>{title}</h1>
    {/if}
    {#if subtitle}
    <h2 class="h3">{subtitle}</h2>
    {/if}
    </heading>

    {#if content && content.length > 0}
    <PortableText value={content} />
    {/if}
</div>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;

  .page-content {
    @include content-wrap;
    margin: clamp(150px, calc(100px + 7vw), 240px) auto clamp(50px, calc(40px + 3vw), 100px);
    text-align: left;


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