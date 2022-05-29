<script lang="ts">
  import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
  import { page } from "$app/stores";
  import Nav from "./Nav.svelte";
  import { onDestroy } from "svelte";

   let menuItems:MenuItemShape[] = [], logo:SanityImageObject|false = false, logoOverlay:SanityImageObject | false= false;

   const unsubStuff = page.subscribe(({stuff}) => {
    if (stuff.header){
      menuItems = stuff.header.menuItems;
      logo = stuff.header.staticLogo;
      logoOverlay = stuff.header.staticLogoOverlay
    }
  });

  onDestroy(()=> {
    unsubStuff();
  })

</script>
{#if menuItems.length > 0}
<Nav {menuItems}/>
{/if}


<header>
  <div class="header-content">

    This is the header
  </div>
</header>

<style lang="scss">

</style>