<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import SectionBox from "$lib/components/SectionBox.svelte";
import isOnScreen from "$lib/isOnScreen";
import Phone from "$lib/components/Phone.svelte";
  import Counter from "$lib/components/Counter.svelte";
  import Video from "$lib/components/Video.svelte";
  import Image from "$lib/components/Image.svelte";
import Galaxy from "$lib/components/Galaxy.svelte";
import Tablet from "$lib/components/Tablet.svelte";
import Laptop from "$lib/components/Laptop.svelte";
  export let title:string | null, layout: string, subtitle: string| null, box: Block[], intro: string|null, counters: CounterModel[], computer: VideoOrImage, computer2: VideoOrImage, phone:VideoOrImage, phone2:VideoOrImage, tablet:VideoOrImage, anchor: string;

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
  <div class="wrap">

      <div class="devices">
        <div class="comp comp1"><Laptop>{#if computer2.is == 'video'}<Video video={computer2}/>{:else if computer2.is =='image'}<Image width={1600} image={computer2.image} alt={computer2.title} />{/if}</Laptop></div>
        <div class="tablet"><Tablet>{#if tablet.is == 'video'}<Video video={tablet}/>{:else if tablet.is =='image'}<Image width={1200} image={tablet.image} alt={tablet.title} />{/if}</Tablet></div>
        <div class="phone phone1"><Phone>{#if phone.is == 'video'}<Video video={phone}/>{:else if phone.is =='image'}<Image width={800}  image={phone.image} alt={phone.title} />{/if}</Phone></div>
        <div class="phone phone2"><Galaxy >{#if phone2.is == 'video'}<Video video={phone2}/>{:else if phone2.is =='image'}<Image width={800} image={phone2.image} alt={phone2.title} />{/if}</Galaxy></div>
        <div class="comp comp2"><Laptop>{#if computer.is == 'video'}<Video video={computer}/>{:else if computer.is =='image'}<Image width={1600} image={computer.image} alt={computer.title} />{/if}</Laptop></div>
      </div>
  </div>

</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
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

    @include media-query($large) {
      min-height: 2200px;
    }
    @include media-query($medium) {
      min-height: 1800px;
    }

    @include media-query($small) {
      min-height: 1500px;
      --font-size-mega: 62px;
    }

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
    @include media-query($small) {
      margin-bottom: 0;
    }
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
    @include media-query($large) {
      transform: rotate3d(0,0,-1, 18deg) translate3d(-65%, -22%, -10px) scale(0.72);
    }
    @include media-query($medium) {
      transform: rotate3d(0,0,-1, 12deg) translate3d(-45%, 0%, -10px) scale(0.65);
    }
    @include media-query($small) {
      opacity: 0.5;
      transform: rotate3d(0,0,-1, 10deg) translate3d(-45%, -10%, -10px) scale(0.5);
    }
    @include media-query($tiny) {

      transform: rotate3d(0,0,-1, 8deg) translate3d(-45%, -22%, -10px) scale(0.42);
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
      margin: 40px 100px;
    }
    &.comp2 {
      margin: 0 -60px 0 0;
    }

  }
  .wrap {
    @include psuedoish;
    overflow: hidden;
  }
  .phone {
    flex: 0 0 320px;
    margin: auto 90px;
    height: 690px;
      :global(.marvel-device) {
        transform: scale(0.8);
        transform-origin: top left;
      }
    &.phone2 {
      // margin-top: 0;
      margin-left: 30px;
      flex: 0 0 260px;
      :global(.marvel-device) {
        transform: scale(0.65);
        transform-origin: top left;
      }
    }
  }
  .tablet {
    flex: 0 0 576px;
    margin-left: 200px;
  }
  .right {
    --box-bg-color: rgba(var(--color-background), 0.7);
    --color-foreground: 255,255,255;
    flex: 1 1 200px;
    margin: 50px 0 20px auto;
    max-width: 340px;

    @include media-query($small) {
      margin: 20px auto 0 auto;
    }

  }

</style>