<script lang="ts">
  import isOnScreen from "$lib/isOnScreen";
  import { contact} from "$lib/stores";
</script>
<div use:isOnScreen class="page-content">

  { contact }
</div>

<style lang="scss">
  @use "../lib/styles/abstracts" as *;

  .page-content {
    @include page-wrap;
  }
</style>
