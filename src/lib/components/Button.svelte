<script lang="ts">
import getRefUrl from "$lib/ref";
import isOnScreen, { stopWatching} from "$lib/isOnScreen";

let invisible: boolean = true;
export  let noMargin = false, simple = false, link:LinkURL | string| undefined;
</script>

{#if link != undefined }
<div class="button-wrap" use:isOnScreen on:onscreen={(e)=>{invisible = false; stopWatching(e.target)} } class:invisible>

  {#if typeof link == 'string'}
    <a class:noMargin class:simple href="{link}"><slot>Button Title</slot></a>
  {:else}
    {#if link.type == 'internal' && link.ref}
      <a class:noMargin class:simple href="{getRefUrl(link.ref)}"><slot>Button Title</slot></a>
    {:else if link.type == 'external'}
      {#if link.openInNewTab}
        <a class:noMargin class:simple target="_blank" href={link.url} rel="nofollow noopener noreferrer"><slot>Button Title</slot></a>
        {:else}
        <a class:noMargin class:simple href={link.url}><slot>Button Title</slot></a>
      {/if}
    {:else if link.type == 'anchor' }
      <a class:noMargin class:simple data-anchor href="{link.anchor}"><slot>Button Title</slot></a>
    {/if}
  {/if}
</div>
{/if}

<style lang="scss">
  @use "../styles/abstracts" as *;
  .button-wrap.invisible {
    transform: translateY(100%);
    opacity: 0;
  }
  .button-wrap  {
    transition: transform 800ms ease, opacity 800ms ease;
  }
  a {
    @include resetButton();
    @include buttonStyles();
    background: rgb(var(--color-accent));
    color: rgb(var(--color-accent-inverse));
    padding: 0.5em 1.2em;
    display: inline-block;
    letter-spacing: var(--font-button-letter-spacing);
    margin: var(--vertical-rhythm) var(--vertical-rhythm) 0 0 ;
    font-size: var(--font-button-size);
    border-radius: 1.5em;
    position: relative;
    z-index: 0;
    overflow: visible;
    position: relative;
    opacity: 0.85;
    &::after, &::before {
      @include psuedo;
      border-radius: 1.5em;
      transition: transform 1600ms ease;
      z-index: -1;
      background: inherit;
    }

    &.noMargin {
      margin: 0;
    }
    &.simple {
      margin: calc(var(--vertical-rhythm) * 2) var(--vertical-rhythm) 0 0 ;
      padding: 0;
      background: transparent;
      color: rgb(var(--color-foreground))
    }
    &:hover {
      opacity: 1;

      &::after {
        transform: translateX(-5%);
      }
      &::before {
        transform: translateX(5%);
      }
    }

  }

</style>