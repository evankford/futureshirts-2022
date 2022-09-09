<script lang="ts">

  import isOnScreen, {stopWatching} from "$lib/isOnScreen";
  import Video from "$lib/components/Video.svelte";
  import ContactForm from "$lib/sections/ContactForm.svelte";
  import { slide } from "svelte/transition";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import {PortableText} from "@portabletext/svelte";

  let onScreen = false;
  export let data: ContactSettings;
</script>
<section use:isOnScreen on:onscreen={(e)=> {onScreen = true; stopWatching(e.target);}} class="page-content hero-image image-hero">
  {#if onScreen && data.contactVideo}
  <div transition:slide class="bg">
    <Video video={data.contactVideo} />
  </div>
  {/if}
  <div class="wrap">
    <header>
    {#if data.title}<h1>{data.title}</h1>{:else}<h1> Get in touch </h1>{/if}
     {#if data.subtitle}<p>{data.subtitle}</p>{/if}
    </header>
    {#if data.content}
      <PortableText value={data.content} components={{listItem: {normal: LiNormal}}}/>
    {/if}
    <div class="form">
        <ContactForm email={data.email} successMessage={data.successMessage} successTitle={data.successTitle} errorMessage={data.errorMessage} errorTitle={data.errorTitle} contactOptions={data.contactOptions} />
    </div>
  </div>

</section>

<style lang="scss">
  @use "../../lib/styles/abstracts" as *;
  @use "../../lib/styles/core/_backgrounds" as bg;
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
  .page-content.hero-image {
    @include bg.blackGradient;
    min-height: 100vh;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 200px 0 100px;
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
  .form {
    padding: 20px;
    display: block;
  }
</style>
