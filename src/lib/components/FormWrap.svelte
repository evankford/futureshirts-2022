<script lang="ts">
import { faGameConsoleHandheld } from "@fortawesome/pro-regular-svg-icons";

import { onDestroy, setContext } from "svelte";
import { writable, type Writable, derived, type Readable} from "svelte/store";
  const fields:FieldStore= writable({});
  const submittedFields:FieldStore=  writable({});
  const changed:Readable<boolean> = derived([fields, submittedFields], ([$fields, $submittedFields]) => {
    return $fields == $submittedFields;
  })
  const valid:Readable<boolean> = derived(fields, ($fields:Fields)=> {
    return Object.values($fields).filter(val=>val.errorMsg).length >=1;
  });
  const processing:Writable<boolean> = writable(false);
  const submitted:Writable<boolean> = writable(false);
  const ready:Readable<boolean> = derived([valid, processing], ([$valid, $processing])=>$valid && !$processing);

  function handleSubmit() {
    processing.set(true);
    submittedFields.set($fields);

  }

  function handleFailure() {

  }

  function handleSuccess() {

  }

  setContext('handleSubmit', handleSubmit);
  setContext('fields', fields);
  setContext('submittedFields', fields);
  setContext('ready', ready);
  setContext('valid', valid);
  setContext('changed', changed);
  setContext('processing', processing);
  setContext('submitted', submitted);


  export let id:string;
</script>
<form {id} on:submit={handleSubmit} class:ready={$ready}>
  <slot></slot>
</form>