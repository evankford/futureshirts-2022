<script lang="ts">

  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import PageHero from "$lib/sections/PageHero.svelte";
  import Button from "$lib/components/Button.svelte";
  import { PortableText} from "@portabletext/svelte";
  import Counter from "$lib/components/Counter.svelte";
  let visible: boolean = false;

  export let data:PageData;

  // export let
  //   content: Block[] | undefined = undefined,
  //   title:string | undefined = undefined,
  //   subtitle: string | undefined = undefined,
  //   image: SanityImageObject | undefined = undefined,
  //   email: string,
  //   counters: null | CounterModel[];
</script>

<HeadHelper seo={data}  />

<PageHero image={data.image} >
  <heading class="page-heading">
    {#if data.title}
    <h1 class:long={data.title.length > 12}>{data.title}</h1>
    {/if}
    {#if data.subtitle}
    <h2 class="h3">{data.subtitle}</h2>
    {/if}
    {#if data.email}
    <h3 class="h3"><Button underline link="mailto:{data.email}">{data.email}</Button></h3>
    {/if}
    {#if data.counters}
    <div class="bottom">
      {#each data.counters as counter }
        <Counter small {...counter} />
      {/each}
    </div>
    {/if}
    </heading>
</PageHero>
<div class:hasImage={data.image} class="page-content" class:invisible={!visible} use:isOnScreen on:onscreen={(e)=>{visible = true; stopWatching(e.target); }}>
  <div class="inner">
    {#if data.content && data.content.length > 0}
    <PortableText value={data.content} components={{listItem: {normal: LiNormal}}} />
    {/if}
  </div>
</div>

<style lang="scss">
  @use "../../../lib/styles/abstracts" as *;

  .page-content {
    @include content-wrap;
    @include page-wrap;
    --field-color:rgb(var(--color-base-text));
    --field-border-color:rgba(var(--color-base-text), 0.5);
    &.hasImage {
        --page-margin-top: 0;

    }
  }

  .bottom {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    width:80%;
    margin: clamp(50px, calc(25px + 6vh), 100px) auto -90px;
    text-shadow: 0 0 40px rgba(0,0,0,0.5);
  }

  .inner {
    max-width: var(--text-width);
    margin: 45px auto;
  }

  .page-heading {
    --font-button-size: clamp(22px, calc(18px + 1vw), 30px);
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
