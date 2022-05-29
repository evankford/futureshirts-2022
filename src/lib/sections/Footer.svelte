<script lang="ts">
</script>

<footer class="site-footer">

  <div class="footer-content">

  </div>
  This is the footer
</footer>

<style lang="scss">
  @use "../styles/abstracts/mixins/wraps" as wrap;

  .footer-content {
    @include wrap.content-wrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>