<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type {SanityImageObject} from "@sanity/image-url/lib/types/types";

  export let  hidden = false, logo:SanityImageObject, quote:string, quoteTitle:string | undefined, subtitle: string | undefined
</script>
{#if quote}
<div class="wrap" aria-hidden={hidden}>
  <div class="img">
    <Image blurUp={false} width={150} image={logo} />
  </div>

  <blockquote >
    <h4 class="quote">
      {quote}
    </h4>
    {#if quoteTitle || subtitle }
      <cite>{#if quoteTitle}<span class="quoteTitle">{quoteTitle}</span>{/if} {#if subtitle}<span class="subtitle">{subtitle}</span>{/if}</cite>
    {/if}
  </blockquote>
</div>
{/if}

<style lang="scss">
  @use "../styles/abstracts" as *;
  .wrap {

    @include media-query($medium-up) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &[aria-hidden="true"] {
      pointer-events: none;
      .img, h4, cite {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  }
  .img {
    transition: transform 300ms ease, opacity 300ms ease;
    flex: 1 1 50px;
    max-width: 90px;
    margin:0 20px 0 0 ;
    @include media-query($small) {
      display: none;
    }
  }
  blockquote {
    flex: 1 1 200px;


  }

  h4 {
    font-weight: normal;
    line-height: 1.1;
    font-size: 24px;
      @include media-query($small) {
      font-size: 20px;
    }
    // font-weight: 300;
    --webkit-font-smoothing: antialiased;
    margin-left: 12px;
    margin: 0.4em 0 0.2em;
    position: relative;
    transition: transform 300ms 50ms ease, opacity 300ms 50ms ease;

    &::before, &::after {

      font-family: georgia, serif;
      display: inline-block;
      line-height: 12px;
      font-size: 2em;
      color: rgb(var(--color-accent-darker));
      opacity: 0.1;
    }

    &::before
    {
      content: '“';
      margin: 0.3em 0.2em -0.9em -0.6em;
      vertical-align: top;
    }
    &::after {
      content: '”';
      margin: 0 -0.9em 0em 0.25em;
      vertical-align: bottom;
    }
  }

  cite {
    display: block;
    position: relative;
    transition: transform 300ms 100ms ease, opacity 300ms 100ms ease;

    @include mono;
    font-size: 16px;
    font-style: normal;
    letter-spacing: normal;
  }
  .quoteTitle {
    display: inline-block;
    line-height: 1.2;
  }
  .subtitle {
    line-height: 1.2;
    font-size: 0.8em;
    display: inline-block;
  }

</style>
