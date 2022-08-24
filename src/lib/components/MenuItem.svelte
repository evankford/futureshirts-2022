<script lang="ts">
  import {navOpen} from "$lib/stores"
  export let item:MenuItemShape, small: boolean = false, inNav:boolean = false;
</script>
{#if inNav }
<li aria-hidden={!$navOpen} class:small>
  {#if (item.linkUrl.openInNewTab == true && item.linkUrl.type == 'external') }
    <a on:click={()=>{setTimeout(()=>{$navOpen = false}, 5)}} tabindex={$navOpen ? 0 : -1} href="{item.linkUrl.url}"  target="_blank" rel="nofollow noopener noreferrer">{item.title}</a>
  {:else if item.linkUrl.anchor && item.linkUrl.type == 'anchor'}
    <a on:click={()=>{setTimeout(()=>{$navOpen = false}, 5)}} tabindex={$navOpen ? 0 : -1} href="{item.linkUrl.anchor}">{item.title}</a>
  {:else if item.linkUrl?.ref?.slug && item.linkUrl.type == 'internal'}
    <a on:click={()=>{setTimeout(()=>{$navOpen = false}, 5)}} tabindex={$navOpen ? 0 : -1} href="{item.linkUrl.ref.slug}">{item.title}</a>
  {:else if  item.linkUrl.type == 'internal' && item.linkUrl.url}
    <a on:click={()=>{setTimeout(()=>{$navOpen = false}, 5)}} href="{item.linkUrl.url}"  tabindex={$navOpen ? 0 : -1}>{item.title}</a>
  {/if}
</li>
{:else }
<li class:small>
  {#if (item.linkUrl.openInNewTab == true && item.linkUrl.type == 'external') }
    <a href="{item.linkUrl.url}"  target="_blank" rel="nofollow noopener noreferrer">{item.title}</a>
  {:else if item.linkUrl.anchor && item.linkUrl.type == 'anchor'}
    <a href="{item.linkUrl.anchor}">{item.title}</a>
   {:else if item.linkUrl?.ref?.slug && item.linkUrl.type == 'internal'}
    <a href="{item.linkUrl.ref.slug}">{item.title}</a>
    {:else if  item.linkUrl.type == 'internal' && item.linkUrl.url}
    <a href="{item.linkUrl.url}">{item.title}</a>
  {/if}
</li>
{/if}

<style lang="scss">
  @use "../styles/abstracts" as *;
   li {
    list-style: none;
    line-height: 1;
    transition: opacity 300ms ease, transform 300ms ease;

    @for $i from 0 through 6 {
      &:nth-child(#{$i}) {
        transition-delay: 100ms * $i;
      }
    }
     &[aria-hidden="true"] {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  a {
    @include mono();
    // text-transform: uppercase;
    // font-family: var(--font-body-family);
   font-size: inherit;
    font-weight: 400;
    text-transform: lowercase;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: inline-block;
    z-index: 1;
    padding: 0.3em var(--menu-link-padding, 0.7em);
    margin: 0.1em;

   @include hoverBox;
  }
  li.small a {
    font-size: 16px;

    @include media-query($large-up) {
      font-size: 17px;
    }
  }
  </style>
