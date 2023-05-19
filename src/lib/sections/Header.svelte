<script lang="ts">
  import { page } from "$app/stores";
  import Nav from "./Nav.svelte";
  import { onDestroy, onMount } from "svelte";
  import {navOpen} from "$lib/stores"
  import HeaderLogo from "$lib/components/HeaderLogo.svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import throttle from "$lib/throttle";
  import type {ContactLink, MenuItemShape} from "$lib/types/sanity";
  let hasHeroImage = false;

  afterNavigate(()=> {
    setTimeout(() => {
      hasHeroImage = browser && document.body.querySelector('.image-hero') != null;
    }, 500);
  })

  let stuck = true;
  let scrolled = false

  let lastScrollTop:number = browser ? window.scrollY : 0;

  function watchWindowScroll() {
    if (!browser) return;
    window.addEventListener('scroll', throttleScroll);
  }

  const throttleScroll = throttle( onWindowScroll, 100);
  function onWindowScroll() {
    if (!browser) return;
    const diff = window.scrollY - lastScrollTop
    scrolled = window.scrollY > 200;
    if (diff > 60) {
      stuck = false;
      lastScrollTop = window.scrollY;
    } else {
      if (diff < -60) {
        stuck = true;
        lastScrollTop = window.scrollY;
      }
    }
  }

  function removeWindowScroll() {
    if (!browser) return;

    window.removeEventListener('scroll', throttleScroll);
  }

  onMount(()=> {
    hasHeroImage = browser && document.body.querySelector('.image-hero') != null;
    watchWindowScroll();
  })

  onDestroy(()=> {
    removeWindowScroll();
  })

  export let menuItems: MenuItemShape[] | null, contactLink: ContactLink, smallMenuItems:MenuItemShape[] = [];
</script>
<header class:stuck class:scrolled class:navOpen={$navOpen} class="site-header" class:home={(hasHeroImage && !$page.error)}>
  <div class="header-content">
    <div class="left">
      <HeaderLogo/>
    </div>

    <div class="right">
      {#if contactLink && contactLink.title}
        <a href="{contactLink.slug}">{contactLink.title}</a>
      {/if}
      <Nav {menuItems} {smallMenuItems}/>
    </div>
  </div>
</header>

<style lang="scss">
  @use "../styles/abstracts" as *;
  header {
    --pad:  clamp(12px, 4vw, 25px);
    position: fixed;
    width: 100%;
    height: auto;
    top: 0;
    z-index: 100;
    transition: color 700ms ease, transform 300ms ease;
    color: rgb(var(--color-base-text));
    transform: translateY(-101%);
    &.home, &.navOpen {
      color: rgb(var(--color-base-background));
    }

    &::before {
      @include psuedo;
      transition: transform 200ms 100ms linear;
      background: rgba(0,0,0,0.9);
      height: calc( 100% - var(--pad));
      transform: translateY(-100%);
    }


    &.stuck {
      transform: none;
    }
    &.scrolled.stuck:not(.navOpen) {
      color: white;
      .header-content {
        //noinspection CssInvalidFunction
        transform: translateY(calc(-0.5 * var(--pad, 12px)));
      }
      &::before {
        transform: translateY(0)
      }
    }
  }

  .left, .right {
    position: relative;
    z-index: 3;
  }

  .right {
    z-index: 1;
    justify-self: end;
    align-items: center;
    display: flex;
    @include media-query($small) {
      margin-right: 10px;
    }
  }


  a {
    z-index: 2;
    color: currentColor;
    @include mono;
    font-size: 17px;
    letter-spacing: 0;
    text-decoration: none;
    text-transform: lowercase;
    display: none;
    position: relative;
    margin: var(--pad);
    padding: 0.3em;
    @include media-query($medium-up) {
      display: inline-block;
    }
  @include hoverBox(none, true);
    --color-accent: var(--color-base-accent-lighter);
    --color-accent-inverse: var(--color-base-accent-darker);

  }


  .left {

    flex: 1 1 200px;
    width: 100%;
    max-width: 230px;
    padding: var(--pad);
    @include media-query($medium-up){
      max-width: 300px;
      padding: var(--pad) var(--pad) var(--pad) 0;
    }
    display: block;
    z-index: 1;
    margin: auto auto auto 0;
    position: relative;
    .navOpen & {
      z-index:4;
    }

  }

  .header-content {
    @include content-wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 200ms linear;
    @include media-query($medium) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    @include media-query($small) {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }

    @include media-query($medium-up) {
        display: grid;
        grid-template-columns: 300px 1fr;
        width: 100%;
      }
  }

</style>
