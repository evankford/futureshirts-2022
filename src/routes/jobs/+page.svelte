<script lang="ts">

  import isOnScreen from "$lib/isOnScreen";
  import JobForm from "$lib/sections/JobForm.svelte";
  import PageHero from "$lib/sections/PageHero.svelte";
  import Button from "$lib/components/Button.svelte";
  import { PortableText} from "@portabletext/svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";
  import JobDetails from "$lib/components/JobDetails.svelte";

  import { fade, fly } from 'svelte/transition'

  let openJob:number|false = false;

  export let data:JobSettings;

</script>
<PageHero image={data.image} >
  <header>
    {#if data.title}
      <h1>{data.title}</h1>
      {/if}
    {#if data.subtitle}
      <h2>{data.subtitle}</h2>
      {/if}
      <Button link="#apply"> Apply</Button>
  </header>
</PageHero>
<div use:isOnScreen class="wrap" class:has-image={data.image}>
  <section class="jobs page-content">
   {#if data.content}
      <PortableText value={data.content} components={{listItem: {normal: LiNormal}}} />
    {/if}
    <div class="jobs-heading">
        {#if data.openings.length > 0}
          <h2>{data.haveOpeningsTitle ? data.haveOpeningsTitle : 'Current Openings:'}</h2>
          {#if data.haveOpenings}
          <big>

            {data.haveOpenings}
          </big>
          {/if}
          {:else }
          <h2 class="h3">{data.noCurrentOpeningsTitle ? data.noCurrentOpeningsTitle : 'Current Openings:'}</h2>
          {#if data.noCurrentOpenings}
          {data.noCurrentOpenings}
          {/if}
          {/if}
      </div>
      {#if data.openings.length > 0}
      <ul class="openings">
        {#each data.openings as opening, i}
        <li class="opening">
          <heading>
            <h3>{opening.title}</h3>
            {#if opening.subtitle}
            <h4>{opening.subtitle}</h4>
            {/if}
          </heading>
          <div class="excerpt">
            <PortableText value={opening.description} components={{listItem: {normal: LiNormal}}} />
          </div>
          <div class="buttons">
            <Button small link="#apply">Apply</Button>
            <Button underline small on:click={()=>openJob = i}>More Info</Button>
          </div>
        </li>
        {/each}
      </ul>
      {/if}

  </section>

    {#if typeof openJob == 'number' && data.openings[openJob] }
      <JobDetails bind:openJob job={data.openings[openJob]}/>
    {/if}

  <section class="form page-content" id="apply">
    <div class="form-inner">
      <h2>Submit your Application</h2>
      <JobForm email={data.email} openings={data.openings} errorTitle={data.errorTitle} errorMessage={data.errorMessage} successMessage={data.successMessage} successTitle={data.successTitle} />
    </div>

  </section>
</div>

<style lang="scss">
  @use "../../lib/styles/abstracts" as *;
  @use "../../lib/styles/abstracts/mixins/type-elements" as type;
  @use "../../lib/styles/core/_backgrounds" as bg;
header {
  text-align: center;
  max-width: var(--text-width);
  margin: auto;

  h2 {
    @include mono;
    font-size: var(--font-subtitle-size);
    margin: 22px auto;
  }
}

  .wrap {
    padding: 1px;
    background: rgb(var(--color-base-background-off));

    @include page-wrap;
    --page-margin-bottom: 0;
    &.has-image {
      --page-margin-top: 0;
    }
  }
    .form-inner, .jobs {
    @include content-wrap;
   }

   .jobs {
    margin: clamp(32px ,calc(20px + 5vh), 60px) auto;
   }


   .buttons {
    display: flex;
    flex-wrap: wrap;
    margin: auto 0 0;
   }
   .jobs-heading {
    max-width: var(--text-width);
    text-align: center;
    margin: 40px auto;
    h2 {
      margin: 20px auto;
    }
   }
   .form-inner {
        max-width: var(--site-text-width, 750px);
   }

   .form {
    padding: 100px 0;
    @include bg.blackGradient;
    color: white;
    h2 {
      // @include type.mono;
      line-height: 1;
      text-transform: lowercase;
      font-weight: bold;
      // font-style: italic;
      text-align: center;
      margin: 0 auto 1em;

    }
   }
   .excerpt {
    font-size: 17px;
    padding: 12px 0 0;
    border-top: 1px solid rgb(var(--color-border));

    margin: 12px 0;
    :global(p) {
      line-height: 1.4;
    }
    :global(h1), :global(h2), :global(h3) {
      font-size: 24px;
      margin: 0.5em auto 0.2em;
      /* line-height: 1.4; */
    }

   }
   heading {
    width: 100%;
    text-align: left;
   }

   .openings {
    --gap: 10px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: calc(100% + 2 * var(--gap));
    max-width:  calc(100% + 2 * var(--gap));
    margin: 0 calc(-1 * var(--gap));
   }

   .opening {
    margin: var(--gap);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    flex: 1 1 250px;
    @include media-query($medium-up) {
      max-width: 50%;
    }
    h4 {
      @include mono;
      font-size: clamp(14px , calc(12px + 1vw), 16px);
      font-style: italic;
      text-transform: lowercase;
      letter-spacing: normal;
    }
    background: rgb(var(--color-base-background));
    padding: 20px;
    box-shadow:  5px 5px 8px rgba(0,0,0,0.09);
   }
</style>
