<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import Button from "$lib/components/Button.svelte";
  import type {Partner} from "$lib/types/sanity";
  import PartnerSectionBackground from "$lib/components/PartnerSectionBackground.svelte";
  export let title:string | null, subtitle: string| null, intro: string|null,   anchor: string, layout: string, partners: Partner[];
</script>

<section use:isOnScreen class="{layout}" id="{anchor}">
      <PartnerSectionBackground {partners}/>
  <div class="content">
    <div class="right ">
      <SectionHeading {title} {subtitle} {intro}/>
      <div class="buttons">
        <Button link="/partners">meet our partners</Button>
      </div>

    </div>

  </div>
</section>
<style lang="scss">
  @use "../styles/abstracts" as *;

  section {
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgb(var(--color-base-text-darker));
  padding: 6px;
    color: rgb(var(--color-base-background));
    --color-background: rgb(var(--color-base-text-darker));
    --color-foreground: rgb(var(--color-base-background));
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    z-index: 2;
    @include media-query($large-up) {
      flex-wrap: nowrap;
    }
    padding: 20px 0;
    @include media-query($large-up){
      padding: 50px 0;
    }

    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 800px;
    transform: translate3d(-50%, -50%, 0);

    background: radial-gradient(ellipse closest-side, rgba(black, 0.3) 0%, rgba(black, 0.0) 100%);

  }

.buttons {
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
}

.img {
  border-radius: var(--box-border-radius);
  overflow: hidden;
  position: relative;z-index: 2;
  border-top: 4px solid white;
  border-bottom: 4px solid white;
}
.left {
  flex: 0  0 100%;
  z-index: 2;
  overflow: hidden;
  margin:  0 auto;
  position: relative;


  @include media-query($medium-up) {
    flex: 0 0  50%;
    margin: auto 0 auto auto;
    max-width: 700px;
  }

}

.right {
  flex: 1 1 300px;
  padding: 24px;
text-align: center;
  max-width: 90%;

  --titleMargin: 0.14em 0 0.3em;

  @include media-query($medium-up){

    padding: clamp(24px, calc(20px + 4vmin), 65px);
    margin: auto auto auto -5px;
    text-align: left;

    max-width: 600px;

  }

  --font-size-mega: clamp(60px, calc(50px + 2.5vw), 100px);
  &:first-child {
    margin: auto;
    text-align: center;
  }
}
</style>
