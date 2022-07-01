<script lang="ts">
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import PageHero from "$lib/sections/PageHero.svelte";
import SupportForm from "$lib/sections/SupportForm.svelte";
  import { PortableText} from "@portabletext/svelte";
  let visible: boolean = false;
  export let
    content: Block[] | undefined = undefined,
    title:string | undefined = undefined,
    subtitle: string | undefined = undefined,
    image: SanityImageObject | undefined = undefined,
    successMessage: string,
    shops: ContactOption[],
    successTitle: string,
    errorMessage: string,
    email: string,
    errorTitle: string;
</script>

<HeadHelper slug="support"  />

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
  <div class="inner">
    {#if content && content.length > 0}
    <PortableText value={content} components={{listItem: {normal: LiNormal}}} />
    {/if}

  <SupportForm {email} {errorTitle} {errorMessage} {successTitle} {successMessage} {shops} />
  </div>
</div>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;

  .page-content {
    @include content-wrap;
    @include page-wrap;
    --field-color:rgb(var(--color-base-text));
    --field-border-color:rgba(var(--color-base-text), 0.5);
    &.hasImage {
        --page-margin-top: 0;

    }
  }
  .inner {
    max-width: var(--text-width);
    margin: 45px auto;
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