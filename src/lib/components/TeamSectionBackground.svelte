<script lang="ts">
    import type {TeamMember} from "$lib/types/sanity";
    import Image from "$lib/components/Image.svelte";
    import { onMount } from "svelte";
    export let teamMembers:TeamMember[];

    let teamMembersSorted:TeamMember[] = teamMembers;
    onMount(()=>{
        teamMembersSorted = teamMembers.sort(() => (Math.random() > .5) ? 1 : -1);
    })

</script>

{#if teamMembersSorted.length > 0 }
<ul>
    {#each teamMembersSorted as teamMember}
        {#if teamMember.image}
        <li>
            <Image image={teamMember.image} width={200} bg/>
        </li>
        {/if}
    {/each}
</ul>
{/if}

<style lang="scss">

  @use "../styles/abstracts" as *;
    @use "sass:math";

  li{
    flex: 0 0 calc(100% / 6 - 6px);
    list-style: none;
    position: relative;
    z-index: 2;
    overflow: hidden;
    border-radius: 8px;
    &::before {
      content: '';
      display: block;
      width: 100%;
      padding: 0 0 100%;
    }
    @include media-query($widescreen) {
      &::before {
        padding: 0 0 120%;
      }

    }


    @include media-query($marge) {
      flex: 0 0 calc(12.5% - 8px);
    }
    @include media-query($widescreen) {
      flex: 0 0 calc(100% / 12 - 8px);
    }


  }
    ul {
      width: 100%;
      opacity: 0.36;
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 6px 0;
      @include media-query($large-up) {
        gap: 8px;
      }

  }

</style>
