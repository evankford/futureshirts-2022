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
  <header bind:this={el} class="section-header" class:offscreen={!visible} use:isOnScreen on:onscreen={()=>{visible = true; stopWatching(el); }} >
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
    display: inline-block;
    @include animateInChild();
  }
</style>