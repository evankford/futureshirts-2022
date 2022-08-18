<script lang="ts">
  import { browser } from "$app/env";
  import { onMount } from "svelte";
  import Image from "./Image.svelte";

  function videoSrc():string |false{
    if (video.type != 'local') {
      return video.url ? video.url : false;
    } else {
      if (!video.local) {
        return false;
      }
      if (video.smallVideo) {
        return video.smallVideo + ' 900w, ' + video.local
      } else {
        return video.local
      }
    }
  }

  let src: string|false = false;
  onMount(async ()=> {
    src = videoSrc();
    if (browser && !customElements.get('video-background')) {
      await import("@evankford/video-background");
    }
  })

  export let video: VideoObject, bg:boolean = true;
</script>


{#if bg && src}

<video-background src={src} loop>
    {#if video.type != 'local' && video.fallbackImage}
    <Image image={video.fallbackImage} bg />
    {:else if video.type == 'local' && video.localImage}
    <Image image={video.localImage} bg />
    {/if}
  </video-background>
{/if}


<style lang="scss">

</style>