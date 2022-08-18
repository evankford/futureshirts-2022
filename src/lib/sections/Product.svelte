<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";
  import { browser } from "$app/env";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import throttle from "$lib/throttle";



  function handleOnScreen() {
    if (!browser) {
      return;
    }
    sectionDims = section.getBoundingClientRect();

      window.addEventListener('scroll',throttleScroll, {passive: true});
      window.addEventListener('resize',throttleResize, {passive: true});
  }
  function handleOffScreen() {
    if (!browser) {
      return;
    }
    window.removeEventListener('scroll', throttleScroll);
    window.removeEventListener('resize', throttleResize);
  }
  let section:HTMLElement, scr: number = 0;

  let sectionDims: ReturnType<HTMLElement["getBoundingClientRect"]> ;
  let top: number = 0, bottom: number = 2000;

  function handleResize() {
    if (!section) {
      return;
    }
    sectionDims = section.getBoundingClientRect();
    top =  sectionDims.top + window.scrollY;
    bottom =  sectionDims.bottom + window.scrollY + window.innerHeight;
  }

  const throttleScroll = throttle( handleScroll, 40);
  const throttleResize = throttle( handleResize, 100);

  afterNavigate(()=> {
    handleResize();
  })

  onMount(() => {
    if (browser) {
      handleResize();
    }
  })

  function handleScroll() {
    scr = Math.max(Math.min(1, (window.scrollY + window.innerHeight - top )/ (bottom - top) ), 0);
  }

  export let title:string | null, subtitle: string| null, intro: string|null, box: Array<Block>, image:SanityImageObject, imageSmall:SanityImageObject, anchor: string, layout: string;

</script>
<section style="--scr: {scr}" bind:this={section} use:isOnScreen on:onscreen={handleOnScreen} on:offscreen={handleOffScreen} class={layout} id="{anchor}">
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
    <div class="heading-wrap">
      <SectionHeading {title} {subtitle} {intro}/>
    </div>
      <div class="boxWrap">
        <SectionBox {box} style="bordered" list/>
      </div>
  </div>

</section>

<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    overflow: hidden;
    padding: 120px 0;
    position: relative;
    min-height: clamp(500px, 90vh, 950px);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    display: flex;
    align-items: center;
    @include media-query($small) {
      /* padding :200px 0 50px; */
    }

    --color-background: 255,255,255;


    @include media-query($small) {
      --font-size-mega: 55px;
    }
    @include media-query($tiny) {
      --font-size-mega: 44px;
    }
    &::after {
      @include psuedo;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0), 100px, rgba(0,0,0,0) calc(100% - 100px), rgba(0,0,0,0.1) 100% )
    }
  }

  .bg {
    @include psuedoish;
    position: fixed;


    height: 100%;
    width: 100%;
    max-width: 1600px;;
    top: 0%;
    left: 50%;
    transform: translate3d(-50%, calc(0% - (10% * var(--scr, 0.5))), 0);
    display: block;

  }
  .bg-inner {
    @include psuedoish;
  }
  .boxWrap, .heading-wrap {
    max-width: 750px;
    margin: auto;

  }
  .heading-wrap {
    background: black;
    color: white;
    padding: 20px;
    margin-bottom: 2px;
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
  }

  .content {
    @include media-query($large-up) {
      --font-size-mega: 100px;
      margin-top: 80px;
    }
    --titleMargin: 0 auto 0.25em;
    --box-bg-color: rgb(var(--color-background));
    position: relative;
    z-index: 2;
    @include content-wrap;
    text-align: center;
    display: block;
    max-width: 940px;
    @include media-query($widescreen) {
      max-width: 1050px;
    }
  }
</style>