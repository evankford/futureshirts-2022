<script lang="ts">
  import FormWrap from "$lib/components/FormWrap.svelte";
  import Name from "$lib/components/fields/Name.svelte";
  import Email from "$lib/components/fields/Email.svelte";
  import Topic from "$lib/components/fields/Topic.svelte";

  import Message from "$lib/components/fields/Message.svelte";
  import SubmitButton from "$lib/components/fields/SubmitButton.svelte";
  import SvelteMarkdown from "svelte-markdown";
  let emailOverride: EmailOptionShape[] | false = false;

  function collectEmails(){
    const emailToArray:string[] = [];
      email.forEach( a => {
        emailToArray.push(a.email);

      }
      )
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
      emailTo: collectEmails()
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
        let message:string | undefined = undefined;

        if (json.errors) {
         json.errors.map((error : {code: number, message: string})=>{
          message += `<br/> Error ${error.code}:   ${error.message}.<br/>`
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
    } catch(e) {
      console.log(e);
      return {
        success:false,
        message : `<br/> Error ${e}:.<br/>`
      }
    }
  }

  export let
    email: EmailOptionShape[],
    contactOptions: ContactOption[],
    successMessage: string,
    successTitle: string,
    errorMessage: string,
    errorTitle: string;
</script>
<FormWrap id="contact" {onSubmit}>

  <Name required/>
  <Email required/>
  <Topic topics={contactOptions} bind:emailTo={emailOverride}/>
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

