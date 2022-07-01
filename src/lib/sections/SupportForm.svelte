<script lang="ts">
  import FormWrap from "$lib/components/FormWrap.svelte";
  import Name from "$lib/components/fields/Name.svelte";
  import Email from "$lib/components/fields/Email.svelte";
  import ShopSelect from "$lib/components/fields/ShopSelect.svelte";
  import Message from "$lib/components/fields/Message.svelte";
  import Text from "$lib/components/fields/Text.svelte";
  import Date from "$lib/components/fields/Date.svelte";
  import SubmitButton from "$lib/components/fields/SubmitButton.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { onMount } from "svelte";
  let emailTo: string | false = false;
  let emailOverride: string | false = false;

  onMount(()=> {
    if (!emailOverride) {
      emailTo = email
    }
  })

  $: {
    if (emailOverride) {
      emailTo = emailOverride;
    }
  }

  function processFields(f:Fields):FormData{
    let form_data = new FormData();
    form_data.append('emailTo', emailTo ? emailTo : email);
    form_data.append('formName', 'Support Form');
    const keys = Object.keys(f);
    if (keys && keys.length >= 1) {
      keys.forEach((key, i) => {
        const value = f[key].value ? f[key].value : false;
        if ( Array.isArray(value )) {
          let str = '';
          value.forEach(val=> {
            str += `<b>${val.name}</b> (${val.relation})<br><a href="mailto:${val.email}">${val.email}</a> • ${val.phone}`;
          })
          form_data.set(key, str )
        } else {
          if (f[key] && value) {
            form_data.set(key, value);
          }
        }
      })
    }
    return form_data;
  }


   const onSubmit:SubmitFunction = async (f:Fields)=> {
    try {
      const resp =  await fetch('/sendemail', {
        method: 'POST' ,
        body: processFields(f),
        // headers: {
        // 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
        // 'charset' : 'UTF-8'
        // }
      });
      const json = await resp.json();

      if (resp.status != 200) {
        let message:string | undefined = undefined;
        if (json.errors) {

         json.errors.map((error : {code: number, message: string})=>{
          message += `Error ${error.code}:   ${error.message}.<br/>`
         })
        }
        return {
          success: false,
          message
        }
      }
      return {
        success: true
      }
    } catch {
      return {
        success:false,
      }
    }
  }

  export let
    email: string,
    shops: ContactOption[],
    showOrderNumber: boolean = true,
    showOrderDate:boolean = true,
    successMessage: string,
    successTitle: string,
    errorMessage: string,
    errorTitle: string;
</script>
<FormWrap id="support" {onSubmit}>
  {#if emailTo}
  <input type="hidden" name="emailTo" value={emailOverride ? emailOverride : emailTo}/>
  {/if}
  <Name required/>
  <Email required/>
  <ShopSelect options={shops} bind:emailTo={emailOverride}/>
  {#if showOrderDate || showOrderNumber}
  <div class="row">
    {#if showOrderNumber}
    <div class="col"><Text id="orderNumber" label="Order Number" /></div>
    {/if}
    {#if showOrderDate}
    <div class="col"><Date id="orderDate" label="Order Date"/></div>
    {/if}
  </div>
  {/if}
  <Message />
  <SubmitButton>Send It<span slot="processing">Sending</span></SubmitButton>
  <div slot="success">
    {#if successTitle}<h2>{successTitle}</h2>{/if}
    {#if successMessage}<SvelteMarkdown source={successMessage}/>{/if}
  </div>
  <div slot="error">
    {#if errorTitle}<h2>{errorTitle}</h2>{/if}
    {#if errorMessage}<SvelteMarkdown source={errorMessage}/>{/if}
  </div>
</FormWrap>

<style lang="scss">
  .row {
    display: flex;
    width: calc(100% + 2 * var(--field-gap));
    margin: 0 calc(-1 * var(--field-gap));
  }
  .col {
    flex: 1 1 200px;
    margin: var(--field-gap);
  }
</style>