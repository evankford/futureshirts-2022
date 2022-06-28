<script lang="ts">
  import type {Writable, Readable}  from "svelte/store";
  import { getContext } from "svelte";

  const ready:Readable<boolean> = getContext('ready');
  const processing:Writable<boolean> = getContext('processing')
  const submitted:Writable<boolean> = getContext('submitted');
  const changed:Readable<boolean> = getContext('changed');

  let wrap: HTMLElement;
  let handleSubmit:()=>void = getContext('handleSubmit');
  let shaking = false;
  function shake() {
    shaking = true;

    setTimeout(() => {
    shaking = false;
    }, 300);
  }
</script>
<div class="button-wrap"  bind:this={wrap}></div>
{#if $submitted && !$changed}
<button type="button" disabled on:click={shake} class="error">
  <slot />
</button>
{:else if $processing}
<button type="button" on:click={shake} class="processing">
  {#if $$slots.processing && $processing}
  <slot name="processing"/>
  {:else}
  <span>Working...</span>
  {/if}
</button>
{:else if !$ready}
<button type="button" on:click={shake}  class:shaking class="not-ready">
  <slot/>
</button>
{:else }
<button type="button" on:click={handleSubmit} class="ready" class:ready>
  <slot/>
  </button>
{/if}

<style lang="scss">
  @use "../../styles/abstracts/mixins" as *;
  button {
    @include resetButton;
    @include buttonStyles;
    display: block;
    margin: 1.5em 0 0;
    text-transform: lowercase;
    padding: 0.5em 1em;
    border-radius: 2em;
    transition: transform 300ms ease;
    position: relative;
    z-index: 2;
    background: rgb(var(--color-accent));

    &::before {
      @include  psuedo;
      transition: transform 300ms ease;
      background: inherit;
      border-radius:inherit;
      z-index: -1;
    }
    &.ready:hover, &.ready:focus-visible {
      transform: translateY(-2px);
      &::before {
        transform: scale(1.1);
      }
    }
    &.error {
      background: rgb(var(--color-error));
    }
  }
  .shaking {
    animation: shake 0.5s infinite;
  }

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
.not-ready {
  background-color: rgb(var(--color-base-accent-dull));
}
</style>