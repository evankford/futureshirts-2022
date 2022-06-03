<script lang="ts">
  import isOnScreen, { stopWatching } from "$lib/isOnScreen";
  let visible:boolean = false;
  let el:HTMLElement;

  export let title:string | null, intro: string | null, subtitle: string | null;

  function splitTitle(t:string):string {
    let toReturn:string = '';
    const words = t.split(' ');
    words.forEach(word=> {
      toReturn += '<span>'
    })
    return toReturn;
  }
</script>

{#if title || intro || subtitle }
  <header bind:this={el} class="section-header" class:hide-children={!visible} use:isOnScreen on:onscreen={()=>{visible = true; stopWatching(el); }} >
    {#if intro}
      <div class="intro">{intro}</div>
    {/if}
    {#if title}
      <h2 class="title">
        {#each title.split(' ') as word}
          <span>{word}&nbsp;</span>
        {/each}
      </h2>
    {/if}
    {#if subtitle}
      <h3 class="subtitle">{subtitle}</h3>
    {/if}
  </header>
{/if}

<style lang="scss">
  @use "../styles/abstracts" as *;
  header {
    display: block;
    position: relative;

  }
  .intro,.subtitle {
    @include mono;
    font-style: italic;
    font-weight: 300;
    margin: 0.1em 0;
    font-size: var(--font-subtitle-size);
  }
  .title {
    font-size: var(--font-size-mega);
    text-transform: lowercase;
    margin: var(--titleMargin, 0.07em 0 0.2em);
    span {
      line-height: inherit;
    }
  }

  .intro, .subtitle, .title span {
    position: relative;
    display: inline-block;
    opacity: 1;
    transform: translate3d(0, 0px, 0);
    transition: transform 600ms ease, opacity 600ms ease;

    @for $i from 0 through 6 {
      &:nth-child(#{$i}) {
        transition-delay: $i * 50ms;
      }
    }
    .hide-children & {
      transform: translate3d(0, max(10px, 100%), 0);
      opacity: 0;
    }
  }
</style>