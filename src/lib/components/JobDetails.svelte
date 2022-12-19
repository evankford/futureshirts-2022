<script lang="ts">

  import { PortableText} from "@portabletext/svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import Fa from "svelte-fa";
  import { faXmark} from "@fortawesome/free-solid-svg-icons";
  import { fade, fly } from 'svelte/transition';
  import type { Opening } from "$lib/types/sanity";

  export let job:Opening, openJob:false|number = false;
</script>
<div class="job-wrap" >
      <div class="job-bg" in:fade={{duration: 200, delay: 0}} out:fade={{ duration: 200, delay: 200}} on:click={()=> openJob = false}></div>
      <article class="job-content page-content" in:fly={{ duration: 200, delay: 200, y: 50}} out:fly={{ duration: 200, delay: 0, y: 50}}>
        <heading>

          <h2>{ job.title }</h2>
          {#if job.subtitle}
             <h4>{job.subtitle}</h4>
           {/if}
        </heading>
          <PortableText value={job.fullDescription} components={{listItem: {normal: LiNormal}}} />
          <div class="buttons">
            <a class="button" on:click={()=>{openJob=false}} href="#apply">Apply</a>
          </div>
          <button on:click={()=>{openJob= false}} aria-label="Close Job description"><Fa icon={faXmark}/></button>
      </article>
    </div>


<style lang="scss">
  @use "../styles/abstracts" as *;
  @use "../styles/abstracts/mixins/buttons" as b;
  .job-wrap{
    position: fixed;
    z-index: 1000000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 12px;
    overflow-y: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  heading {
    margin: 0 0 20px;
  }
  .job-bg{
    @include psuedo;
    background: rgba(black, 0.8);
  }

  .job-content {
     @include content-wrap;

    position: relative;
    z-index: 20;
    padding: clamp(20px, calc(10px + 5vw), 50px) clamp(20px, calc(10px + 3vw), 30px);
max-width: 900px;
    margin: auto;
    width: 90%;
    background: rgb(var(--color-base-background));
    color: rgb(var(--color-base-foreground));
  }

   button {
    @include b.resetButton;
    position: absolute;
    top: 0;
    padding: 10px;
    font-size: 20px;
    right: 0;
    color: black;
    opacity: 0.5;
    transition: opacity 300ms ease;
    &:hover{
      opacity: 0.8;
    }
  }
  .button {
    @include b.resetButton;
    @include b.buttonStyles;
    border-radius: 50px;
    padding: 0.3em 0.9em;
  }
  .buttons {
    margin: 40px auto 0;
  }
</style>
