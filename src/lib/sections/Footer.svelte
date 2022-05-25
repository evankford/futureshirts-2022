<script lang="ts">
</script>

<header >
  This is the footer
</header>

<style lang="scss">
  header {
    //Top index
    z-index: 101;

    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0.5rem;

  }
  .header-content {
    padding-left: clamp(100px, 30%, 170px);
    max-width: var(--document-width);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>