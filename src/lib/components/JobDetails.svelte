<script lang="ts">

  import { PortableText} from "@portabletext/svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
 import Fa from "svelte-fa";
  import { faXmark} from "@fortawesome/pro-regular-svg-icons";

  import { fade, fly } from 'svelte/transition';

  export let job:Opening, openJob:false|number = false;
</script>
<div class="job-wrap" >
      <div class="job-bg" in:fade={{duration: 200, delay: 0}} out:fade={{ duration: 200, delay: 200}} on:click={()=> openJob = false}></div>
      <div class="job-content page-content" in:fly={{ duration: 200, delay: 200, y: 50}} out:fly={{ duration: 200, delay: 0, y: 50}}>
         <h2>{ job.title }</h2>
         {#if job.subtitle}
            <h4>{job.subtitle}</h4>
          {/if}
          <PortableText value={job.fullDescription} components={{listItem: {normal: LiNormal}}} />
          <button on:click={()=>{openJob= false}} aria-label="Close Job description"><Fa icon={faXmark}/></button>
      </div>
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
</style>