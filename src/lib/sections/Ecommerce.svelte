<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import SectionBox from "$lib/components/SectionBox.svelte";
import isOnScreen from "$lib/isOnScreen";
import Phone from "$lib/components/Phone.svelte";
  import Counter from "$lib/components/Counter.svelte";
  import Video from "$lib/components/Video.svelte";
import Galaxy from "$lib/components/Galaxy.svelte";
import Tablet from "$lib/components/Tablet.svelte";
import Laptop from "$lib/components/Laptop.svelte";
  export let title:string | null, layout: string, subtitle: string| null, box: Blocks[], intro: string|null, counters: Counter[], computer: VideoObject, computer2: VideoObject, phone:VideoObject, phone2:VideoObject, tablet:VideoObject, anchor: string;

</script>
<section use:isOnScreen id="{anchor}" class=" {layout}">
  <div class="content">
    <div class="title">
      <SectionHeading {title} {subtitle} {intro}/>
    </div>
    <div class="right">
      <SectionBox {box} />

    </div>
    <div class="bottom">
      {#each counters as counter }
        <Counter {...counter} />
      {/each}
    </div>
  </div>
  <div class="rotatewrap">

    <div class="rotate">
      <div class="devices">
        <div class="comp comp1"><Laptop><Video video={computer2}/></Laptop></div>
        <div class="phone phone1"><Phone><Video video={phone}/></Phone></div>
        <div class="tablet"><Tablet><Video video={tablet}/></Tablet></div>
        <div class="comp comp2"><Laptop><Video video={computer}/></Laptop></div>
        <div class="phone phone2"><Galaxy ><Video video={phone2}/></Galaxy></div>
      </div>
    </div>
  </div>

</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    --rotateXMod: 3deg;
    --rotateYMod: 3deg;
    position: relative;
    min-height: 2500px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0 100%);
    background-color: #1F2229;
    background: linear-gradient(80deg, #363e4e 0%, #1F2229 100% );
    color: rgb(var(--color-base-background));
    position: relative;
    padding: clamp(40px, 8vh, 100px) 0;
    --color-background: 31, 34, 41;
    --color-foreground: var(--color-background);

  }

  .content {
    @include content-wrap;
    position: sticky;
    padding-top: clamp(20px, 5vh, 70px);
    top:0;
    width: 100%;
    overflow: unset;
    z-index: 2;
    z-index: 200;

  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-shadow: 0 0 40px rgba(0,0,0,0.5);
  }
  .title {
    text-align: center;
    width: 100%;
    text-shadow: 0 0 40px rgba(0,0,0,0.5);
    margin: 0 auto clamp(20px, 10vh, 100px);
    z-index: 100;
  }
  .devices {
    width: 1480px;
    position: absolute;
    top: 0%;
    left: 50%;
    transform-origin: 50% 50% -500px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 0;
    transform: rotate3d(0,0,-1, 15deg) translate3d(-75%, -10%, -150px);
    @include media-query($medium) {
      transform: rotate3d(0,0,-1, 25deg) scale(0.9) translate3d(-15%, 0%, -10px) scale(0.4);
    }
  }
  .phone, .comp, .tablet {
    position: relative;
    min-width: 0;
    z-index: 2;
    margin: 24px;
  }
  .comp {
    flex: 0 0 1048px;

    &.comp1 {
      margin: 0 100px;
    }

  }
  .rotatewrap {
    @include psuedoish;
    overflow: hidden;
  }
  .phone {
    margin: auto 24px;
    flex: 0 0 320px;
    height: 690px;
      :global(.marvel-device) {
        transform: scale(0.8);
        transform-origin: top left;
      }
    &.phone2 {
      margin-top: 0;
      flex: 0 0 260px;
      :global(.marvel-device) {
        transform: scale(0.65);
        transform-origin: top left;
      }
    }
  }
  .tablet {
    flex: 0 0 576px;
  }
  .right {
    --box-bg-color: rgba(var(--color-background), 0.7);
    flex: 1 1 200px;
    margin: 50px 0 20px auto;
    max-width: 340px;

  }

</style>