<script lang="ts">
  import { urlFor } from "$lib/sanity";
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type {SanityImageObject} from "@sanity/image-url/lib/types/types";

  const widths = [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2500, 3000];

  let originalSize: Size | undefined = undefined;
  interface Size {
    width: number | false
    height: number | false
    aspect: number | false
  }

  function tryToGetCenter(src:SanityImageSource) {
    if (typeof src == 'string') {return "50% 50%";}
    if ('hotspot' in src) {
      return `${src.hotspot.x*100}% ${src.hotspot.y*100}%`
    }
    return "50% 50%";
  }

  function getSrcString (src:SanityImageSource):string | false {
    if (typeof src == 'string') {
       return src;
     } else {
        if ('asset' in src) {
          if ('_ref' in src.asset ) { //SanityRef
            return src.asset._ref
          }
          return src.asset;
        }
        if ('_ref' in src ) { //SanityRef
          return src._ref
        } else if ('url' in src && src.url) { //SanityAsset
          return src.url
        }
      }
      return false;
  }
  function trySize(src:SanityImageSource):Size {
    if (originalSize) {//cache
      return originalSize
    }
    const srcString:string | false = getSrcString(src);
    if (srcString) {
      const splitSrc = srcString.split('-');
      if (splitSrc && splitSrc.length == 4) {
        const splitString = splitSrc[2].split('x');
        if (splitString.length == 2) {
          originalSize = {width: parseInt(splitString[0]), height: parseInt(splitString[1]), aspect: parseInt(splitString[1]) / parseInt(splitString[0]) }
          return originalSize;
        }
      }
    }
    return { width: 2000, height: false, aspect: 1}
  }
  function buildSrcSet(image:SanityImageObject, maxWidth: number | null| false, aspect:number|false= false, forceWebp = false):string {

    let srcSet:string[] = [];
    let maxWidthIndex:false| number = false;
    widths.forEach((width, i)=> {
      let oneWidthUp = widths[i + 1] ? widths[i + 1] : 3000;

      let oneWidthUpUrl = urlFor(image).width(oneWidthUp);
      if (!oneWidthUpUrl) {
        return;
      }

      if (!maxWidth || width <= maxWidth ) {
        const urlWithoutHeight = oneWidthUpUrl?.format('webp');
        if (aspect) {
          srcSet.push(urlWithoutHeight.height(Math.round(oneWidthUp * aspect)).url() + ' ' + width + 'w ' + Math.round(width*aspect) + 'h');
        }
        srcSet.push(oneWidthUpUrl.format('webp').url() + ' ' + width + 'w');
      } else if (!maxWidthIndex) {
          maxWidthIndex = i;
      }
    })

    if (maxWidthIndex) {
      let maxW = widths[maxWidthIndex];
      if (!maxW) {
        maxW = widths[widths.length - 1]
      }
      if (urlFor(image).width(maxW)) {

       if (aspect) {
          srcSet.push(urlFor(image).width(maxW).format('webp').height(Math.round(maxW * aspect)).url() + ' ' + maxW + 'w');
        }
        srcSet.push(urlFor(image).width(maxW).format('webp').url() + ' ' + maxW + 'w');
      }

    }
    return srcSet.join(',');
  }


  function getFixedStyles(w: number | false  = false, h: number | false  = false) {
    let str =""
    if (w) {str+=`--fw:${w}px;`}
    if (h) {str+=`--fh:${h}px;`}
    return str;
  }

  let loaded = false;

  export let
  image:SanityImageObject,
  fixedHeight:number|false = false,
  fixedWidth: number|false = false,
  blurUp =true,
  alt: string|null = null,
  bg = false,
  width: number | null | false = false,
  aspect: number | false = false,
  transparency =  false,
  lazy= true,
  isInSlide=false,
  isCurrentSlide=false,
  fullWidth =  false;
</script>
{#if width && width <= 150}
<picture class:bg data-src="{urlFor(image).format('webp').url()}" data-lg-size="{`${trySize(image).width}-${trySize(image).height}`}"  class:fixed={fixedHeight || fixedWidth}  class="respimg" style="--mw:{fullWidth? '100%' : width ? width + 'px' : trySize(image).width? trySize(image).width + 'px' : '100%' }; --ar:{aspect ? aspect : trySize(image).aspect}; --obj-pos:{tryToGetCenter(image)}; {getFixedStyles(fixedWidth, fixedHeight)}">
  <img loading={lazy ? 'lazy' : 'eager'} class="respimg-img" alt={alt} src={urlFor(image)?.format('webp').width(width).url()} />
</picture>
{:else }
{#if isInSlide && !isCurrentSlide && !loaded}
<picture class:bg data-src="{urlFor(image).format('webp').url()}" data-lg-size="{`${trySize(image).width}-${trySize(image).height}`}"  class:fixed={fixedHeight || fixedWidth}  class="respimg" style="--mw:{fullWidth? '100%' : width ? width + 'px' : trySize(image).width? trySize(image).width + 'px' : '100%' }; --ar:{aspect ? aspect : trySize(image).aspect}; --obj-pos:{tryToGetCenter(image)}; {getFixedStyles(fixedWidth, fixedHeight)}">
  <img style="{!loaded && blurUp ? `background-image: url('${urlFor(image).format('webp').blur(30).width(100).url()}');` : 'background-image: none;'}" loading={lazy ? 'lazy' : 'eager'} class="respimg-img"  alt={alt} src={urlFor(image)?.format('webp').width(200).url()} />
</picture>
{:else}
<picture class:bg data-src="{urlFor(image).format('webp').url()}" data-lg-size="{`${trySize(image).width}-${trySize(image).height}`}"  class:fixed={fixedHeight || fixedWidth}  class="respimg" style="--mw:{fullWidth? '100%' : width ? width + 'px' : trySize(image).width? trySize(image).width + 'px' : '100%' }; --ar:{aspect ? aspect : trySize(image).aspect}; --obj-pos:{tryToGetCenter(image)}; {getFixedStyles(fixedWidth, fixedHeight)}">
  <img style="{!loaded && blurUp ? `background-image: url('${urlFor(image).format('webp').blur(30).width(100).url()}');` : 'background-image: none;'}" loading={lazy ? 'lazy' : 'eager'} class="respimg-img" on:load={()=>{ setTimeout(()=>{loaded = true}, 50 )}}  alt={alt} src={urlFor(image)?.format('webp').width(200).url()} srcset={buildSrcSet(image, width ? width : trySize(image).width, aspect ? aspect : trySize(image).aspect, !transparency)}/>
</picture>
{/if}
{/if}


<style lang="scss">
  @use "../styles/abstracts" as *;

  picture {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: var(--mw, 100%);
    margin: auto;
    display: block;
    transition: opacity 600ms ease, transform 800ms ease;

    &.bg {
      @include psuedoish;
    }

    &.fixed {
      position: relative;
      img {
        position: relative;
        width: var(--fw, auto);
        height: var(--fh, auto);
      }
    }

    &:not(.fixed) {
      &::before {
        content: '';
        display: block;
        width: 100%;
        padding-bottom: calc(100% * var(--ar));
      }
      img {
          @include psuedoish();
        }
    }
  }

  img {
    transition: all 200ms ease;
    background-size:var(--image-fill, cover);
    background-repeat: no-repeat;
    object-fit: var(--image-fill, cover);
    object-position: var(--obj-pos, 50% 50%);
    z-index: 1;
  }

</style>
