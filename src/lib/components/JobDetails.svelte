<script lang="ts">

  import { PortableText} from "@portabletext/svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import { faXmark} from "@fortawesome/free-solid-svg-icons";
  import { fade, fly } from 'svelte/transition';
  import type { Opening } from "$lib/types/sanity";
  import Fa from 'svelte-fa/src/fa.svelte'
  export let job:Opening, openJob:false|number = false;
</script>
<div class="job-wrap" >
      <button class="job-bg" in:fade|local={{duration: 200, delay: 0}} out:fade|local={{ duration: 200, delay: 200}} on:click={()=> openJob = false}></button>
      <article class="job-content page-content" in:fly={{ duration: 200, delay: 200, y: 50}} out:fly={{ duration: 200, delay: 0, y: 50}}>
        <header>

          <h2>{ job.title }</h2>
          {#if job.subtitle}
             <h4>{job.subtitle}</h4>
           {/if}
        </header>
          <PortableText value={job.fullDescription} components={{listItem: {normal: LiNormal}}} />
          <div class="buttons">
            <a class="button" href={job.url} target={ "_blank"}>Apply</a>
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
    padding: 50px 12px;
    overflow-y: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  header {
    margin: 0 0 20px;
  }
  .job-bg{
    @include psuedo;
    position: fixed;
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
    top: 5px;
    padding: 10px;
    font-size: 20px;
    right: 5px;
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
