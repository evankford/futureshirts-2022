<script lang="ts">
import FormWrap from "$lib/components/FormWrap.svelte";
import Name from "$lib/components/fields/Name.svelte";
import Email from "$lib/components/fields/Email.svelte";
import SubmitButton from "$lib/components/fields/SubmitButton.svelte";
</script>
<FormWrap id="contact">
  <Name required/>
  <Email/>
  <SubmitButton>Submit<span slot="processing">Processing</span></SubmitButton>
</FormWrap>