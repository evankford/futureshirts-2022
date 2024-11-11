<script lang="ts">
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import type {LinkPageData} from "./+page.server";
  export let data:LinkPageData;
  import logo from '$lib/images/logo-white.svg';
  import { urlFor} from "$lib/sanity.js";
  import {onMount} from "svelte";
  import PdfLoader from "$lib/components/PdfLoader.svelte";
  import ContactForm from "$lib/sections/ContactForm.svelte";
import type {EmailOptionShape} from "$lib/types/sanity";

  function changeTab(key: string) {
      activeTab = key
  }

  let pdfReady = false;
    onMount(()=>{
        document.addEventListener("adobe_dc_view_sdk.ready", function() {
            pdfReady = true;
        });
    })

    let activeTab: string|null = null;
</script>

<HeadHelper seo={data}/>
<div class="app">
        <div class="logo-wrap">

        <a href="https://futureshirts.co">
            <img src={logo} width="200" alt="Futureshirts (logo)" height="30"/>
        </a>
        </div>



<!--    <header>-->
<!--        <h1>{data.title}</h1>-->
<!--        {#if data.subtitle}-->
<!--            <h2>{data.subtitle}</h2>-->
<!--        {/if}-->
<!--    </header>-->
    <article>
        <div class="links-wrap">
            {#each data.embed as embedItem}
                {#if embedItem._type === 'menuItem'}
                    {#if (embedItem.linkUrl.openInNewTab === true && embedItem.linkUrl.type === 'external') }
                        <a href="{embedItem.linkUrl.url}"  target="_blank" rel="nofollow noopener noreferrer">
                            <span>{embedItem.title}</span>
                        </a>
                    {:else if embedItem.linkUrl.anchor && embedItem.linkUrl.type === 'anchor'}
                        <a href="{embedItem.linkUrl.anchor}">
                            <span>{embedItem.title}</span>
                        </a>
                    {:else if embedItem.linkUrl?.ref?.slug && embedItem.linkUrl.type === 'internal'}
                        <a href="{embedItem.linkUrl.ref.slug}">
                            <span>{embedItem.title}</span>
                        </a>
                    {:else if  embedItem.linkUrl.type === 'internal' && embedItem.linkUrl.url}
                        <a href="{embedItem.linkUrl.url}">
                            <span>{embedItem.title}</span>
                        </a>
                    {/if}
                {:else}
                    <button on:click={()=>changeTab(embedItem._key)}>
                        <span>{embedItem.title}</span>
                    </button>
                {/if}
            {/each}

        </div>

        {#each data.embed as embedItem, i}
            {#if activeTab === embedItem._key || !activeTab && i=== 0}

                {#if embedItem._type === 'lnkVideo' && embedItem.video}

                    <media-player
                        title={embedItem.video.title}
                        src="{embedItem.video.url}"
                        crossOrigin
                        controls={true}
                        autoplay
                    >
                        <media-provider>
                            <media-poster
                                    src={urlFor(embedItem.video.fallbackImage).width(900).format('webp').url() }
                                    alt={embedItem.video.title}
                            />
                        </media-provider>
                    </media-player>
                {:else if embedItem._type === 'lnkPdf' && embedItem.pdfUrl}
                    <PdfLoader url={embedItem.pdfUrl} title={embedItem.title} key={embedItem._key}/>
<!--                   <svelte:component this={PdfViewer} url={embedItem.pdfUrl} showBorder={false} showButtons={['navigation']}/>-->
                {:else if embedItem._type === 'lnkContact' }
                    <div class="contact-wrap">
                        <h1>{embedItem.prettyTitle}</h1>
                        {#if embedItem.subtitle}<h2>{embedItem.subtitle}</h2>{/if}
                        <ContactForm widget={true}
                                     email={[]}
                                     emailTo={embedItem.email.map((e) => e.email)}
                                     successTitle="Thanks for getting in touch!"
                                     successMessage="We'll follow up with you as soon as we can"
                                     errorTitle="Something went wrong!"
                                     errorMessage="Please reload the page and try again."
                        />
                    </div>
                {/if}

            {/if}

        {/each}
    </article>
</div>



<style lang="scss">
  @use "../../../../lib/styles/abstracts/index" as *;

.app {
position: relative;
  min-height: 100vh;
  padding: 1px;
}

  .logo-wrap>a {
    padding: 1em;
  };

  .links-wrap>button, .links-wrap>a, .links-wrap>div {
    @include mono;
    position: relative;
    flex: 1 1 100px;
    display: flex;
    padding: 1em;
    height: 35px;
    gap: 8px;
    font-weight: bold;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    color: rgb(var(--color-base-text-off));
    text-decoration: none;
    border-left: 1px solid rgba(var(--color-base-text-off), 0.5);
    &:hover {
      color: rgb(var(--color-base-accent-lighter));
      text-decoration: underline;
    }
    &:last-child {
      border-right: none;
    }

    @media (min-width: 750px) {
      font-size: 14px;
      height: 43px;
    }
    @media (min-width: 1200px) {
      font-size: 16px;
      height: 55px;
    }
  }

  .logo-wrap {
    width: 100%;
    flex: 1 0 240px;
    display: block;
    text-align: center;
    margin: clamp(13px, 3vh, 35px) auto;
    max-width: 60vw;
    @media (min-width: 750px) {
      width: auto;
      max-width: 200px;
    }
    @media (min-width: 1200px) {
      max-width: clamp(250px, 35vw, 350px);
    }
    img {
      display: block;
      height: auto;
      width: 100%;
    }

  }

  .links-wrap {
    background: black;
    z-index: 100;
    width: 100%;
    position: sticky;
    top: 0;
    display:flex;
    flex-wrap: nowrap;
    gap: 0;
    flex: 1 1 auto;
    border-bottom:  1px solid rgba(var(--color-base-text-off), 0.5);

  }
  header {
    text-align: center;
    position: relative;
    @include content-wrap;
    padding: 60px 30px;
  }

  h1 {
    @include extra;
    font-size: var(--font-title-size);
    margin-bottom: 0.1em;
    &.long {
      font-size: var(--font-title-long-size);
    }
  }
  h2 {
    @include mono;
    font-style: italic;
    font-size: var(--font-subtitle-size);
    text-transform: lowercase;
    letter-spacing: 0;
  }
  media-player {
    background: black;
    box-shadow: 0 0 60px rgba(0,0,0,0.5);
  }
  article {
    @include content-wrap;
    @include page-wrap;
    padding: 0 !important;
    position: relative;
    margin: auto;
    max-width: clamp(1400px, 80vw, 2000px);
    z-index: 10;
    display: flex; align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(var(--color-base-background), 0.5);
    border:  1px solid rgba(var(--color-base-text-off), 0.5);

  }

  .contact-wrap {
    max-width: 840px;
    margin: auto;
    padding: clamp(50px, 10vh, 80px) 20px;
    h1 {
      text-align: center;
      margin: 0 0 30px;
    }
    h2 {
      text-transform: none;
      margin-bottom: 1.2em;
    }
  }
</style>
