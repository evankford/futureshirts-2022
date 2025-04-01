<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";
  import Video from "$lib/components/Video.svelte";
  import SectionBox from "$lib/components/SectionBox.svelte";
import Image from "$lib/components/Image.svelte";
  import type {VideoOrImage} from "$lib/types/sanity";
  import type {Block} from "$lib/types/sections";
  export let title:string | null, subtitle: string| null, intro: string|null, box: Array<Block>, moreVideo:VideoOrImage, anchor: string;

</script>
<section use:isOnScreen class="more" id="{anchor}">

    <div class="content ">
      <div class="left">
        <SectionHeading {title} {subtitle} {intro}/>
      </div>
      <div class="right">
        <SectionBox {box} boxStyle="eachBoxed" />
      </div>
    </div>
    <div class="bottom ">
      {#if moreVideo.is === 'video'}
        <Video video={moreVideo} />
      {:else}
       <Image width={1200} image={moreVideo.image}/>
      {/if}
    </div>
</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-start;
    @include media-query($large-up) {

      align-items: center;
    }
    justify-content: center;
    min-height: min(1000px, 80vh);
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LjljY2M0ZGU5MywgMjAyMi8wMy8xNC0xNDowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTlEMDdFMzBENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTlEMDdFMzFENUZFMTFFQ0IyMjdDQjY1NTc2QjhEMDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OUQwN0UyRUQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OUQwN0UyRkQ1RkUxMUVDQjIyN0NCNjU1NzZCOEQwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkcnqcsAAAAJUExURREREQAAAAAAAElgGT0AAAADdFJOU///ANfKDUEAAAAYSURBVHjaYmDCBRhGZUZlqC/DiEsGIMAANbUE4s8EppcAAAAASUVORK5CYII=);
    background-size: 24px;
    background-repeat: repeat;
    background-color: rgb(var(--color-base-background-accent));
    color: rgb(var(--color-base-text));
    --color-background: rgb(var(--color-base-background-accent));
    --color-foreground: rgb(var(--color-base-text));

    padding: clamp(60px, calc(10px + 9vh), 160px) 0;
  }
  .content {

    @include content-wrap;
    display: flex;
    position: relative;
    z-index: 2;
    justify-content: space-evenly;
    align-items: center;
    transform-style: preserve-3d;
    @include media-query($small) {
      flex-wrap:wrap;
    }
  }
.left, .right {
  transform-style: preserve-3d;
  flex: 1 1 280px;
  max-width: 500px;
}
.bottom {
  background: rgb(var(--color-base-accent));
  --vbg-bg:rgb(var(--color-base-accent));

  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  bottom: -150px;
  width: 650px;
  height: 650px;
  @include media-query($medium-up) {
    bottom: clamp(-28vw, -300px, -30vw);
    width: clamp(50vw, 900px, 80vw);
    height: clamp(50vw, 900px, 80vw);

  }
  border-radius: 50%;
  overflow: hidden;
  z-index: 0;
}
.right {

  --box-bg-color: var(--color-background);
}
.left {
  max-width: 450px;
  @include media-query($tiny) {
    text-align: center;
  }
  --titleMargin: -0.12em 0 0.2em;
}
</style>
