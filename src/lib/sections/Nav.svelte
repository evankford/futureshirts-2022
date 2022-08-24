<script lang="ts">
  import Socials from "$lib/components/Socials.svelte";
  import MenuItem from "$lib/components/MenuItem.svelte";
  import {navOpen} from "$lib/stores"
  import {browser} from "$app/env"
  import Fa from "svelte-fa";
  import {faBarsSort, faXmark} from "@fortawesome/pro-regular-svg-icons";
  import { fly } from "svelte/transition";
  import {hasJobs} from "$lib/stores";
  import { onDestroy } from "svelte";

const unsubNav = navOpen.subscribe(val=> {
  if (browser) {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
})

  onDestroy(()=> {
    unsubNav();
  })

  export let menuItems:MenuItemShape[], smallMenuItems:MenuItemShape[] = [];
</script>


<button class="nav-toggle" class:navOpen={$navOpen} on:click={()=>{$navOpen = !$navOpen}}>
  {#if $navOpen}
    <span transition:fly={{x: 60}}><Fa icon={faXmark} /></span>
  {:else}
    <span transition:fly={{x: 60}}><Fa icon={faBarsSort} /></span>
  {/if}
</button>
<nav class:navOpen={$navOpen} aria-hidden={!$navOpen}>
  <ul class="main">
    {#each menuItems as item }
      <MenuItem inNav {item}/>
    {/each}
</ul>
  {#if smallMenuItems.length > 0}
  <ul class="small">
    {#each smallMenuItems as item }
      <MenuItem inNav {item}/>
    {/each}
     {#if $hasJobs}
    <MenuItem inNav item={{title: 'Careers', linkUrl: {openInNewTab: false,type:'internal' , url: '/jobs', } }} />
    {/if}
  </ul>
  {/if}
  <div class="nav-socials" >
    <Socials inNav/>
  </div>
</nav>

<style lang="scss">
  @use "../styles/abstracts" as *;

  .nav-toggle {
    @include resetButton;
    --buttonSize: 40px;
    color: currentColor;
    font-size: calc(0.5 * var(--buttonSize) + 2px);
    position: relative;
    right: 0;
    top: 0;
    width: var(--buttonSize);
    transition: color 600ms ease;
    height: var(--buttonSize);
    text-align: center;
    @include media-query($small) {
      --buttonSize: 36px;
    }
    @include media-query($tiny) {
      --buttonSize: 32px;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: calc(-0.25 * var(--buttonSize)) calc(-0.25 * var(--buttonSize) + 2px);
    }
    overflow: hidden;
    z-index: 2;
    display: inline-block;
    transition: color 200ms ease;
    &:hover, &:focus-visible {
      color: white;
      &:after {
        transform: translateY(0)
      }

    }
    &::after {
      @include psuedo();
      z-index: -1;
      background-color: rgb(var(--color-accent));
      transition: transform 300ms ease;
      transform: translateY(calc(100% + 1px));
    }
  }

  .navOpen.nav-toggle {
    color: rgb(var(--color-base-background));
  }


  nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 120px 30px 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    left: 0;
    color: inherit;
    --menu-link-padding: 0;
    margin: auto 0 auto auto;
    pointer-events:  none;
    overflow: hidden;
    &::before {
      @include psuedo;
      background: rgba(var(--color-base-accent-darker), 0.95);
      transition: transform 600ms ease;
      transform: translateY(-101%)

    }
    &.navOpen::before {
      transform: translateY(0)
    }
    &.navOpen {
      overflow: auto;
      color: rgb(var(--color-base-background));
      pointer-events: all;
    }

  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    z-index: 2;
    text-align: left;
    width: auto;

     font-size: 18px;
    @include media-query($large-up) {
      font-size: 21px;
    }

    &.small {
        font-size: 0.8em;
        margin: 1em 0;
        opacity: 0.8;
    @include media-query($large-up) {
      font-size: 18px;
    }
    }
  }
  .nav-socials {
    opacity: 0;
    transition: transform 300ms ease, opacity 300ms ease;
    transform: translateY(10px);
    font-size: 18px;
    margin: 0;
    padding: 0.4em;
    .navOpen &  {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  ul, .nav-socials {
      width: 100%;
    max-width: 500px;
  }



</style>