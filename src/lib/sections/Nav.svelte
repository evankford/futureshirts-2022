<script lang="ts">
  import MenuItem from "$lib/components/MenuItem.svelte";
  export let menuItems:MenuItemShape[];

</script>

<nav>
  <ul>
    {#each menuItems as item }
      <MenuItem {item}/>
    {/each}
  </ul>
</nav>