<script lang="ts">
  import { slide } from "svelte/transition";
  import { onMount, getContext } from "svelte";
  import setupField from "$lib/setupField";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import Select from "svelte-select";
  import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";

  import SvelteMarkdown from "svelte-markdown";

  const context:FieldStore = getContext('fields');

  type SelectOption = {value: string, label: string}
  let selectOptions: Array<SelectOption>;
  let currentMessage:string | false = false;
  function validate(v:any) {
    if (typeof v !== 'string') {
      return "Please select a topic"
    }
    return false;
  }
  onMount(()=> {
    selectOptions = options.map((o)=>{return {value: o.title, label: o.title}});
    setupField(id, validate, context );
  });

  function handleChange(e: CustomEvent<{ detail:SelectOption , [x: string | number | symbol]: unknown }>) {
    if (e.detail) {
      context.update((val:Fields) => {
        if (val[id]) {
          val[id].value = e.detail.value as string;
          val[id].errorMsg = validate(e.detail.value);
        }
        return val
      });
    }
    const matched = options.find(o=> o.title == e.detail.value);
    currentMessage = matched?.message ? matched.message : false;
    emailTo =  matched?.email ? matched.email : false;
    return;

  }
  let listOpen = false, value: string | false , filterText ='';

  export let options: ContactOption[] = [], emailTo:false|string = false, id: string = "shop", required:boolean = true;
</script>
<FieldWrap {id}>
<label class:filled={value && value != '' || filterText.length > 0} class:active={listOpen} for={id}>
  <span class="label">Order from<RequiredIndicator {required} /></span>
  <div class="select">
    <Select
     isClearable={false} showChevron
     --chevron-box-shadow="none"
     --input-font-size="var(--field-font-size)"
     --placeholder-color={listOpen  ? '--var(--field-color)' : 'rgba(0,0,0,0)'}
    --input-color={listOpen  ? '--var(--field-color)' : 'rgba(0,0,0,0)'} --icons-color="var(--field-color-semi, var(--field-color))" --icons-color-focused="var(--field-color)"
    --border="var(--field-border-width) solid var(--field-border-color)"
    --border-radius="var(--field-border-radius)" --background="transparent" --color="var(--field-color)" --height="calc(var(--field-line-height) + (2 * var(--field-padding-y)) + var(--field-padding-top-bump) + 2px)"
    --input-padding="calc(var(--field-padding-top-bump) + 2px + var(--field-padding-y, var(--field-padding))) var(--field-padding-x, var(--field-padding)) calc(var(--field-padding-y, var(--field-padding)) + 2px)"
    --selected-item-padding="calc(var(--field-padding-top-bump) + 2px +  var(--field-padding-y, var(--field-padding))) 0  var(--field-padding-y, var(--field-padding))"
    --border-focus-color="var(--field-color)"
    placeholder="Search for a shop"
    items={selectOptions} {id} on:change={handleChange} bind:listOpen bind:value bind:filterText />
  </div>
  {#if currentMessage}
    <div transition:slide class="message"><SvelteMarkdown source={currentMessage}/></div>
  {/if}
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

    --input-color: transparent;

    &.active, &.filled {
      --input-color: currentColor;
    }
   }

   .select {
    @include fields.font;
   }

   .message {
    font-weight: 400;
    margin: 8px auto 0;
    line-height: 1.2;
   }

   :global(.message p) {
    margin: 0.8em 0;
    line-height: 1.2;
   }

   .label {
    @include fields.label;
    @include fields.moving-label;
   }
</style>