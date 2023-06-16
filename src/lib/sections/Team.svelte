<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import Button from "$lib/components/Button.svelte";
  import {hasJobs} from "$lib/stores";
  import type {TeamMember} from "$lib/types/sanity";
  import TeamSectionGallery from "$lib/components/TeamSectionGallery.svelte";
  import TeamSectionBackground from "$lib/components/TeamSectionBackground.svelte";
  export let title:string | null, subtitle: string| null, intro: string|null,   anchor: string, layout: string, teamMembers: TeamMember[];
</script>

<section use:isOnScreen class="{layout}" id="{anchor}">
      <TeamSectionBackground {teamMembers}/>
  <div class="content">
    <!--<div class="left  ">
      <TeamSectionGallery {teamMembers} />
    </div>-->
    <div class="right ">
      <SectionHeading {title} {subtitle} {intro}/>
      <div class="buttons">
        <Button link="/team">meet the team</Button>
        {#if hasJobs }
          <Button link="/jobs">jobs at futureshirts</Button>
        {/if}
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
    background-color: rgb(var(--color-base-accent-darkest));

    color: rgb(var(--color-base-background));
    --color-background: rgb(var(--color-base-background-accent));
    --color-foreground: rgb(var(--color-base-text));
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    //position: relative;
    flex-wrap: wrap;
    z-index: 2;
    //width:100%;
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
