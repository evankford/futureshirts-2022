<script lang="ts">
  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import { contact} from "$lib/stores";
  import Video from "$lib/components/Video.svelte";
  import ContactForm from "$lib/sections/ContactForm.svelte";
import { slide } from "svelte/transition";
  let onScreen = false;

</script>
<section use:isOnScreen on:onscreen={(e)=> {onScreen = true; stopWatching(e.target);}} class="page-content">
  {#if onScreen && $contact && $contact.video}
  <div transition:slide class="bg">
    <Video video={$contact.video} />
  </div>
  {/if}
  <div class="wrap">
    <header>
      {#if $contact && $contact.title}<h1>{$contact.title}</h1>{:else}<h1> Get in touch </h1>{/if}
     {#if $contact && $contact.subtitle}<p>{$contact.subtitle}</p>{/if}
    </header>
    <form class="form">
      {#if $contact}
        <ContactForm />
      {/if}
    </form>
  </div>

</section>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;
  .bg {
    z-index: 0;
    pointer-events: none;
    top: 50%;
    left: 50%;
    position: absolute;
    width: clamp(700px, 60vmax, 1100px);
    height: clamp(700px, 60vmax, 1100px);
    display: block;
    border-radius:  clamp(350px, 30vmax, 550px);
    transform: translate3d(-50%, -50%, 0);
    overflow: hidden;
    opacity: 0.4;
  }
  :global(body ) {
    --color-background:0,0,0;
    background: radial-gradient( rgb(var(--color-background)), #3f3f3f);
    --color-foreground: var(--color-base-background-off);
  }
  :global(body main#MainContent) {
    background: transparent;
  }
  .wrap {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    @include media-query($medium-up) {
      flex-wrap: nowrap;
    }
    align-items: center;
    max-width: clamp(1000px, calc(1080px + 10vw), 2000px);
    margin: auto;
    min-height: clamp(300px, calc(450px + 20vw), 500px);
  }
  header {
    flex: 1 1 350px;
    padding: 25px;
    max-width: calc(400px + 5vw);
    @include media-query($medium-up) {
      margin-right: 25px;
    }
  }
   h1 {
    @include extra;
    font-size: var(--font-title-size);
     @include media-query($large-up) {
      font-size: 90px;
    }
  }
  p {
    font-size: 20px;
    line-height: 1.4;
    margin: 0.8em 0;
    @include media-query($large-up) {
      font-size: 23px;
    }
  }
  .page-content {
    @include page-wrap;
  }
</style>
