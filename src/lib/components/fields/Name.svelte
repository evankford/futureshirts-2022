<script lang="ts">
  import setupField from "$lib/setupField";
  import { getContext, onMount } from "svelte";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  const context:FieldStore = getContext('fields');

  function validate(v:any) {
    if (required) {
     if (typeof v == 'string' && v.length >=2) {
      return false
     }
     return "Please enter your name.";
    }
    return false;
  }

  onMount(()=> {
    setupField(id, validate, context);

  });

  function handleChange() {
    context.update((val:Fields)=> {
    if (val[id]) {
        val[id].value = firstName + ' ' + lastName;
        val[id].errorMsg = validate(firstName + ' ' + lastName);
        return val;
      } else {
        throw new Error("Did not initialize first name field.");
      }
    })
  }

  let firstActive = false, lastActive = false, firstName = "", lastName = "";

  export let required = false, id="name";
</script>

<FieldWrap {id}>
  <div class="flex">
    <div class="sub-field" class:filled={firstName != ''} class:active={firstActive}>
      <input on:change={handleChange} bind:value={firstName} type="text" on:focus={()=>firstActive = true} on:blur={()=>firstActive = false}  id="{id}_first" {required}/>
      <label for="{id}_first" class="sub-label">First Name</label>
    </div>
    <div class="sub-field" class:filled={lastName != ''} class:active={lastActive}>
      <input on:change={handleChange} bind:value={lastName} type="text" on:focus={()=>lastActive = true} on:blur={()=>lastActive = false} id="{id}_last" {required}/>
      <label for="{id}_last" class="sub-label">Last Name</label>
    </div>
  </div>
</FieldWrap>

<style lang="scss">
  @use "../../styles/elements/_fields.scss" as fields;
  .flex {

    width: calc(100% + var(--field-gap));
    margin-right: calc(-1px * var(--field-gap));
    // margin-bottom: calc(-1px * var(--field-gap));
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
  }
  input {
    @include fields.base;
  }
  .sub-field {
    flex: 1 1 180px;
    margin-right: var(--field-gap);
    @include fields.label-wrap;

    &.filled label {
      @include fields.moving-label-filled;
    }
    &.active label {
      @include fields.moving-label-active;
    }

    label {
      @include fields.label;
      @include fields.moving-label;
    }
  }
</style>
