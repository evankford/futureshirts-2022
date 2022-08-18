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
  export let introduction: string, subtitle: string, number:number, small=false;
</script>

<div class:invisible class:small class="counter" use:isOnScreen on:onscreen={start} bind:this={wrap}>
  <div class="subtitle">{introduction}</div>
  <div class="number"><span bind:this={counter}></span></div>
  <div class="subtitle">{subtitle}</div>
</div>
<style lang="scss">
  @use "../styles/abstracts" as *;

  .counter {
    flex: 0 1 250px;
    margin: 5px 10px;
    @include media-query($medium-up){
            margin: 17px ;

          }
    text-align: inherit;

     &.small {
      margin: 10px auto;
      flex: 0 0 auto;
      font-size: 15px;
      max-width: 100%;
      @include media-query($medium-up){
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 16px;
      }
    }
  }
  .subtitle {
    @include mono;
    font-size: 14px;;
    @include media-query($medium-up) {

      font-size: 16px;
    }


  }
  .number {
    font-size: clamp(22px, calc(22px + 1.2vw), 39px);
    .small & {
      font-size: 32px;
      margin: 0 0.35em 0.1em;
    }
    @include extra;
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