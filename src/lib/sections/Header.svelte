<script lang="ts">
  import { page } from "$app/stores";
  import Nav from "./Nav.svelte";
  import { onDestroy, onMount, tick, } from "svelte";
  import {navOpen} from "$lib/stores"

  import HeaderLogo from "$lib/components/HeaderLogo.svelte";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import throttle from "$lib/throttle";
  let hasHeroImage = false;
  afterNavigate(()=> {
    setTimeout(() => {
      hasHeroImage = browser && document.body.querySelector('.image-hero') != null;
    }, 600);
  })


  let stuck:boolean = true;
  let scrolled:boolean = false

  let lastScrollTop:number = browser ? window.scrollY : 0;

  function watchWindowScroll() {
    if (!browser) return;

    window.addEventListener('scroll', throttleScroll);

  }
  const throttleScroll = throttle( onWindowScroll, 100);
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



<header class:stuck class:scrolled class:navOpen={$navOpen} class="site-header" class:home={hasHeroImage && !$page.error}>
  <div class="header-content">

    <div class="hide--small left">

      {#if contactLink && contactLink.title}
        <a href="{contactLink.slug}">{contactLink.title}</a>
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
        transform: translateY(calc(-0.5 * var(--pad)));
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
  justify-self: start;
  @include media-query($small) {
    margin-right: 10px;
  }
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
  @include media-query($medium) {
    font-size: 16px;
    padding: 0
  }
 @include hoverBox;

}


.middle {

  flex: 1 1 200px;
  width: 100%;
  max-width: 350px;
  padding: var(--pad);
  display: block;
  z-index: 1;
  margin: auto;
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
      grid-template-columns: 1fr 400px 1fr;
      width: 100%;
    }
}

</style>