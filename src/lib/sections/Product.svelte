<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";

  export let title:string | null, subtitle: string| null, intro: string|null, box: Array<Block>, image:SanityImageObject, imageSmall:SanityImageObject, anchor: string, layout: string;

</script>
<section use:isOnScreen class={layout} id="{anchor}">
  <div class="rotate">
    <div class="bg">
    <div class="bg-inner" class:hide--small={imageSmall}>
      <Image {image} bg />
    </div>
    {#if imageSmall}
    <div class="hide--large-up rotate bg-inner">
      <Image image={imageSmall} bg />
    </div>
    {/if}
  </div>

  <div class="content">
      <SectionHeading {title} {subtitle} {intro}/>
      <div class="boxWrap">
        <SectionBox {box} style="boxed" list/>
      </div>
  </div>
</div>

</section>

<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    overflow: hidden;
    --color-background: 255,255,255;
    --depth: 100px;
    --rotateYMod:3.5deg;
    --rotateXMod:3.5deg;

    @include media-query($small) {
      --rotateXMod: 1deg;
      --rotateYMod: 1deg;
      --font-size-mega: 55px;
    }
    @include media-query($tiny) {
      --rotateXMod: 0.5deg;
      --rotateYMod: 0.5deg;
      --font-size-mega: 44px;
    }
  }

  .rotate {
     padding: 120px 0;
    position: relative;
    min-height: clamp(500px, 60vw, 950px);
    @include media-query($small) {
      padding :200px 0 50px;
    }

  }

  .bg {



    @include psuedoish;
    height: 110%;
    width: 110%;
    max-width: 1600px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, -150px);
    display: block;

  }
  .bg-inner {
    @include psuedoish;
  }
  .boxWrap {
    max-width: 750px;
    margin: auto;
  }

  .content {
    transform: translateZ(150px);
    @include media-query($large-up) {
      margin-top: 80px;
    }
    --titleMargin: 0 auto 0.25em;
    --box-bg-color: rgb(var(--color-background));
    position: relative;
    z-index: 2;
    --depth: 150px;
    @include content-wrap;
    text-align: center;
    display: block;
    max-width: 940px;
    @include media-query($widescreen) {
      max-width: 1050px;
    }
  }
</style>