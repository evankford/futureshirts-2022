<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { slide, fade } from "svelte/transition";
  import { writable, type Writable, derived, type Readable} from "svelte/store";




  function handleFailure(msg: string | undefined = undefined) {
    processing.set(false);
    formSuccess.set(false);
    formError.set(msg ? msg : true);
  }

  function handleError(e:Error | null) {
    processing.set(false);
    formSuccess.set(false);
    formError.set(e ? `Error ${e.name}: ${e.message}` : true);
  }

  function handleSuccess() {
    processing.set(false);
    formError.set(false);
    formSuccess.set(true );
  }

  let handleSubmit = () => {
    processing.set(true);
    submittedFields.set($fields);
    console.log("Handle submit function not initialized.")
  }

  onMount(()=> {
    handleSubmit = ()=> {
      //get fields
      let currentFields:Fields = {};
      const unsubFields = fields.subscribe((val:Fields)=>{currentFields = val});
      unsubFields();
      //
      submitted.set(true);
      processing.set(true);

      onSubmit(currentFields).then((r:SubmitResponse)=>{

        if ( r.success) {
          handleSuccess();
        } else {
          handleFailure(r.message);
        }
      }).catch(e=> {
        handleError(e);
      })

    }
    submitForm.set(handleSubmit);
  })

  const fields:FieldStore= writable({});
  const submitted:Writable<boolean> = writable(false);

  const submittedFields:FieldStore=  writable({});
  const changed:Readable<boolean> = derived([fields, submittedFields], ([$fields, $submittedFields]) => {
    return $fields == $submittedFields;
  })
  const valid:Readable<boolean> = derived(fields, ($fields:Fields)=> {
    return Object.values($fields).filter(val=>val.errorMsg).length == 0;
  });
  const processing:Writable<boolean> = writable(false);
  const submitForm: Writable<()=>void> = writable(handleSubmit);
  const formError:Writable<boolean|string> = writable(false);
  const formSuccess:Writable<boolean > = writable(false);
  const ready:Readable<boolean> = derived([valid, processing], ([$valid, $processing])=>$valid && !$processing);


  setContext('submitForm',submitForm);
  setContext('fields', fields);
  setContext('submittedFields', fields);
  setContext('ready', ready);
  setContext('valid', valid);
  setContext('changed', changed);
  setContext('processing', processing);
  setContext('submitted', submitted);
  setContext('formError', formError);
  setContext('formSuccess', formSuccess);


  export let id:string, onSubmit:SubmitFunction;
</script>
<form {id} class:successful={$formSuccess}  class:errorfull={$formError} on:submit={(e)=>{e.preventDefault(); handleSubmit(); return false;}} class:ready={$ready} class:valid={$valid}>
  {#if $$slots.success && $formSuccess }
  <div transition:fade class="success"><slot name="success"/></div>
  {/if }
  <div transition:slide class="main">
    <slot></slot>
  </div>

  {#if $$slots.error && $formError }
    <div transition:slide class="error">
      <slot name="error" />
      {#if typeof $formError == 'string'}
        {@html $formError}
      {/if}
    </div>
  {/if}
  <!-- <div class="helper">
    <div class="item">Valid: {$valid}</div>
    <div class="item">Submitted: {$submitted}</div>
    <div class="item">Ready: {$ready}</div>
  </div> -->
</form>

<style lang="scss">
  form {
    position: relative;

  }
  .successful .main {
    pointer-events: none;
    opacity: 0.2;
  }

  .success {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error {
    margin: 20px 0;
    padding: 20px;
    background: rgb(var(--color-error));
    border-radius: var(--field-border-radius);
    display: block;
    color: white;
  }
  // .helper {
  //   color: black;
  // }
</style>