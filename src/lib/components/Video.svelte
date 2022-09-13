<script lang="ts">
  import Image from "./Image.svelte";

  function videoSrc():string |false{
    if (video.type != 'local') {
      return video.url ? video.url : false;
    } else {
      if (video.smallVideo) {
        return video.smallVideo + ' 750w, ' + video.local
      }
      return video.local
    }
  }


  export let video: VideoObject, bg:boolean = true;
</script>


{#if bg && videoSrc()}
  <video-background src="{videoSrc()}" loop>
    {#if video.type != 'local' && video.fallbackImage}
    <Image image={video.fallbackImage} bg fullWidth />
    {:else if video.type == 'local' && video.localImage}
    <Image image={video.localImage} bg  fullWidth/>
    {/if}
  </video-background>
{/if}


<style lang="scss">

</style>