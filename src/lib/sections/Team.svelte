<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
import isOnScreen from "$lib/isOnScreen";
  import Button from "$lib/components/Button.svelte";
  import Image from "$lib/components/Image.svelte";
import {hasJobs} from "$lib/stores";
  export let title:string | null, subtitle: string| null, intro: string|null, image: SanityImageObject | false, anchor: string, layout: string;

</script>
<section use:isOnScreen class="{layout}" id="{anchor}">
  <div class="content rotate">
    <div class="right ">
      <SectionHeading {title} {subtitle} {intro}/>
      {#if hasJobs }
      <Button link="/team">join the team</Button>
      {/if}
    </div>
    <div class="left  ">
      {#if image}
      <div class="img">
        <Image {image} width={900} alt={image.alt ? image.alt : 'The Futureshirts Team'} />
      </div>
      {/if}
    </div>
  </div>
</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    --rotateXMod: 2.5deg;
    --rotateYMod: 2.5deg;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgb(var(--color-base-background-off));
    padding: clamp(120px, 20vh, 260px) 0 0;
    color: rgb(var(--color-base-text));
    --color-background: rgb(var(--color-base-background-off));
    --color-foreground: rgb(var(--color-base-text));

  }
  .content {
    @include content-wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
     @include media-query($medium-up) {
      flex-direction: row-reverse;
      flex-wrap: nowrap;
    }

  }
  .left, .right {
    transform-style: preserve-3d;
    flex: 1 1 240px;
    max-width: 550px;
    text-align: center;
    margin: 24px;
}
.img {
      border-radius: var(--box-border-radius);
  overflow: hidden;

  position: relative;z-index: 2;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  transform: translateZ(100px);
}
.left {
  max-width: 800px;
  flex-basis: 330px;
  position: relative;
  z-index: 2;
  &::after {
    transform: translateZ(-100px);
    @include psuedo;

    z-index: -1;
    left: -5%;
    top: -5%;
    background: rgb(var(--color-base-accent));
    border-radius: var(--box-border-radius)
  }
}
.socials {
  color: rgb(var(--color-base-accent));
  --justifySocials: center;
}
.right {
  text-align: left;
  --font-size-mega: clamp(60px, calc(50px + 3.5vw), 100px);
  --titleMargin: 0 0 20px;
}
</style>