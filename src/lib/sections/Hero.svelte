<script lang="ts">
  import Fa from "svelte-fa";
  import { fly } from "svelte/transition";
  import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/pro-regular-svg-icons";
  import { faCircle } from "@fortawesome/pro-solid-svg-icons";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";
  import { onMount } from "svelte";
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

  onMount(()=> {
    startSlideInterval()
  });


  export let title:string | null, subtitle: string| null, intro: string|null, box: Array<Block>, heroGallery: Array<HeroImage>, anchor:string;
</script>
<section use:isOnScreen class="hero" id={anchor}>
  <div class="rotate">
    {#if heroGallery}
      <div class="bg">
        {#each heroGallery as galleryImage,i}
        <div class="slide" class:visible={i === currentSlide}>
          <Image image={galleryImage.image} bg />
        </div>
        {/each}
      </div>
    {/if}
    <div class="hero-content">
      <div class="left">
        <div class="title">
          <SectionHeading {title} {subtitle} {intro} />
        </div>
        <div class="bottom">
        {#if heroGallery && heroGallery.length}
          <div class="who">
            {#each Array(heroGallery.length) as _, i}
              {#if i === currentSlide}
                <span in:fly={{duration:400, delay: 300, y: 20}} out:fly={{duration: 300, y:20}}>{heroGallery[i].title}</span>
              {/if}
            {/each}
          </div>
          {/if}
          <nav aria-label="Slide {currentSlide + 1} of {heroGallery.length} active.">
            <button on:click={prevSlide} aria-label="Previous Slide" aria-disabled={currentSlide == 0}>
              <Fa icon={faArrowLeftLong}/>
            </button>
            {#each Array(heroGallery.length) as _, i}
              <button class="dot" class:active={i == currentSlide } on:click={()=> {slideTo(i)}}  aria-label="Go To Slide {i}">
                <Fa icon={faCircle }/>
              </button>
            {/each}
            <button on:click={nextSlide} aria-label="Next Slide" aria-disabled={currentSlide + 1 >= heroGallery.length}>
              <Fa icon={faArrowRightLong}/>
            </button>
          </nav>
        </div>
      </div>
      <div class="right">
        {#if box}
        <SectionBox {box} style="none"/>
        {/if}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../styles/abstracts" as *;
  section {

    overflow: hidden;
    --color-foreground: var(--color-base-background);
    --color-background: var(--color-base-text);

    background: rgb(var(--color-background));

      --rotateXMod: 1.4deg;
    --rotateYMod: 1.4deg;
  }

  .rotate {
    --depth: 50px;
    position: relative;
    min-height: 85vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: rgb(var(--color-foreground));
    padding: clamp(200px, 30vh, 450px) 0 clamp(40px, 10vh, 180px);
  }
  .bg,.hero-content,.left,.right {
    transform-style: preserve-3d;
  }

  .bg {
    @include psuedoish;
    z-index: 0;
    height: 105%;
    width: 105%;
    left: -1%;
    top: -1%;
    transform: translateZ(-099px);

  }

  .bottom {
    padding-left: 5px;
    margin: clamp(25px,  calc(20px + 3vh), 50px) 0 0;
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

  .title {
    transform: translateZ(100px);
  }
  .who {

    @include mono;

    min-width: 200px;
    position: relative;
    height: 1.4em;
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
    --depth: 150px;
    @include content-wrap;
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap:wrap;
    text-align: left;
    align-items: flex-end;
    justify-content: space-between;
  }
  nav {
    margin: 5px auto 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .left {

    --depth: 50px;
    max-width: 550px;
  }
  .right {
   transform: translateZ(150px);
   @include mono;
    --rotateXMod: -9deg;
    --rotateYMod: -9deg;
    --depth: 100px;

  }
</style>