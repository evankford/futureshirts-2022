<script lang="ts">
  import SectionHeading from "$lib/components/SectionHeading.svelte";
  import isOnScreen from "$lib/isOnScreen";
  import Button from "$lib/components/Button.svelte";
  import {hasJobs} from "$lib/stores";
  import type {TeamMember} from "$lib/types/sanity";
  import TeamSectionGallery from "$lib/components/TeamSectionGallery.svelte";
  export let title:string | null, subtitle: string| null, intro: string|null,   anchor: string, layout: string, teamMembers: TeamMember[];
</script>

<section use:isOnScreen class="{layout}" id="{anchor}">
  <div class="content">
    <div class="left  ">
      <TeamSectionGallery {teamMembers} />
    </div>
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
    background-color: rgb(var(--color-base-accent-darker));
    padding: 20px 0;
    @include media-query($large-up){
      padding: 50px 0;
    }
    color: rgb(var(--color-base-background));
    --color-background: rgb(var(--color-base-background-accent));
    --color-foreground: rgb(var(--color-base-text));
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
    z-index: 2;
    width:100%;
    @include media-query($large-up) {
      flex-wrap: nowrap;
    }

  }

.buttons {
  display: flex;
  flex-wrap:wrap;
  justify-content: flex-start;
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

.gallery {
flex-wrap: wrap;
align-items: center;
background: rgb(var(--color-base-background-accent));
overflow: hidden;
padding: 5px;
border-radius: var(--box-border-radius);
display: grid;
grid-template-columns: repeat(7, 1fr);
  @include media-query($large-up) {
    grid-template-columns: repeat(8, 1fr);
  }
   @include media-query($small) {
    grid-template-columns: repeat(6, 1fr);
  }
}
.gallery-item {
  position: relative;
  &:before {
    content: '';
    width: 100%;
    display: block;
    padding-bottom: 100%;
  }
  flex: 0 0 calc(16.666667% - 10px);
  margin: 5px;
  @include media-query($medium-up) {
    flex: 0 0 calc(0.1428571429% - 10px);
  }
}
.socials {
  color: rgb(var(--color-base-accent));
  --justifySocials: center;
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
    max-width: 500px;

  }
  --font-size-mega: clamp(60px, calc(50px + 2.5vw), 100px);

}
</style>
