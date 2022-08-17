<script lang="ts">
import getRefUrl from "$lib/ref";
import isOnScreen, { stopWatching} from "$lib/isOnScreen";

let invisible: boolean = true;
export let noMargin = false, small = false, simple = false, underline = false, link:LinkURL | string | null = null;
</script>


<div class="button-wrap" use:isOnScreen on:onscreen={(e)=>{invisible = false; stopWatching(e.target)} } class:invisible>
  {#if link == null}
    <button on:click class="button" class:noMargin class:simple class:small class:underline ><span><slot>Button Title</slot></span></button>
  {:else if typeof link == 'string'}
    <a class="button" class:noMargin class:simple class:small class:underline href="{link}"><span><slot>Button Title</slot></span></a>
  {:else}
    {#if link.type == 'internal' && link.ref}
      <a class="button" class:noMargin class:simple class:small class:underline href="{getRefUrl(link.ref)}"><span><slot>Button Title</slot></span></a>
    {:else if link.type == 'external'}
      {#if link.openInNewTab}
        <a class="button" class:noMargin class:simple class:small class:underline target="_blank" href={link.url} rel="nofollow noopener noreferrer"><span><slot>Button Title</slot></span></a>
        {:else}
        <a class="button" class:noMargin class:simple class:small class:underline href={link.url}><span><slot>Button Title</slot></span></a>
      {/if}
    {:else if link.type == 'anchor' }
      <a class="button" class:noMargin class:simple class:small class:underline data-anchor href="{link.anchor}"><span><slot>Button Title</slot></span></a>
    {/if}
  {/if}
</div>


<style lang="scss">
  @use "../styles/abstracts" as *;
  .button-wrap.invisible {
    transform: translateY(100%);
    opacity: 0;
  }
  .button-wrap  {
    transition: transform 800ms ease, opacity 800ms ease;
  }
  a.button, button.button {
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
    transition: transform 200ms 50ms ease;
    &::after, &::before {
      @include psuedo;
      border-radius: 1.5em;
      transition: transform 400ms 20ms ease;
      z-index: -1;
      background: inherit;
    }

    span {
      position: relative;
      z-index: 2;
    }

    &.simple, &.underline {
      margin: calc(var(--vertical-rhythm) * 2) var(--vertical-rhythm) 0 0 ;
      padding: 0;
      background: transparent;
      color: rgb(var(--color-simple-button, var(--color-foreground)));
    }
    &.small {
      font-size: 16px;
    }
    &.underline {
      padding: 0 0.1em 0.25em;
      &::after {
        @include psuedo;
        height: 3px;
        top: auto;
        bottom: 0;
        transition: transform 200ms 50ms ease;
        transform-origin: 50% 100%;
        transform: scaleY(0.5 );
        background: currentColor;
      }
      &:hover::after {
        transform: scaleY(1);
      }

    }
    &.noMargin {
      margin: 0;
    }
    &:hover {
      transform:translateY(-2px);

      &::after {
        transform: translateX(-5%);
      }
      &::before {
        transform: translateX(5%);
      }
    }

  }

</style>