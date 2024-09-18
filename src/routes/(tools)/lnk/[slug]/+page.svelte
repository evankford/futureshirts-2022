<script lang="ts">
  import HeadHelper from "$lib/components/HeadHelper.svelte";
  import type {LinkPageData} from "./+page.server";
  export let data:LinkPageData;
  import logo from '$lib/images/logo-white.svg';
  import { urlFor} from "$lib/sanity.js";
  import {onMount} from "svelte";
  import PdfLoader from "$lib/components/PdfLoader.svelte";
  import ContactForm from "$lib/sections/ContactForm.svelte";


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
    <nav>
        <a href="https://futureshirts.co">
            <img src={logo} width="200" alt="Futureshirts (logo)" height="30"/>
        </a>
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


    </nav>
<!--    <header>-->
<!--        <h1>{data.title}</h1>-->
<!--        {#if data.subtitle}-->
<!--            <h2>{data.subtitle}</h2>-->
<!--        {/if}-->
<!--    </header>-->
    <article>


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
                        <h1>Get in touch</h1>
                        <ContactForm widget={true} emailTo={embedItem.email.map(e=>e.email)}/>
                    </div>

                {:else}
                    {JSON.stringify(embedItem)}
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
}
  nav {
    width: 100%;
    max-width: 100vw;
    background: black;
    position: fixed;
    z-index: 100;
    display: flex;
    flex-wrap: wrap;
    &>button, &>a, &>div {
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
      border-bottom: 1px solid rgba(var(--color-base-text-off), 0.5);
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
          height: 40px;
        }
      @media (min-width: 1200px) {
          font-size: 16px;
            height: 50px;
        }
    }
    img {
      width: 120px;
      height: auto;
      @media (min-width: 750px) {
        width: 160px;
      }
      @media (min-width: 1200px) {
        width: 180px;
      }
    }

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
    @media (min-width: 750px) {
        margin: 0 -5vw;
        width: calc(100% + 10vw);
    }
  }

  article {

    @include content-wrap;
    @include page-wrap;
    position: relative;
    margin: auto;
    padding: 130px 30px 60px;
    max-width: clamp(1200px, 80vw, 2000px);
    z-index: 10;
    min-height: 100vh;
    display: flex; align-items: center;
    justify-content: center;
  }

  .contact-wrap {
    max-width: 800px;
    margin: auto;
    h1 {
      text-align: center;
      margin: 0 0 30px;
    }
  }
</style>
