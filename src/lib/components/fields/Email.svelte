<script lang="ts">
    import setupField from "$lib/setupField";
  import { getContext, onMount } from "svelte";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import * as EmailValidator from 'email-validator';

  const context:FieldStore = getContext('fields');

  function validate(v:any) {
    if (required) {
      if (EmailValidator.validate(emailValue)) {
        return false
      }
     return "Please enter a valid email address.";
    }
    return false;
  }

  onMount(()=> {
    setupField(id, validate, context);
  });

  function handleChange() {
    context.update((val:Fields)=> {
      if (val[id]) {
        val[id].value = emailValue;
        val[id].errorMsg = validate(emailValue);
        return val;
      } else {
        throw new Error("Did not initialize first name field.");
      }
    })
  }
  let emailActive = false, emailValue = '';

  export let required = true, id="email", label="Email Address";
</script>

<FieldWrap {id}>
  <label class:filled={emailValue != ''} class:active={emailActive} for={id}>
    <span class="label">{label}</span>
    <input type="email" on:focus={()=>emailActive = true} {required} {id} on:blur={()=>{emailActive = false}}  on:change={handleChange} bind:value={emailValue}/>
  </label>
</FieldWrap>

<style lang="scss">
   @use "../../styles/elements/_fields.scss" as fields;

   label {
    @include fields.label-wrap;

    &.filled .label {
      @include fields.moving-label-filled;
    }
    &.active .label {
      @include fields.moving-label-active;
    }
   }

   input {
    @include fields.base;
   }

   .label {
    @include fields.label;
    @include fields.moving-label;
   }
</style>