<script lang="ts">
  import setupField from "$lib/setupField";
  import { slide }from "svelte/transition"
  import { getContext, onMount } from "svelte";
  import FieldWrap from "$lib/components/fields/FieldWrap.svelte";
  import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"
    import{validate as validateEmail} from 'email-validator';
  import { default as phone, type PhoneResult} from 'phone';
  import type {FieldStore, JobReference, Fields} from "../../../global";
  import Fa from 'svelte-fa/src/fa.svelte';
  const context:FieldStore = getContext('fields');

  function validateReference (r:JobReference, i: number) {
    let resp  = '';
    if (r.name == '') {
      resp += `Please enter a name for reference ${i + 1}.<br/>`
    }
    if (r.relation == '') {
      resp += `Please enter a relation for reference ${i + 1}.<br/>`
    }
    if (r.email == '') {
      resp += `Please enter an email address for reference ${i + 1}.<br/>`
    } else {
      if (!validateEmail(r.email)) {
        resp += `Please enter a valid email address for reference ${i + 1}.<br/>`
      }
    }
    if (r.phone == '') {
      resp += `Please enter a phone number for reference ${i + 1}.<br/>`
    } else {
      const validatedPhone:PhoneResult = phone(r.phone);
      if (!validatedPhone.isValid) {
        resp += `Please enter a valid phone number for reference ${i + 1}.<br/>`
      }
    }
    return resp;
  }

  function validate(v:unknown) {
    if ( !(Array.isArray(v))) {
     if (required) {
      return `Please add valid ${label}.`;
     }
     return false;
    }

    let errorString = '';

    v.forEach((r:JobReference, i:number)=> {
      const error = validateReference(r, i);
      if (error && error != '') {
        errorString+= error;
      }
    })
    return errorString != '' ? errorString : false;
  }


  let references: JobReference[] = [  ];

  function addReference(){

    references.push( {
      name: '',
      relation: '',
      email: '',
      phone: ''
    });
    references = references;

  }
  function removeReference(i:number){
    if (references[i]) {
      references.splice(i, 1);
      references = references;
    }

  }

  onMount(()=> {
    setupField(id, validate, context);
  });


  $: {
    context.update((val:Fields)=> {
      if (val[id]) {
        val[id].value = references;
        val[id].errorMsg = validate(references);
      }
      return val;
    })
  }
  export let required = false, id="references", label="References", max = 4;
</script>

<FieldWrap {id}>
  <div class="wrap">
   {#if references.length === 0}
      <div class="just-button" transition:slide>
        <button type="button" on:click={()=>{addReference();}} aria-label="Add Reference"><Fa icon={faCirclePlus}/></button>
      </div>
    {/if}
    <ul class="references">
      {#each references as reference, i}
      <li class="reference" transition:slide>
        <div class="number">
          {i + 1}
        </div>
        <div class="fields">
          <label class="name">
            <input autocomplete="off" type="text" required max={50} bind:value={reference.name}>
            <span class="label-below">Name:</span>
          </label>
          <label class="relation">
            <input autocomplete="off" type="text" required max={60} bind:value={reference.relation}>
            <span class="label-below">Relation:</span>

          </label>
          <label class="email">
            <input autocomplete="off" type="email" required bind:value={reference.email}>
            <span class="label-below">Email:</span>

          </label>
          <label class="phone">
            <input autocomplete="off" type="tel" required bind:value={reference.phone}>
            <span class="label-below">Phone:</span>
          </label>
        </div>
        <div class="buttons">
          {#if i < max }
            <button type="button" on:click={()=>{addReference();}} aria-label="Add Reference"><Fa icon={faCirclePlus}/></button>
          {/if}

            <button type="button" on:click={()=>{removeReference(i)}} aria-label="Remove Reference"><Fa icon={faCircleMinus}/></button>

        </div>
      </li>
      {/each}
    </ul>

  </div>
</FieldWrap>

<style lang="scss">
   @use "../../styles/abstracts" as *;
   @use "../../styles/elements/_fields.scss" as fields;
  .just-button{
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width:100%;
    top:-38px;

  }
   ul {

    --number-size: 32px;
    padding: 0;
    list-style: none;
     width: calc(100% + var(--number-size));
     margin: 0 0 0 calc(-1 * var(--number-size));
     @include media-query($small) {
      --number-size: 16px;
    }
   }
   .reference {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    margin: 0 0 var(--field-gap);
   }
   .number {
    @include mono;
    text-align: center;
    height: var(--number-size);
    line-height: var(--number-size);
    background: white;
    min-width: 0;
    color: black;
    margin: 0 0 auto;
    flex: 0 0 var(--number-size);
    font-size: calc(var(--number-size) * 0.5 + 2px);
   }
   .fields {
    display: flex;
    flex-wrap: wrap;
    padding-left: 6px;
    // margin-left: 6px;
    border-left: 1px solid;
    label {
      flex: 1 1 200px;
      max-width: 300px;
      margin: var(--field-gap);
    }
   }
   input {
    color: var(--field-color);
    line-height: var(--field-line-height);
    font-size: var(--field-font-size);
    font-weight: var(--field-font-weight);
    padding: var(--field-padding-y, var(--field-padding)) 4px;
    width: 100%;
    border-bottom: var(--field-border-width) solid currentColor;
   }
   button {
    @include resetButton;
    padding: 1px;
    margin: 2px;
   }
   .label-below {
    display: block;
    text-align: left;
    text-transform: lowercase;
    font-size: var(--field-label-font-size);
    @include mono;
   }
</style>
