<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";
  import SectionBox from "$lib/components/SectionBox.svelte";
  import Image from "$lib/components/Image.svelte";
  import Quote from "$lib/components/Quote.svelte";
  import Fa from "svelte-fa";
  import {faChevronLeft, faChevronRight} from "@fortawesome/pro-regular-svg-icons"
  import {onMount} from "svelte";
  let currentSlide = 0;
  let slideInterval: ReturnType<typeof setInterval>;
  function startSlideInterval() {
    slideInterval = setTimeout(nextSlide, 8000)
  }

  function nextSlide() {
    clearInterval(slideInterval);
    if (currentSlide + 1 < quoteGallery.length) {
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
      currentSlide = quoteGallery.length - 1;
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

       {#each quoteGallery as q, i}

       <li class="slide-image" class:after={currentSlide < i} class:before={currentSlide > i} aria-current={currentSlide == i}>
        <Image fullWidth bg image={q.image} alt="{q.title} Merchandise"/>
       </li>
       {/each}
     </ul>
     <div class="bottom">
       <button aria-label="Previous Quote" on:click={prevSlide}><Fa icon={faChevronLeft}/></button>
       <ul class="quotes">
         {#each quoteGallery as q, i}
           <li class="slide-quote" aria-current={currentSlide == i} aria-hidden={currentSlide != i}>
              <Quote hidden={currentSlide != i} logo={q.logo} quoteTitle={q.quoteTitle} subtitle={q.subtitle} quote={q.quote} />
            </li>
         {/each}
       </ul>
       <button aria-label="Previous Quote" on:click={nextSlide}><Fa icon={faChevronRight}/></button>
     </div>
     <ul class="logos">
       {#each quoteGallery as q, i}
        <li class="slide-logo" >
          <button on:click={()=>slideTo(i)} aria-current={currentSlide == i}>
            <Image image={q.logo} width={150} alt="{q.title} logo"/>
          </button>
        </li>
       {/each}
     </ul>
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
    --rotateXMod: 1.5deg;
    --rotateYMod: 1.5deg;
    --depth: 10px;
    --color-foreground: var(--color-base-text);
    --color-background: var(--color-base-background-off);
    background: rgb(var(--color-background));
    color: rgb(var(--color-foreground));
    padding: clamp(50px, calc(40px + 5vw), 120px) 0;
    position: relative;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LjljY2M0ZGU5MywgMjAyMi8wMy8xNC0xNDowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTlEMDdFMzBENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTlEMDdFMzFENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OUQwN0UyRUQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OUQwN0UyRkQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkcnqcsAAAAJUExURREREQAAAAAAAElgGT0AAAADdFJOU///ANfKDUEAAAAYSURBVHjaYmDCBRhGZUZlqC/DiEsGIMAANbUE4s8EppcAAAAASUVORK5CYII=);
    background-size: 24px;
    background-repeat: repeat;
    overflow: hidden;
  }

  .rotate {

  }

  button {
    @include resetButton;
    flex: 80px;
  }

  .gallery,.slides,.wrap,.content {
    transform-style: preserve-3d;
  }

  .gallery {
    flex: 1 1 600px;
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
    transform: translateZ(250px);
    flex: 1 1 400px;
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
        transform: translateZ(200px);

    display: flex;
    align-items: center;
    justify-content: center;
    --depth: 20px;
    button {
      @include resetButton;
      // @include hoverBox;
      flex: 0 0 25px;
      height: 35px;
      padding: 4px;
      margin: 18px;
      opacity: 0.5;
      transition: opacity 300ms ease, transform 300ms ease;
      display: inline-block;
      position: relative;
      &:hover, &:focus-visible {
        opacity: 1;
        transform: translateY(-6px)
      }
    }
  }

  .logos  {

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --rotateXMod: 5deg;
    --rotateYMod: 5deg;

    --depth: 80px;
    justify-content: center;

  }
  .quotes {
    position: relative;
    width: 100%;
    height: 120px;
    margin: 30px auto;
    --depth: 180px;
  }
  .slide-quote {
    height: 120px;
    position: absolute;

    width: 100%;
  }
  .slides {
    @include psuedo;


    position: relative;
    &::after {
      @include psuedo;
      transform: translateZ(-250px);
      --shiftX: -30px;
      --shiftY: -30px;
      --depth: 0px;
      top: -2.5%;
      left: -1.5%;
      background: rgb(var(--color-base-accent));
      border-radius: var(--box-border-radius);
      z-index: -1;
    }
     &::before {
        content:'';
        display: block;
        padding-bottom: 55%;
      }

  }

  .slide-image {
    transform: translateZ(100px);

    position: absolute;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--box-border-radius);
    transition: transform 800ms ease;
    &.before {
      transform: translateX(-100vw)
    }
    &.after {
      transform: translateX(100vw)
    }
  }

  .wrap {
    //  @include content-wrap;
    padding: 0 3rem;
    max-width: clamp(70vw, 1400px, 90vw);
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

  .slide-logo {
    button {
      width: 90px;
      height: 50px;
      padding: 5px;
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
  }


</style>