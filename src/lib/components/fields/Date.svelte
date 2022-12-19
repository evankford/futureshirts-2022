<script lang="ts">
  import setupField from "$lib/setupField";
  import { getContext, onMount } from "svelte";
  import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";

  const context:FieldStore = getContext('fields');

  function validate(v:any) {
    if (required) {
     return `Please enter a ${label}.`;
    }
    return false;
  }

  onMount(()=> {
    setupField(id, validate, context);
  });

  function handleChange() {
    context.update((val:Fields)=> {
      if (val[id]) {
        val[id].value = value;
        val[id].errorMsg = validate(value);
        return val;
      } else {
        throw new Error("Did not initialize first name field.");
      }
    })
  }
  let textActive = false;
  export let required = false, id="email", value = '', label="Email Address";
</script>

<FieldWrap {id}>
  <label class:filled={value != ''} class:active={textActive} for={id}>
    <span class="label">{label}<RequiredIndicator {required}/></span>
    <input type="date" on:focus={()=>textActive = true} {required} {id} on:blur={()=>{textActive = false}}  on:change={handleChange} bind:value/>
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
    color: transparent;
    .active &, .filled &, &:focus {

      color: inherit;
    }
   }

   .label {
    @include fields.label;
    @include fields.moving-label;
   }
</style>
