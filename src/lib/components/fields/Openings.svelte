<script lang="ts">
  import { onMount, getContext } from "svelte";
  import setupField from "$lib/setupField";
    import RequiredIndicator from "$lib/components/fields/RequiredIndicator.svelte";

  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import Select from "svelte-select";

  const context:FieldStore = getContext('fields');

  let options: Array<SelectOption>;
  function validate(v:any) {
    if (typeof v !== 'string') {
      return "Please select an opening."
    }
    return false;
  }
  onMount(()=> {
    options = openings.map((o)=>{return {value: o.title, label: o.title}});
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
    return;

  }
  let listOpen = false, value: string | false , filterText ='';

  export let id:string = "opening", openings: Opening[] = [], required:boolean = true;
</script>
<FieldWrap {id}>
  <label class:filled={value && value != '' || filterText.length > 0} class:active={listOpen} for={id}>
    <span class="label">Applying For<RequiredIndicator {required} /></span>
    <div class="select">
      <Select
      on:focus={()=>listOpen = true}
      isClearable={false} showChevron
      --chevron-box-shadow="none"
      --input-color="var(--field-color)" --icons-color="var(--field-color-semi, var(--field-color))" --icons-color-focused="var(--field-color)"
      --border-radius="var(--field-border-radius)" --background="transparent" --color="var(--field-color)" --height="calc(var(--field-line-height) + (2 * var(--field-padding-y)) + var(--field-padding-top-bump) + 2px)"
      --input-padding="calc(var(--field-padding-top-bump) + 2px + var(--field-padding-y, var(--field-padding))) var(--field-padding-x, var(--field-padding)) calc(var(--field-padding-y, var(--field-padding)) + 2px)"
      --selected-item-padding="calc(var(--field-padding-top-bump) + 2px +  var(--field-padding-y, var(--field-padding))) 0  var(--field-padding-y, var(--field-padding))"
      --border-focus-color="var(--field-focused-color)"
      placeholder=""
      items={options} {id} on:change={handleChange} bind:listOpen bind:value bind:filterText />
    </div>

  </label>
</FieldWrap>
<style lang="scss">

    @use "../../styles/elements/_fields.scss" as fields;


    :global(.svelte-select.focused ) {
      background:var(--field-focused-background-color);
      --background:var(--field-focused-background-color);
      outline: 1px solid var(--field-focused-border-color);
    }
   label {
    @include fields.label-wrap;

    &.filled .label {
      @include fields.moving-label-filled;
    }
    &.active .label {
      @include fields.moving-label-active;
    }
   }

   .select {
    @include fields.font;
   }

   .label {
    @include fields.label;
    @include fields.moving-label;
   }
</style>