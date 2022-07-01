<script lang="ts">
  import isOnScreen from "$lib/isOnScreen";
  import SvelteMarkdown from "svelte-markdown";
  import JobForm from "$lib/sections/JobForm.svelte";
  import PageHero from "$lib/sections/PageHero.svelte";
  import Button from "$lib/components/Button.svelte";
  import { PortableText} from "@portabletext/svelte";
  import LiNormal from "$lib/components/portableText/LiNormal.svelte";

  export let
    email: string,
    image: SanityImageObject | undefined = undefined,
    title: string | undefined = undefined,
    subtitle: string | undefined = undefined,
     content: Block[] | undefined = undefined,
    successTitle: string ,
    successMessage: string ,
    errorTitle: string ,
    errorMessage: string ,
    haveOpeningsTitle: string | undefined = undefined,
    haveOpenings: string | undefined = undefined,
    noCurrentOpeningsTitle: string | undefined = undefined,
    noCurrentOpenings: string | undefined = undefined,
    openings: Opening[];
</script>
<PageHero {image} >
  <header>
    {#if title}
      <h1>{title}</h1>
      {/if}
    {#if subtitle}
      <h2>{subtitle}</h2>
      {/if}
      <Button link="#apply"> Apply</Button>
  </header>
</PageHero>
<div use:isOnScreen class="page-content" class:has-image={image}>
  <section class="jobs">
   {#if content}
      <PortableText value={content} components={{listItem: {normal: LiNormal}}} />
    {/if}
    <div class="jobs-heading">
        {#if openings.length > 0}
          <h2>{haveOpeningsTitle ? haveOpeningsTitle : 'Current Openings:'}</h2>
          {#if haveOpenings}
          <big>

            {haveOpenings}
          </big>
          {/if}
          {:else }
          <h2 class="h3">{noCurrentOpeningsTitle ? noCurrentOpeningsTitle : 'Current Openings:'}</h2>
          {#if noCurrentOpenings}
          {noCurrentOpenings}
          {/if}
          {/if}
      </div>
      {#if openings.length > 0}
      <ul class="openings">
        {#each openings as opening}
        <li class="opening">
          <h3>{opening.title}</h3>
          {#if opening.subtitle}
          <h4>{opening.subtitle}</h4>
          {/if}
          <div class="md">
            <SvelteMarkdown source={opening.description}/>
          </div>
        </li>
        {/each}
      </ul>
      {/if}
  </section>
  <section class="form" id="apply">
    <div class="form-inner">
      <h2>Submit your Application</h2>
      <JobForm {email} {openings} {errorTitle} { errorMessage} { successMessage} { successTitle} />
    </div>

  </section>
</div>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;
  @use "../lib/styles/abstracts/mixins/type-elements" as type;
  @use "../lib/styles/core/_backgrounds" as bg;
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
  .page-content {
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
   .md {
    font-size: 17px;
    padding: 0;
    :global(p) {
      line-height: 1.4;
    }

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
