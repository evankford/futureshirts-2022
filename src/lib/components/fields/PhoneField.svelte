<script lang="ts">
  import setupField from "$lib/setupField";
  import { getContext, onMount } from "svelte";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";

  import {phone, type PhoneResult} from 'phone';

  const context:FieldStore = getContext('fields');
  function validate(v:any) {
    const validatedPhone = phone(v);
    if (!validatedPhone) {
      return "Please enter a phone number";
    }
    if (required) {

      if (validatedPhone.isValid) {
        return false
      }
     return "Please enter a valid phone number.";
    }
    return false;
  }

  onMount(()=> {
    setupField(id, validate, context);
  });

  function handleChange() {
    context.update((val:Fields)=> {
      const validatedPhone = phone(phoneValue);
      if (val[id]) {
        val[id].value = validatedPhone.phoneNumber ? validatedPhone.phoneNumber : phoneValue;
        val[id].errorMsg = validate(phoneValue);
        return val;
      } else {
        throw new Error("Did not initialize first name field.");
      }
    })
  }
  let phoneActive = false, phoneValue = '';

  export let required = true, id="phone", label="Phone Number";
</script>

<FieldWrap {id}>
  <label class:filled={phoneValue != ''} class:active={phoneActive} for={id}>
    <span class="label">{label}<RequiredIndicator {required} /></span>
    <input autocomplete="tel" type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  on:focus={()=>phoneActive = true} {required} {id} on:blur={()=>{phoneActive = false}}  on:change={handleChange} bind:value={phoneValue}/>
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