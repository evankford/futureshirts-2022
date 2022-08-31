<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";
  import Quote from "$lib/components/Quote.svelte";
  import Fa from "svelte-fa";
  import {fly} from "svelte/transition";
  import {faChevronLeft, faChevronRight} from "@fortawesome/pro-regular-svg-icons"
  import {onMount, onDestroy} from "svelte";
  import {browser} from "$app/env"
  import throttle from "$lib/throttle";
  let currentSlide = 0;
  let slideInterval: ReturnType<typeof setInterval>;
  function startSlideInterval() {
    slideInterval = setTimeout(nextSlide, 100000)
  }

  function nextSlide() {
    clearInterval(slideInterval);
    if (currentSlide + 1 < quoteGallery.length) {
      currentSlide++
    } else {
      currentSlide = 0;
    }
    startSlideInterval();
    throttleHeightChange();
  }
  function prevSlide() {
    clearInterval(slideInterval);
    if (currentSlide > 0 ) {
      currentSlide--
    } else {
      currentSlide = quoteGallery.length - 1;
    }
    startSlideInterval();
    throttleHeightChange();  }

  function slideTo(num:number) {
    clearInterval(slideInterval);
    currentSlide = num;
    // startSlideInterval();
    throttleHeightChange();
  }




  function changeQuoteHeight(){
    const oldHeight = quoteWrapperHeight;
    if (!domSlides) { return }
    const current= domSlides[currentSlide];
    if (!current) { return }
    let newHeight = current.clientHeight,
    diff = newHeight - oldHeight;
    const duration = 1000 * .2;
    const start = +new Date();

    if (diff == 0) {
      return;
    }

    function timing(time:number){
       if (time < .5)
          return (2 * time) / 2;
        else
          return (2 - (2 * (1 - time))) / 2;
    }


    function step() {
      const current = +new Date(),
        timeFraction = Math.min(1, (current - start) / duration),
        progress = timing(timeFraction);
        let m = diff * progress;
        quoteWrapperHeight = oldHeight+ m;
      if (progress < 1 )  {
        requestAnimationFrame(step);
      }
    }

    step();
  }

  const throttleHeightChange = throttle(changeQuoteHeight, 100);
  onMount(()=> {
    startSlideInterval()

    if (browser){
      setTimeout(() => {
        changeQuoteHeight()
      }, 1);
      // window.addEventListener('resize', throttleHeightChange, {passive: true});
    }
  });
  onDestroy(()=>{
    if (browser ) {
      window.removeEventListener('resize', throttleHeightChange);
    }
  })

  let domSlides: HTMLLIElement[] =  [], quoteWrapperHeight=0;

  export let title:string | null, subtitle: string| null,layout: string, intro: string|null, box: Array<Block>,  anchor: string, quoteGallery: QuoteShape[];

