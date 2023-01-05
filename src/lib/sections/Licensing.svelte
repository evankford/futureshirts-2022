<script lang="ts">
  import SectionBox from "$lib/components/SectionBox.svelte";
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";

  import Image from "$lib/components/Image.svelte";
  import { urlFor } from "$lib/sanity";
  import type {Block} from "$lib/types/sections";
  import type { SanityImageObject} from "@sanity/image-url/lib/types/types";

  export let title:string | null, layout: string, subtitle: string| null, intro: string|null, box: Block[] , image: SanityImageObject | false, image2: SanityImageObject | false, logoGallery: SanityImageObject[], anchor: string;

</script>
<section use:isOnScreen class="{layout}" id="{anchor}">
  <div class="rotate">

    <div class="content">
      <div class="title">
        <SectionHeading {title} {subtitle} {intro}/>
      </div>
    <div class="images">

      {#if image}
      <div class="img1"><Image {image} alt="{image.alt ? image.alt : 'Licensing of Futureshirts Merchandise on a store rack'}" width={1500}/></div>
      {/if}
      <div class="box-wrap">
          <SectionBox {box} />
      </div>
      {#if image2}
        <div class="img2"><Image image={image2} alt="{image2 ? image2.alt : 'Retail shot of  Futureshirts Merchandise'}" width={1500}/></div>
      {/if}
    </div>
    </div>
    {#if logoGallery.length > 0}
    <div class="logos">
      <ul style="width: {logoGallery.length * 104}px; --width: {logoGallery.length * 104}px">
        {#each logoGallery as logo}
        <li>
          <img loading="lazy" src="{urlFor(logo).width(70).format('webp').url()}" srcset="{urlFor(logo).width(160).format('webp').url()} 2x, {urlFor(logo).width(70).format('webp').url()}" alt="{logo.alt}" width="70" height="35" />
        </li>
        {/each}
      </ul>

    </div>
    {/if}
  </div>
</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    // --font-subtitle-size: clamp(24px, calc(20px + 1vw), 32px);
    --titleMargin: 0 auto 0.1em;
    text-align: center;
    --rotateXMod: 2.5deg;
    --rotateYMod: 2.5deg;
    overflow: hidden;

    background-color: rgb(var(--color-base-background));
    padding: clamp(50px, 10vh, 180px) 0;
    color: rgb(var(--color-base-text));
    --color-background: var(--color-base-background);
    --color-foreground: var(--color-base-text);
    @include media-query($tiny) {
       --rotateXMod: 0.5deg;
    --rotateYMod: 0.5deg;
      --font-size-mega: 54px;
    }
  }

  .rotate, .content,.images {
    transform-style: preserve-3d;
  }
  .rotate {
    --depth: 35px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .title {
    margin: 24px auto;
  }
  .img1, .img2 {

    border-radius: var(--box-border-radius);
    overflow: hidden;
    box-shadow: 0 4px 54px rgba(0, 0 , 0, 0.25);
    border: 2px solid rgb(var(--color-border));
  }
  .img1:not(:last-child) {
    margin-right: 30%;
  }

  .img1 ~ .img2 {

    margin: -20% 0 0 30%;

  }
  .images {
    max-width: max(62vw, 1100px);
    width: 100%;
    margin: auto;

  }
  .box-wrap {

    --box-bg-color: rgba(var(--color-background), 0.97);
    margin: -25% 10% 0 auto;
    position: relative;
    z-index: 20;
    max-width: 450px;
    --depth: 120px;
  }
  .content {
    width: 100%;
    position: relative;
    z-index: 2;
     @include media-query($medium-up) {
      flex-direction: row-reverse;
      flex-wrap: nowrap;
    }
  }
  ul {
    display: flex;
    white-space: nowrap;
    width: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
    animation: marquee 120s linear infinite;
  }
 .logos {
   width: 100vw;
   margin: calc(12px + 2.4vw) auto;
   li {
     padding: 12px;

   }

   img {
     object-fit: contain;
     filter: grayscale(1);
     &:hover {
       filter: grayscale(0);
     }
   }
 }

 @keyframes marquee {
  0% {
    transform: translateX(0)
  }
  50% {
    transform:translateX(calc(-1 * var(--width) + 100vw));
  }
  100% {

    transform: translateX(0)
  }
 }

</style>
