<script lang="ts">
  import type {Writable, Readable}  from "svelte/store";
  import { getContext, onDestroy } from "svelte";

  const ready:Readable<boolean> = getContext('ready');
  const valid:Readable<boolean> = getContext('valid');
  const processing:Writable<boolean> = getContext('processing')
  const submitted:Writable<boolean> = getContext('submitted');

  let handleSubmit:MetaSubmitFunction;
  const submitStore = getContext<Writable<MetaSubmitFunction>>('submitForm');
  const unsubSubmitStore = submitStore.subscribe(val=> {
    handleSubmit = val;
  });

  let shaking = false;
  function shake() {
    shaking = true;


    setTimeout(() => {
    shaking = false;
    }, 300);
  }

  function submit(doIt:boolean = true) {
    submitted.update(()=>{ return true});
    if (doIt) {
      handleSubmit();
      return;
    }
    shake();
    return;
  }
  onDestroy(()=> {
    unsubSubmitStore();
  })
  export let centered: boolean = false;
</script>
<div class="button-wrap" class:centered >


  {#if $processing}
    <button type="button" on:click={()=>submit(false)} class="processing">
      {#if $$slots.processing && $processing}
      <slot name="processing"/>
      {:else}
      <span>Working...</span>
      {/if}
    </button>
{:else if $submitted && !$valid}
  <button type="button" disabled on:click={()=>submit(false)}  class:shaking class="error">
    <slot />
  </button>
{:else if !$ready}
<button type="button" on:click={()=>submit(false)}  class:shaking class="not-ready">
  <slot />
</button>
{:else }
<button type="button" on:click={()=>submit()} class="ready" class:ready>
  <slot/>
  </button>
{/if}
</div>
<style lang="scss">
  @use "../../styles/abstracts/mixins" as *;
  .button-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
  .button-wrap.centered {
    justify-content: center;
  }
  button {
    @include resetButton;
    @include buttonStyles;
    display: block;
    margin: 1.5em 0 0;
    text-transform: lowercase;
    padding: 0.5em 1em;
    border-radius: 2em;
    position: relative;
    z-index: 2;
    transition: all 300ms ease;
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
    &.not-ready {
      background: rgb(var(--color-base-accent-dull));
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

</style>