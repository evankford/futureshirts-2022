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


  function processFields(f:Fields):FormData {
    let form_data = new FormData();

    const emailToArray:string[] = [];
    email.forEach( a => {
      console.log(a);
      emailToArray.push(`${a.name ? a.name + ' ' : ''}<${a.email}>`);
    }
    )

    form_data.append('formName', 'Job Application' );

    const keys = Object.keys(f);
    if (keys && keys.length >= 1) {
      keys.forEach((key, i) => {
        const value = f[key].value ? f[key].value : false;

        if ([key ==  'opening']){
          const matchedOpening = openings.find(v=> v.title  == value);
          if (matchedOpening){
            matchedOpening.email.forEach(a=>{
              emailToArray.push(`${a.name ? a.name + ' ' : ''}<${a.email}>`);
            })
          }
        }
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
    form_data.append('emailTo', emailToArray.join(',') );
    return form_data;
  }


   const onSubmit:SubmitFunction = async (f:Fields)=> {
    const processed =processFields(f);
    try {
      const resp =  await fetch('/sendemail', {
        method: 'POST' ,
        body: processed,
        // headers: {
        // 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
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
  <Upload id="resume" label="Resume" />
  <Upload id="coverLetter" label="Cover Letter" />
    <h3>References:</h3>
  <p>Please add details for up to 4 references.</p>
  <References required max={4}/>


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
</style>

