<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  let onScreen:boolean = false;
  export let  image: SanityImageObject | undefined = undefined;
</script>
<section use:isOnScreen class:offscreen={!onScreen} on:onscreen={(e)=>{ onScreen = true; stopWatching(e.target); }} class:image-hero={image != undefined}>
  {#if image}
  <div class="bg">
    <Image lazy={false} {image} bg />
  </div>
  {/if}
  <div class="content">
    <slot/>
  </div>
</section>

<style lang="scss">
  @use "../styles/abstracts" as *;
  section {
    --font-extra-line-height: 1;
      padding: clamp(100px, calc(50px + 10vh), 300px) 0  0;

    &.image-hero {
      --color-background: var(--color-base-text);
      --color-foreground: var(--color-base-background);
      background: rgb(var(--color-background));
      position: relative;
      padding: clamp(150px, calc(120px + 6vh), 250px) 0  clamp(100px, calc(90px + 6vh), 170px);
      display: flex;
      align-items: center;
      min-height: 66vmin;

    }
  }

  .content {
    @include content-wrap;
    @include animateInBasic;
    max-width: var(--text-width);
    margin: auto;

    width: 100%;
    text-align: center;
    position: relative;
    z-index: 2;
    color: rgb(var(--color-foreground));
  }
  .bg {
    opacity: 0.35;
    @include psuedo;
  }
</style>