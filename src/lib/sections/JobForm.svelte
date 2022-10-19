<script lang="ts">
  import FormWrap from "$lib/components/FormWrap.svelte";
  import Name from "$lib/components/fields/Name.svelte";
  import Email from "$lib/components/fields/Email.svelte";
  import Phone from "$lib/components/fields/Phone.svelte";
  import Upload from "$lib/components/fields/Upload.svelte";
  import Openings from "$lib/components/fields/Openings.svelte";
  import References from "$lib/components/fields/References.svelte";
  import SubmitButton from "$lib/components/fields/SubmitButton.svelte";
  import SvelteMarkdown from "svelte-markdown";


  import type { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';

  import slugify from "slugify";


  let uploadingResume=false,
    uploadedResume=false,
    uploadingCoverLetter=false,
    uploadedCoverLetter=false;


  function resetStatuses(){
    uploadingResume=false;
    uploadedResume=false;
    uploadingCoverLetter=false;
    uploadedCoverLetter=false;
  }

  function collectEmails(opening:string){
      const emailToArray:string[] = [];
      email.forEach( a => {
        emailToArray.push(a.email);

      }
      )
      const matchedOpening = openings.find(v=> v.title  == opening);
      matchedOpening.email.forEach(a=>{
        emailToArray.push(a.email);
      });


      return emailToArray;
  }

  function fail(message:string){
    resetStatuses();
    errorTitle="Failed in form submission";
    errorMessage=message;
     return {
        success: false,
        message
      }
  }

  async function uploadFile(file:File, name:string):Promise<string|false>{
    try{
      console.log('Uploading file');
      const response = await fetch(`/upload/${name}`, {
        method: 'PUT',
        body: file,
      });

      const rData:{path?: string, success: boolean} = await response.json();
      if (rData.path) {
        return rData.path;

      }

    }
    catch(e){
      console.error(e);
      throw new Error(e);
    }

  }

   const onSubmit:SubmitFunction = async (f:Fields)=> {

    try {
        //First, upload resume
    uploadingResume= true;
    uploadingCoverLetter=true;
    const resume = await uploadFile(f.resume.value, slugify(`${f.name.value}-${f.opening.value}-resume.pdf`));
    let coverLetter:string | false = false;
    if (f.coverLetter.value) {
       coverLetter = await uploadFile(f.coverLetter.value, slugify(`${f.name.value}-${f.opening.value}-coverLetter.pdf`));
    }
    if(!resume){
      return fail("Resume failed to upload. Please try again");
    } else {
      uploadingResume=false;
      uploadedResume=true;
    }
    if(f.coverLetter.value && !coverLetter){
      return fail("Cover Letter failed to upload. Please try again");
    } else {
      uploadingCoverLetter=false;
      uploadedCoverLetter=true;
    }

    const data:JobData={
      formName:"Job Application",
      name:f.name.value,
      emailTo:collectEmails(f.opening.value),
      opening:f.opening.value,
      phone:f.phone.value,
      email:f.email.value,
      references:f.references.value,
      resume,
      coverLetter,
    }
    if (resume && coverLetter){
        const resp =  await fetch('/sendemail', {
          method: 'POST' ,
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json'
          }
        });
        const json = await resp.json();

        if (resp.status != 200) {
          let message:string | undefined = undefined;
          if (json.errors) {
          json.errors.map((error : {code: number, message: string})=>{
            message += `Error ${error.code}:   ${error.message}.<br/>`
          })
          }
          return fail(message)
        }
        return {
          success: true
        }
      }
    } catch(e) {
      console.error(e);
      return fail("Something went wrong" );
    }
  }

  export let
    email: EmailOptionShape[],
    openings: Opening[],
    successMessage: string,
    successTitle: string,
    errorMessage: string,
    errorTitle: string;
</script>
<FormWrap id="contact" {onSubmit}>
  <h3>Details:</h3>
  <Name required/>
  <Email required/>
  <Phone required/>
  <Openings {openings}/>
  <h3>Resume + Cover Letter:</h3>
  <p>Please upload documents as 1-2 page .pdf files less than 2mb each.</p>
  <Upload id="resume" label="Resume" uploading={uploadingResume} uploaded={uploadedResume}/>
  <Upload id="coverLetter" required={false} label="Cover Letter" uploading={uploadingCoverLetter}  uploaded={uploadedCoverLetter}/>

  <div class="references-header">

    <h3>References:</h3>
    <p>Please add details for up to 4 references.</p>
  </div>
  <References max={4}/>
  <SubmitButton centered>Submit Application<span slot="processing">Submitting</span></SubmitButton>
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
  @use "../styles/abstracts/mixins/media-queries" as *;
  @use "../styles/abstracts/mixins/type-elements" as type;
  h2 {
    text-align: center;
  }
  h3 {
    @include type.label;
    font-size: 20px;
    margin: 2em auto 0;
  }
  p {
    color: rgba(var(--color-foreground), var(--color-label-alpha) );
    font-size: 17px;

    @include media-query($small) {
      font-size: 15px;
      line-height: 1.2;
    }
  }
  .references-header{
    padding-right: 50px;
  }
</style>

