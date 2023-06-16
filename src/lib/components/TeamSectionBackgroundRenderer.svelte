<script lang="ts">

    import type {TeamMember} from "$lib/types/sanity";
    import {urlFor} from "$lib/sanity.js";

    export let teamMembers: TeamMember[];

</script>
<div id="container">

        {#if teamMembers.length > 0 }
    <div id="list">
        {#each  teamMembers.sort(() => (Math.random() > .5) ? 1 : -1) as teamMember}
                {#if teamMember.image}
                <img alt="nada" src={urlFor(teamMember.image).width(500).format('jpg').url()}/>
            {/if}
        {/each}
    </div>
{/if}
</div>

<style lang="scss">

  @use "../styles/abstracts" as *;
  @use "sass:math";

  #list {
    width: 3400px;
    margin: -100px;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 6px 0;
    gap: 8px;
  }

  img {
    flex: 0 1 11%;
    height:400px;
    margin: 8px;
    object-fit: cover;
    list-style: none;
    position: relative;
    z-index: 2;
    overflow: hidden;
    border-radius: 8px;
  }

    #container {
      width: 3200px;
      height: 2577px;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
</style>
