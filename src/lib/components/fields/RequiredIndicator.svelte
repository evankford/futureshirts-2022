<script lang="ts">

  export let required:boolean = false;
</script>
{#if required}<span  aria-label="(Required)">*</span> {/if}
<style>
  span {
    color: var(--field-required-indicator-color);
    font-size: 0.8em;
    display: inline-block;
    vertical-align: 2px;

  }
</style>