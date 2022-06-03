<script lang="ts">
import type { ListItemComponentProps } from "@portabletext/svelte";


    export let portableText:ListItemComponentProps<{ _type: string}>;
</script>

{#each portableText.value.children as liItem}
<li>{liItem.text}</li>
{/each}