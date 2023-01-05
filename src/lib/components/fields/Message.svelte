<script lang="ts">
  import { getContext, onMount } from "svelte";
  import setupField from "$lib/setupField";
  import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";

  import FieldWrap from "./FieldWrap.svelte";
  const context = getContext<FieldStore>('fields');
  function validate(v:any) {
    if (typeof v == 'string' && v.length >= 1) {
      return false
    }
    return "Please enter your message"
  }
  let value= "",
  active = false

  function handleKeyDown(e:KeyboardEvent) {
    const metaKeys = ['Meta' , 'Shift', 'Alt', 'Control'];
    if (metaKeys.includes(e.key)) {
      return;
    }
    handleChange();
  };

  function handleChange() {
    context.update((val:Fields)=> {
      if (val[id]) {
        val[id].value = value;
        val[id].errorMsg = validate(value);
        return val;
      } else {
        throw new Error("Did not initialize message field.");
      }
    })
  }

  onMount(()=> {
    setupField(id, validate, context);
  })
  export let id:string = "message", required: boolean = true;
</script>
<FieldWrap {id}>
  <label for={id} class:active class:filled={value.length >= 1}>
    <div class="label">Your Message<RequiredIndicator {required} /></div>
    <textarea on:keydown={handleKeyDown} on:change={handleChange} on:focus={()=>active = true} on:blur={()=>active=false} bind:value rows=5 />
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

   textarea {
    @include fields.base;
    font-weight: 600;

   }


   .label {
    @include fields.label;
    @include fields.moving-label;
   }
</style>
