<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import Button from "$lib/components/Button.svelte";
  import Socials from "$lib/components/Socials.svelte";
  import { dev } from "$app/env";
  export let title:string | null, subtitle: string| null, intro: string|null, showSocials:boolean = true, instagramWidget:CodeShape, anchor: string, layout: string;
</script>

<section use:isOnScreen class="{layout}" id="{anchor}">
  <div class="content rotate">
    <div class="left">
      <SectionHeading {title} {subtitle} {intro}/>
      {#if showSocials}
      <div class="socials">
        <Socials />
      </div>
      {/if}
      <Button link="/contact">get in touch</Button>
    </div>
    <div class="right">
      <div class="code">
        {#if !dev}
         {@html instagramWidget.code}
        {/if}
      </div>

    </div>
  </div>
</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: rgb(var(--color-base-background-off));
    color: rgb(var(--color-base-text));
    --color-background: rgb(var(--color-base-background-off));
    --color-foreground: rgb(var(--color-base-text));
    padding: clamp(50px, 8vh, 150px) 0 ;
  }
  .content {

    @include content-wrap;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
    align-items: center;
    z-index: 2;

  }
  .left, .right {
    // transform-style: preserve-3d;

  flex: 1 1 240px;
  max-width: 500px;
  text-align: center;
  margin: 20px 4px;
  @include media-query($medium-up) {
    margin: 24px;

  }
}
.code {
  border-radius: var(--box-border-radius);
  overflow: hidden;
  position: relative;
  background: rgb(var(--color-accent-darker));
  z-index: 2;
  box-shadow: 5px 5px 18px rgba(0,0,0,0.4);
  min-height: 150px;
  @include media-query($medium-up) {
    min-height: 300px;
  }
  min-width: clamp(150px, calc(200px + 5vw), 100%);
}
.right {
  max-width: 850px;
  flex-basis: 430px;
  @include media-query($large-up) {
    margin-left: 50px;
  }
  // &::after {
  //   @include psuedo;
  //   --shiftX: 15px;
  //   --shiftY: 15px;
  //   left: -5%;
  //   top: -5%;
  //   background: rgb(var(--color-base-accent));
  //   border-radius: var(--box-border-radius)
  // }
}
.socials {
  color: rgb(var(--color-base-accent));
  --justifySocials: center;
}
.left {
  --font-size-mega: clamp(60px, calc(50px + 3.5vw), 100px);
  --depth: 100px;
  --titleMargin: 0 0 20px;
}
</style>