</script>
<section use:isOnScreen class=" {layout}" id="{anchor}">
  <div class="rotate">
    <div class="top hide--medium-up">
      <SectionHeading {title} {subtitle} {intro}/>
  </div>
 <div class="wrap">
   <div class="gallery">
     <ul class="slides">
       <button aria-label="Previous Quote" on:click={prevSlide}><Fa icon={faChevronLeft}/></button>

       {#each quoteGallery as q, i}

       <li class="slide-image" class:after={currentSlide < i} class:before={currentSlide > i} aria-current={currentSlide == i}>
        <Image fullWidth bg image={q.image} alt="{q.title} Merchandise"/>
       </li>
       {/each}
       <button aria-label="Next Quote" on:click={nextSlide}><Fa icon={faChevronRight}/></button>
     </ul>
     <div class="bottom">
       <ul class="quotes" style="height: {quoteWrapperHeight}px;">
         {#each quoteGallery as q, i}
         {#if currentSlide == i}
           <li bind:this={domSlides[i]} out:fly={{duration: 200, x: browser ? window.innerWidth : 500}} in:fly={{delay: 100, x: browser ? window.innerWidth : 500 }} class="slide-quote" aria-current={currentSlide == i} aria-hidden={currentSlide != i}>
              <Quote logo={q.logo} quoteTitle={q.quoteTitle} subtitle={q.subtitle} quote={q.quote} />
            </li>
            {/if}
         {/each}
       </ul>
     </div>
     <!-- <ul class="logos">
       {#each quoteGallery as q, i}
        <li class="slide-logo" >
          <button on:click={()=>slideTo(i)} aria-current={currentSlide == i}>
            <Image image={q.logo} width={150} alt="{q.title} logo"/>
          </button>
        </li>
       {/each}
     </ul> -->
   </div>
    <div class="content">
      <div class="hide--small">
        <SectionHeading {title} {subtitle} {intro}/>
      </div>
        <SectionBox {box} style="boxed" />
    </div>
 </div>
  </div>

</section>

<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    @include content-wrap;
    --color-foreground: var(--color-base-text);
    --color-background: var(--color-base-background-off);
    background: rgb(var(--color-background));
    color: rgb(var(--color-foreground));
    position: relative;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LjljY2M0ZGU5MywgMjAyMi8wMy8xNC0xNDowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTlEMDdFMzBENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTlEMDdFMzFENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OUQwN0UyRUQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OUQwN0UyRkQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkcnqcsAAAAJUExURREREQAAAAAAAElgGT0AAAADdFJOU///ANfKDUEAAAAYSURBVHjaYmDCBRhGZUZlqC/DiEsGIMAANbUE4s8EppcAAAAASUVORK5CYII=);
    background-size: 24px;
    max-width: 100%;
    @include media-query($medium-up) {
      padding: clamp(50px, calc(40px + 5vw), 120px) 0;
    }
    @include media-query($small) {
      padding-top: 50px;
      padding-bottom: 50px;
    }
    background-repeat: repeat;
    overflow: hidden;
    --titleLineHeight: 0.7;
  }

  .top {
text-align: center;
  }

  button {
    @include resetButton;
    flex: 80px;
  }

  .gallery,.slides,.wrap,.content {
    transform-style: preserve-3d;
  }

  .gallery {
    flex: 1 1 450px;
    margin: 20px auto;
    max-width: 1000px;
    position: relative;
    z-index: 1;
    min-width: 200px;


    @include media-query($medium-up) {
      margin: 80px clamp(40px, 6vw, 80px);
    }
  }
  .content {
    flex: 1 1 270px;
    margin: 0;
    position: relative;
    z-index: 2;
    max-width: 500px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% + 70px);
    margin: 0 -35px;

  }

  .logos  {

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

  }
  .quotes {
    position: relative;
    width: 100%;
    display: flex;
    margin: 20px auto;
    align-items: center;
  }
  .slide-quote {
    // height: 120px;
    flex: 0 0 100%;
    padding: 0 20px;
    position: absolute;
    width: 100%;

  }
  .slides {
    @include psuedo;
    position: relative;
    &::after {
      @include psuedo;
      left: -9px;
      top: -9px;
      @include media-query($medium-up) {

        left: -24px;
        top: -24px;
      }
      background: rgb(var(--color-base-accent));
      border-radius: var(--box-border-radius);
      z-index: -1;
    }
     &::before {
        content:'';
        display: block;
        padding-bottom: 55%;
      }

    button {
      position: absolute;
      top: calc(50% - 17.5px);
      left: -20px;

      &:last-child {
        left: auto;
        right: -20px;

      }
      @include resetButton;
      // @include hoverBox;
      flex: 0 0 35px;
      height: 35px;
      width: 35px;
      border-radius: 35px;
      z-index: 20;
      background: rgb(var(--color-base-accent-darker));
      color: rgb(var(--color-accent-inverse));

      opacity: 0.5;
      transition: opacity 300ms ease, transform 300ms ease;
      display: inline-block;
      &:hover, &:focus-visible {
        opacity: 1;
        transform: translateY(-6px)
      }
      @include media-query($small) {
        font-size: 12px;
      }
    }
  }

  .slide-image {

    position: absolute;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--box-border-radius);
    transition: transform 800ms ease, opacity 500ms;
    pointer-events: none;
    &.before {
      transform: translateX( -60vw);
      opacity: 0;
    }
    &.after {
      transform: translateX( 60vw);
      opacity: 0;
    }
  }

  .wrap {
    //  @include content-wrap;
    padding: 0;
    @include media-query($widescreen) {
      padding: 0 3rem;
    }
    max-width: clamp(70vw, 1400px, 95vw);
    margin: auto;
     display: flex;
     flex-wrap: wrap;
     align-items: flex-start;
     justify-content: center;
     @include media-query($small) {
       flex-wrap: wrap;
     }

    --box-bg-color: rgb(var(--color-background));
  }

  /* .slide-logo {
    button {
      height: 40px;
      width: 75px;
      padding: 2px;
      @include media-query($medium-up) {
        width: 95px;
        height: 55px;
        padding: 5px;
      }
      @include media-query($large-up) {
        width: 100px;
        height: 70px;
        padding: 8px;
      }
      transition: opacity 300ms ease, transform 300ms ease;
      transform: scale(0.8);
      opacity: 0.25;
      position: relative;
      display: inline-block;

      &:hover {
        transform: scale(1);
        opacity: 0.8
      }
      &[aria-current=true] {
        opacity: 1;
        transform: scale(0.95);
      }
    }
  } */


</style>