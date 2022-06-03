<script lang="ts">
  import { faFacebookF, faTwitter, faInstagram, faTiktok, faYoutube, faSpotify} from "@fortawesome/free-brands-svg-icons"
  import Fa from "svelte-fa";
import { socials, navOpen } from "$lib/stores";
export let inNav:boolean = false;
</script>

{#if $socials && $socials.length > 0}
<ul class="socials">
  {#each $socials as social}
  <li>
    <a target="_blank" rel="nofollow noopener noreferrer" href="{social.url}" aria-label="Follow on {social.type}" tabindex={inNav && !$navOpen ? -1 : 0}>
      {#if social.type == 'facebook' }
      <Fa icon={faFacebookF} />
      {:else if social.type == 'tiktok'}
      <Fa icon={faTiktok} />
      {:else if social.type == 'youtube'}
      <Fa icon={faYoutube} />
      {:else if social.type == 'twitter'}
      <Fa icon={faTwitter} />
      {:else if social.type == 'instagram'}
      <Fa icon={faInstagram} />
      {:else if social.type == 'spotify'}
      <Fa icon={faSpotify} />

      {/if}
    </a>
  </li>
  {/each}
</ul>
{/if}

<style lang="scss">
  @use "../styles/abstracts" as *;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:var(--justifySocials,  flex-start);
  }
  a {
    color: inherit;
    padding: 2px;
    width: 1.5em;
    height: 1.5em;line-height: 1.4em;
    position: relative;
    overflow: hidden;
    z-index: 2;
    display: inline-block;
    transition: color 200ms ease;
    &:hover, &:focus-visible {
      color: white;
      &:after {
        transform: translateY(0)
      }

    }
    &::after {
      @include psuedo();
      z-index: -1;
      background-color: rgb(var(--color-accent));
      transition: transform 300ms ease;
      transform: translateY(calc(100% + 1px));
    }
  }
  li {
    display: inline-block;
    line-height: 1;
    // width: 1.1em;
    margin: 0.1em;
    text-align: center;
  }
</style>