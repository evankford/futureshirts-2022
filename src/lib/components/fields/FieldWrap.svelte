<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import {slide} from "svelte/transition";
  import type { Writable } from "svelte/store";
  import type {Fields} from "../../../global";

  let fields:Writable<Fields> = getContext('fields');
  let processing:Writable<boolean> = getContext('processing');
  let submitted:Writable<boolean> = getContext('submitted');
  let error = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let unsub = ()=> {}

  onMount(()=> {
    unsub = fields.subscribe((val:Fields) =>{
      if (val && val[id]) {
        error = val[id].errorMsg != false;
      }
    });
  })

  onDestroy( ()=>{
    unsub();
  });

  export let id = '' ;
</script>
<div class="field" class:error={error && $submitted} class:processing={$processing}>
  <slot class="input"></slot>
  {#if error && $submitted}
  <div transition:slide|local class="message">
    {@html $fields[id].errorMsg}
  </div>
  {/if}
</div>

<style lang="scss">
  @use "../../styles/abstracts" as *;
  .field {
    position: relative;
    padding-left: 12px;
    margin-left: -12px;
  }
  .field::before {
    @include psuedo;
    background: rgb(var(--color-error));
    transition: opacity 300ms ease;
    width: 3px;
    opacity: 0;
  }
  .field.error::before {
    opacity: 1;
  }
  .message {
    padding: 6px 12px;
    color: white;
    font-weight: 500;
    border-radius: 3px;
    font-size: 14px;
    margin: 9px 0 0;
    background-color: rgb(var(--color-error));
  }
  .processing {
    opacity: 0.8;
    pointer-events: none;
  }
</style>
