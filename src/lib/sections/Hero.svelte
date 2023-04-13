<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte';
  import { fly } from "svelte/transition";
  import { faCircle, faLeftLong, faRightLong  } from "@fortawesome/free-solid-svg-icons";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import  throttle  from "$lib/throttle";
  import type {Block, HeroImage} from "$lib/types/sections";


  let currentSlide = 0;
  let slideInterval: ReturnType<typeof setInterval>;
  function startSlideInterval() {
    slideInterval = setTimeout(nextSlide, 8000)
  }
  function nextSlide() {
    clearInterval(slideInterval);
    if (currentSlide + 1 < heroGallery.length) {
      currentSlide++
    } else {
      currentSlide = 0;
    }
    startSlideInterval();

  }
  let visible = false;
  function prevSlide() {
    clearInterval(slideInterval);
    if (currentSlide > 0 ) {
      currentSlide--
    } else {
      currentSlide = heroGallery.length - 1;
    }
    startSlideInterval();
  }

  function slideTo(num:number) {
    clearInterval(slideInterval);
    currentSlide = num;
    startSlideInterval();
  }

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
  let section:HTMLElement, scr = 0.5;

  let sectionDims: ReturnType<HTMLElement["getBoundingClientRect"]> ;
  let top = 0, bottom = 2000;

  function handleResize() {
    if (!section) {
      return;
    }
    sectionDims = section.getBoundingClientRect();
    top =  sectionDims.top + window.scrollY;
    bottom =  sectionDims.bottom + window.scrollY + window.innerHeight;

  }

  const throttleScroll = throttle(handleScroll, 20);
  const throttleResize = throttle( handleResize, 200);
  function handleScroll() {
    scr = Math.max(Math.min(1, (window.scrollY + window.innerHeight - top )/ (bottom - top) ), 0);
  }

  onDestroy(()=> {
    clearInterval(slideInterval);
     if (browser) {
      window.removeEventListener('load', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('DOMContentLoaded', handleResize)
    }
  })
  onMount(()=> {
    startSlideInterval()
     if (browser) {
      handleResize();
    }
  });


  let el:HTMLElement;
  export let title:string | null, subtitle: string| null, intro: string|null, box: Array<Block>, heroGallery: Array<HeroImage>, anchor:string;
</script>
<section  style="--scr: {scr}" bind:this={section} use:isOnScreen on:onscreen={handleOnScreen} on:offscreen={handleOffScreen} class="hero image-hero" id={anchor}>

    {#if heroGallery}
      <div class="bg">
        {#each heroGallery as galleryImage,i}
        <div class="slide" class:visible={i === currentSlide}>
          <Image lazy={false} isInSlide isCurrentSlide={i===currentSlide} image={galleryImage.image} bg />
        </div>
        {/each}
      </div>
    {/if}
    <div class="hero-content">
      <div class="left">
        {#if title.toLowerCase() === 'merch made easy'}
        <header bind:this={el} class="section-header" class:offscreen={!visible} use:isOnScreen on:onscreen={()=>{visible = true; stopWatching(el); }} >
          <h1 class="title"><span>Merch</span><span>Made</span><span>Easy</span></h1>
        </header>
        {:else}
          <SectionHeading {title} {subtitle} {intro} />
        {/if}
      </div>
      <div class="bottom">
      {#if heroGallery && heroGallery.length}
        <div class="who">
          {#each Array(heroGallery.length) as _, i}
            {#if i === currentSlide}
              <span in:fly|local={{duration:400, delay: 300, y: 20}} out:fly={{duration: 300, y:20}}>{heroGallery[i].title}</span>
            {/if}
          {/each}
        </div>
        {/if}
        <nav aria-label="Slide {currentSlide + 1} of {heroGallery.length} active.">
          <button on:click={prevSlide} aria-label="Previous Slide" aria-disabled={currentSlide === 0}>
            <Fa icon={faLeftLong}/>
          </button>
          {#each Array(heroGallery.length) as _, i}
            <button class="dot" class:active={i === currentSlide } on:click={()=> {slideTo(i)}}  aria-label="Go To Slide {i}">
              <Fa icon={faCircle }/>
            </button>
          {/each}
          <button on:click={nextSlide} aria-label="Next Slide" aria-disabled={currentSlide + 1 >= heroGallery.length}>
            <Fa icon={faRightLong}/>
          </button>
        </nav>
      </div>
      <div class="right">
        {#if box}
        <SectionBox {box} boxStyle="simple"/>
        {/if}
      </div>
    </div>
</section>

<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    --box-li-line-height : 1;
    position: relative;
    height: clamp(300px, calc(90 * var(--vh, 1vh)), 1000px);
    /* max-height: calc(78 * var(--vh, 1vh)); */
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: rgb(var(--color-foreground));
    padding: clamp(140px, 19vh, 320px) 0 clamp(20px, 6vh, 100px);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    @include media-query($small) {
      --vertical-rhythm: 2px;
      padding-bottom: 20px;
    }
    overflow: hidden;
    --color-foreground: var(--color-base-background);
    --color-background: var(--color-base-text);

    background: rgb(var(--color-background));

  }


  .bg,.hero-content,.left,.right {
    transform-style: preserve-3d;
  }

  .title {
    font-size: var(--font-size-mega);
    text-transform: lowercase;
    line-height: var(--titleLineHeight, 0.9);
    margin: var(--titleMargin, 0.07em 0 0.2em);

    @include media-query($small) {
      padding-left: 25px;
    }

    span {
      display: block;
      line-height: inherit;
      text-align: left;
      &:nth-child(2) {
        margin: -0.2em 0 -0.225em -0.394em;
      }
    }
  }

  .bg {
    @include psuedoish;
    position: fixed;
    //noinspection CssInvalidFunction
    transform: translate3d(0,calc(0% - 5% * var(--scr, 0.5)), 0);
    z-index: 0;
    height: 110%;
    width: 100%;
    left: 0;
    top: 0;
    &::after {
      @include psuedo;
      background: linear-gradient( to bottom,rgba(0,0,0,0.4), rgba(0,0,0,0) 28%, rgba(0,0,0,0) calc(60% - 200px),  rgba(0,20,30,0.3));
      z-index: 1;
    }
    &::before {
      @include psuedo;
      z-index: 1;
      display: none;
      mix-blend-mode: darken;
      background-color: rgb(157 160 171 / 50%);
      @supports (mix-blend-mode: darken){
        display: block;
      }
    }

  }

  .bottom {
    grid-area: nav;
    padding-left: 5px;
    width: 100%;
    // padding: 12px;
    // background: rgba(black, 0.2);
    margin: clamp(12px,  calc(20px + 2vh), 40px) 0 0;
    @include media-query($small) {
      opacity: 0.8;
      margin-top: 20px;
    }
  }
  button {
    font-size: 14px;
    padding: 2px;
    margin: 2px;
    transition: opacity 300ms ease, transform 300ms ease;
    opacity: 0.5;
    @include resetButton;
     &:hover, &:focus-visible {
      opacity: 0.8;
    }
  }

  .who {
    @include mono;
    min-width: 200px;
    position: relative;
    height: 1.4em;
    font-size: 14px;
    @include media-query($medium-up) {
      font-size: 16px;
    }
    span {
      position: absolute;
      top: 0;
      display: block;
      width: 100%;

    }
  }

  .dot {
    font-size: 10px;
    padding: 2px;
    transform-origin: 50% 50%;
    transform: scale(0.7);
    &.active {
      opacity: 1;
      transform: scale(1);
    }

  }
  .slide {
    @include psuedoish;
    transition: opacity 900ms ease;
    &:not(.visible) {
      opacity: 0;
    }

  }
  .hero-content {
    @include content-wrap;
    position: relative;
    z-index: 2;

    flex-wrap:wrap;
    text-align: left;
    justify-content: space-between;

    /// Grid
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    align-items: end;
    justify-items: start;
    grid-template-areas: "title" "content" "nav";

    @include media-query($medium-up) {
      grid-template-columns: 1fr auto;
      grid-template: auto / auto;
      grid-template-areas: "title content" "nav content";
    }
  }
  nav {
    margin: 5px auto 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .left {
    grid-area: title;
    flex: 1 1 300px;
    max-width: min(60vw, 570px);
    padding-right: 50px;
    --titleMargin: 50px 0 0 ;
    --titleLineHeight: 0.756;
  }
  .right {
    grid-area: content;
    flex: 0 1 auto;

    margin:15px  0 0;
    @include media-query($medium-up) {
      margin-bottom: 40px;
    }
    @include mono;

   :global(p) {
    margin-bottom: 0;
   }


  }
</style>
