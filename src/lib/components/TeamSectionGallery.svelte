<script lang="ts">
    import type {TeamMember} from "$lib/types/sanity";
    import Image from "$lib/components/Image.svelte";
    import {onDestroy, onMount} from "svelte";
    import {writable} from "svelte/store";
    import type {SanityImageObject} from "@sanity/image-url/lib/types/types";
    import {fade} from "svelte/transition";
    export let teamMembers:TeamMember[];
    const numberOfCards = 9;
    const cards:number[] = Array(numberOfCards).fill(1).map((element, index) => index)
        .sort(() => (Math.random() > .5) ? 1 : -1);
    let currentOffset=writable<number>(0);
    function getDividedImages(index:number):SanityImageObject[] {

        let arr:SanityImageObject[] = [];

        for (let i=index; i < teamMembers.length; i += numberOfCards) {
            arr.push(teamMembers[i].image);
        }
        return arr;
    }

    function nextOffset(){
        currentOffset.update((old)=>{
            if (old + 1 < Math.floor(teamMembers.length / numberOfCards )){
                return old + 1
            }
            return 0
        })
    }
  let slideInterval: ReturnType<typeof setInterval>;
    let teamMembersSorted:TeamMember[] = [];
    onMount(()=>{
        teamMembersSorted = teamMembers.sort(() => (Math.random() > .5) ? 1 : -1);
        nextOffset();
        slideInterval = setInterval(nextOffset, 900*9);
    })
    onDestroy(()=>{
        clearInterval(slideInterval);
        }
    );
</script>

{#if teamMembersSorted.length > 0 }
<ul>
<!--    Create 6 cards to work with-->
    {#each cards as cardIndex}
        <li>
            {#each getDividedImages(cardIndex) as image, index}
                {#if index === $currentOffset }
                    <div transition:fade|local={{delay: cardIndex * 900, duration: 500}} class="transitioner">
                        <Image {image} width={600} bg/>
                    </div>
                {/if}
            {/each}
        </li>
    {/each}
</ul>
{/if}

<style lang="scss">

  @use "../styles/abstracts" as *;

  .transitioner{
    @include psuedoish;
  }
  li{
    list-style: none;
    padding: 0;
    position: relative;
    z-index: 2;
    overflow: hidden;
    border-radius: 8px;
    &::before{
      display: block;
      position: relative;
      padding-bottom: 75%;
      content: '';
      width: 100%;
    }

    @include media-query($medium-up){
      &::before{
        padding-bottom:110%;
      }
    }
  }
    ul {
      width: auto;
      display:grid;
      gap: 8px;
      position: relative;
      grid-template: repeat(3,auto) / repeat(3, 1fr);
      margin: 16px;
      @include media-query($medium-up) {
        margin: 30px;
        overflow: hidden;
        border-radius: 50px;
        box-shadow: 15px 15px 0 rgba(var(--color-base-accent-darkest), 0.5);
      }
      &::before{
        @include psuedo;
        z-index: 0;
        left: 15px;
        top: 15px;
        border-radius: 16px;
        width: calc(100% - 30px);
        background: rgb(var(--color-base-accent-darkest));
        @include media-query($medium-up) {
          width: 100%;
          left: 30px;
          top: 30px;
          border-radius: 50px;
        }
      }
  }

</style>
