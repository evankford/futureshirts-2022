<script lang="ts">
  export let item:MenuItemShape;
</script>
<li>
  {#if (item.linkUrl.openInNewTab == true && item.linkUrl.type == 'external') }
    <a href="{item.linkUrl.url}"  target="_blank" rel="nofollow noopener noreferrer">{item.title}</a>
  {:else}
    <a href="{item.linkUrl.url}">{item.title}</a>
  {/if}
</li>