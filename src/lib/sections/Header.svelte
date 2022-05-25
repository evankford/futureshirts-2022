<script lang="ts">
  import HeaderLogo from "$lib/components/HeaderLogo.svelte";
  import Nav from "./Nav.svelte";
</script>

<header class:isIntro={$isIntro}>
  <div class="header-content">
    <HeaderLogo />
    <Nav/>
  </div>
</header>

<style lang="scss">

</style>