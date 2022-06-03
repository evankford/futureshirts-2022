<script lang="ts">
  import { page } from "$app/stores";
  import Nav from "./Nav.svelte";
  import { onDestroy, onMount } from "svelte";
  import {navOpen} from "$lib/stores"



  import HeaderLogo from "$lib/components/HeaderLogo.svelte";
  import { browser } from "$app/env";
   const unsubStuff = page.subscribe(({stuff}) => {
    if (stuff.header){
      menuItems = stuff.header.menuItems;
    }
  });

  let stuck:boolean = true;
  let scrolled:boolean = false

  let lastScrollTop:number = browser ? window.scrollY : 0;

  function watchWindowScroll() {
    if (!browser) return;

    window.addEventListener('scroll', onWindowScroll);

  }

  function onWindowScroll() {
    if (!browser) return;
    const diff = window.scrollY - lastScrollTop
    if( window.scrollY > 200) {
      scrolled = true;
    } else {
      scrolled = false;
    }
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

    window.removeEventListener('scroll', onWindowScroll);
  }

  onMount(()=> {
    watchWindowScroll();
  })

  onDestroy(()=> {
    unsubStuff();
    removeWindowScroll();
  })

  export let menuItems: MenuItemShape[] | null, contactLink: ContactLink, smallMenuItems:MenuItemShape[] = [];
</script>



<header class:stuck class:scrolled class:navOpen={$navOpen} class="site-header" class:home={$page.url.pathname == '/' && !$page.error}>
  <div class="header-content">

    <div class="hide-small left">
      {#if contactLink && contactLink.title}
        <a href="/{contactLink.slug}">{contactLink.title}</a>
      {/if}
    </div>
      <div class="middle">
        <HeaderLogo/>
      </div>
    {#if menuItems && menuItems.length > 0}
    <div class="right">
      <Nav {menuItems} {smallMenuItems}/>
    </div>
    {/if}
  </div>
</header>

<style lang="scss">
  @use "../styles/abstracts" as *;
  header {
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



    &.stuck {
      transform: none
    }
    &.scrolled.stuck:not(.navOpen) {
      .right,.left,.middle {
        &::before {
          transform: scale(1)

        }
      }
    }
  }
.left, .right {
  position: relative;
  z-index: 3;
  &::before {
    @include psuedo;
    background: rgb(var(--color-base-accent));
    border-radius: 50%;

    transform: scale(0);
    transform-origin: 50% 50%;
    transition: transform 300ms 50ms ease;
    opacity: 0.75;
  }
}
.left::before {
  top: -10%;
  height: 120%;
}
.right {
  z-index: 1;
  justify-self: start;
}

.left {
  display: inline-block;
  width: auto;
  justify-self: end;
  margin: auto 6px;
}

a {
  z-index: 2;
  color: currentColor;
  @include mono;
  letter-spacing: 0;
  text-decoration: none;
  text-transform: lowercase;
  display: inline-block;
  position: relative;
  padding: 0.2em 0.8em;
 @include hoverBox;

}

.middle {
  flex: 1 1 200px;
  width: 100%;
  max-width: 440px;
  padding: clamp(12px, 4vw, 25px);
  display: block;
  z-index: 1;
  margin: auto;
  position: relative;
  .navOpen & {
    z-index:4;
  }
  &::before {
    @include psuedo;
    border-radius: 50%;
    background: rgb(var(--color-base-accent-darker));
    z-index: -1;
    width: 110%;
    height: 110%;
    left: -5%;
    top: -5%;
    transition: transform 600ms ease;
    pointer-events: none;
    transform: scale(0);

  }
}

.header-content {
  @include content-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  @include media-query($medium-up) {
      display: grid;
      grid-template-columns: 1fr 400px 1fr;
      width: 100%;

    }
}

</style>