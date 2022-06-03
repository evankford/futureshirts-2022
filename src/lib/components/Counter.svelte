<script lang="ts">
  import isOnScreen ,{stopWatching} from "$lib/isOnScreen"
  import {CountUp} from "countup.js";

  let counter:HTMLSpanElement;
  let wrap:HTMLElement;
  let invisible: boolean = true;

  function start() {
    invisible = false;
    let demo = new CountUp(counter, number);
    if (!demo.error) {
      demo.start();
    } else {
      console.error(demo.error);
    }
    stopWatching(wrap);
  }
  export let introduction: string, subtitle: string, number:number;
</script>

<div class:invisible class="counter" use:isOnScreen on:onscreen={start} bind:this={wrap}>
  <div class="subtitle">{introduction}</div>
  <div class="number"><span bind:this={counter}></span></div>
  <div class="subtitle">{subtitle}</div>
</div>

<style lang="scss">
  @use "../styles/abstracts" as *;

  .counter {
    flex: 0 1 auto;
    margin: 20px ;
    text-align: inherit;
  }
  .subtitle {
    @include mono;
    font-size: 16px;
  }
  .number {
    font-size: clamp(25px, calc(22px + 1.8vw), 45px);
    @include extra;
  }
  .number {
    min-height: 0.9em;
  }

  .subtitle, .number {
    transition: transform 300ms ease, opacity 300ms ease;

    .invisible & {
      opacity: 0;
      transform: translateY(100%);
    }
  }
</style>