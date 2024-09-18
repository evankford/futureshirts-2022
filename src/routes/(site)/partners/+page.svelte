<script lang="ts">
    import type {Partner, PartnerPageData, TeamMember, TeamPageData} from "$lib/types/sanity";
    import PageHero from "$lib/sections/PageHero.svelte";
    import Button from "$lib/components/Button.svelte";
    import Image from "$lib/components/Image.svelte";
    import {urlFor} from "$lib/sanity";
    import ContactForm from "$lib/sections/ContactForm.svelte";
    export let data:PartnerPageData;

    function getFeaturedPartners(): Partner[] {
        return data.partners.filter(p=> p.featured)
    }
    function getUnfeaturedPartners(): Partner[] {
        return data.partners.filter(p=> !p.featured)
    }

</script>
<div class="page">
    <div class="content">
        <PageHero>
            <h1>{data.title}</h1>
            {#if data.subtitle}
                <div class="h3">{data.subtitle}</div>
            {/if}
        </PageHero>
        <section class="partners">
            <ul class="partners-list">
                {#each getFeaturedPartners() as partner}
                    <li class="partner">
                            <span class="image-wrap" >
                                <Image bg image={partner.featuredImage} alt="{partner.title}" width={700}/>
                            </span>
                            <span class="hover-content">
                                {#if partner.logo}
                                  <img loading="lazy" src="{urlFor(partner.logo).width(70).format('webp').url()}" srcset="{urlFor(partner.logo).width(160).format('webp').url()} 2x, {urlFor(partner.logo).width(70).format('webp').url()}" alt="{partner.title}" width="70" height="35" />
                                {:else}
                                    <span class="h4 mono">{partner.title}</span>
                                {/if}
                                {#if partner.storeUrl || partner.websiteUrl}
                                    <div class="buttons">
                                        {#if partner.storeUrl}
                                        <a class="button" href={partner.storeUrl} target="_blank" rel="noreferrer" >
                                            Visit Store
                                        </a>
                                            {/if}
                                        {#if partner.websiteUrl}
                                        <a class="button" href={partner.websiteUrl} target="_blank" rel="noreferrer" >
                                            More Info
                                        </a>
                                        {/if}
                                    </div>
                                    {/if}
                            </span>
                    </li>
                {/each}
            </ul>
        </section>

        {#if getUnfeaturedPartners().length}
            <section class="unfeatured">
                <ul class="partners-logos">
                    {#each getUnfeaturedPartners() as partner}
                        <li class="partner-logo">
                            {#if partner.logo}
                                <img loading="lazy" src="{urlFor(partner.logo).width(70).format('webp').url()}" srcset="{urlFor(partner.logo).width(160).format('webp').url()} 2x, {urlFor(partner.logo).width(70).format('webp').url()}" alt="{partner.title}" width="70" height="35" />
                            {:else}
                                <span class="h4 mono">{partner.title}</span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </section>
        {/if}
        {#if data.includeContact}
            <section class="contact">
                <h1>{data.contactTitle ?? 'Get In Touch'}</h1>
                <ContactForm widget={true}/>
            </section>
        {/if}
    </div>
</div>


<style lang="scss">
  @use "../../../lib/styles/abstracts" as *;
    :global(div > header.site-header.stuck){
      color: rgb(var(--color-base-background));
    }

    .page{
      padding: 20px 0;
      background: radial-gradient( circle, rgb(var(--color-base-text)) 0, rgb(var(--color-base-text-darkest)) 100%);
      color: rgb(var(--color-foreground));
      --color-background: var(--color-base-text-darker);
      --color-foreground: var(--color-base-background);
    }
  .section:not(.partners) {
    @include content-wrap;
  }

  section.partners {
    padding: 8px;
    @include media-query($medium-up) {
      padding-inline: 16px;
    }
    @include media-query($large-up) {
      padding-inline: calc(16px + 2vw);
    }
  }

  .hover-content {
    @include psuedoish;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(50px);
    transition: transform 300ms ease, opacity 300ms ease;
  }
  .partner > button {
    position: relative;
    display: block;
    transition: transform 300ms ease;
    @include resetButton;
    width: 100%;

    &:hover, &:focus-visible{
      transform: scale(1.04);
      .image-wrap {
        opacity: 0.3;
      }
      .hover-content {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .h4 {
    @include mono;
    font-size: var(--font-mono-large-size);
  }
  .partners {
    margin: 0 0 50px 0;
    padding: 0;
  }

  .partners-list {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: calc(200px + 10vw);
    @include media-query($marge){
      gap: 16px;
      grid-template-columns: repeat(3, 1fr);
    }
    @include media-query($widescreen){
      gap: 16px;
      grid-template-columns: repeat(4, 1fr);
    }
  }


  .hover-content {
    @include psuedoish;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(50px);
    transition: transform 300ms ease, opacity 300ms ease;
  }
  .buttons {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .partner .button {
    position: relative;
    display: block;
    transition: transform 300ms ease;
    @include resetButton();
    @include buttonStyles();
  }

  li{
    list-style: none;
  }
  .partner {
    position: relative;
    &:hover, &:focus-visible{
      .image-wrap {
        opacity: 0.3;
        transform: scale(1.04);

        filter: grayscale(0) contrast(1);

      }
      .hover-content {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .image-wrap{
    overflow: hidden;
    transition: all 300ms ease;
    border-radius: var(--border-radius);
    @include psuedoish();
    filter: grayscale(0.8) contrast(1.2);
  }


  .contact {
    max-width: 800px;
    margin: 80px auto;
    h1 {
      text-align: center;
      margin: 0 0 30px;
    }
  }

</style>
