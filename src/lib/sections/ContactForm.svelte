<script lang="ts">
  import FormWrap from "$lib/components/FormWrap.svelte";
  import Name from "$lib/components/fields/Name.svelte";
  import Email from "$lib/components/fields/Email.svelte";
  import Topic from "$lib/components/fields/Topic.svelte";

  import Message from "$lib/components/fields/Message.svelte";
  import SubmitButton from "$lib/components/fields/SubmitButton.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import type {EmailOptionShape, ContactOption} from "$lib/types/sanity";
  import type {ContactData, Fields, SubmitFunction} from "../../global";
  let emailOverride: EmailOptionShape[] | false = false;

  function collectEmails(){
    const emailToArray:string[] = [];
      if (email) {
        email.forEach( a => {
          emailToArray.push(a.email);

        }
        )
      }
      if (emailOverride) {
        emailOverride.forEach(e=> {
          emailToArray.push(e.email)
        })
      }

      return emailToArray;
  }
   const onSubmit:SubmitFunction = async (f:Fields)=> {
    const data:ContactData={
      name: f.name.value,
      email:f.email.value,
      topic: f.topic.value,
      message: f.message.value,
      formName: 'Contact Form',
      emailTo: emailTo ?? collectEmails()
    }
    try {
      const resp =  await fetch('/sendemail', {
        method: 'POST' ,
        body: JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const json = await resp.json();
      if (resp.status != 200) {

        if (json.errors) {
         json.errors.map((error : {code: number, message: string})=>{
          errorTitle+=error.code
          errorMessage += `<br/>${error.message}.<br/>`
         })
        }
        errorTitle="Failed with no errors"
        errorMessage ="Failed with no errors"
        errorMessage+=JSON.stringify(json);
        return {
          success: false,
        }
      }
      return {
        success: true
      }
    } catch(e) {
      errorTitle="Caught";
      errorMessage+= `<br/> Error ${e}:.<br/>`
      return {
        success:false,
      }
    }
  }

  export let
    email: undefined|EmailOptionShape[] = undefined,
    contactOptions: ContactOption[] | undefined = undefined,
    successMessage = "Thanks for your message. We'll be in touch.",
    successTitle = "Got it!",
    errorMessage = "Something went wrong with sending your message. Please refresh the page and try again.",
    errorTitle = "Whoops!",
    widget = false,
    emailTo: string[] | undefined = undefined
  ;
</script>
<FormWrap id="contact" {onSubmit}>

  <Name required/>
  <Email required/>
  {#if !widget || !contactOptions}
  <Topic topics={contactOptions} bind:emailTo={emailOverride}/>
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

