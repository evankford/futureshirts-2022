<script lang="ts">
  import setupField from "$lib/setupField";
  import { getContext, onMount } from "svelte";
  import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";
  import byteSize from "byte-size";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import type {FieldStore, Fields} from "../../../global";

  const context:FieldStore = getContext('fields');
  function validate(v:unknown) {
    if (v && v instanceof File) {
      if (v.size > maxSize) {
        return `Please upload a ${label.toLowerCase()} less than ${byteSize(maxSize).toString()}.`;
      }
      return false;
    }

    if (required) {
     return `Please upload a valid ${label.toLowerCase()}`;
    }
    return false;
  }

  function truncate(str:string, n = 25){
    return (str.length > n) ? str.substring(0, n-1) + '&hellip;' : str;
  }

  onMount(()=> {
    setupField(id, validate, context);
  });
  let uploadValue:unknown = '';


  function processFileList(u: unknown) {
    if (u instanceof FileList) {
      return u[0];
    }
    return false;

  }

  function handleChange() {
    //Use settimeout to allow the async file thing to work.
    setTimeout(() => {
      const file = processFileList(uploadValue);
      if (!file) return;
      context.update((val:Fields)=> {
        if (val[id]) {
          val[id].value = file
          val[id].errorMsg = validate(file);
          return val;
        } else {
          throw new Error(`Did not initialize ${id} field.`);
        }
      })
    }, 20);
  }
  export let required = true, id="upload", label="Upload", maxSize = 2000000, accept=".pdf", uploading=false, uploaded=false;
</script>

<FieldWrap {id}>
  <div class="wrap">
    <span class="label">{label}<RequiredIndicator {required} /></span>
    <input type="file" {accept} {required} {id} on:change={handleChange}  bind:files={uploadValue}/>
    <label class="faux-input" for={id}>{@html uploadValue.length === 1 ? truncate(uploadValue[0].name) : 'Upload File' }</label>
    <small class="footer">Accepts {accept} files. Max size {byteSize(maxSize).toString()}</small>
    {#if uploading}Uploading{/if}{#if uploaded}Uploaded{/if}
  </div>
</FieldWrap>

<style lang="scss">
   @use "../../styles/abstracts" as *;
   @use "../../styles/elements/_fields.scss" as fields;

   input {
    @include visually-hidden;
    // @include fields.base;
   }
   .faux-input {
    @include fields.inputOutside;
    display: inline-block;
    width: auto;
    min-width: min(200px,calc( 100% - 10px));
    margin-right: 10px;
    input:focus + & {
      background: var(--field-focused-background-color);
      outline: 1px solid var(--field-focused-border-color);
    }
   }

   .label {
    margin-top: var(--field-padding-top-bump, 6px);
    display: block;
    @include fields.label;
    // @include fields.moving-label;
   }
</style>
