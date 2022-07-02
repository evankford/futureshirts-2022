/// <reference types="@portabletext/svelte"/>
/// <reference types="svelte" />
/// <reference types="mailgun.js" />

interface ImportMetaEnv {
  VITE_PROJECT_ID: string;
  VITE_DATASET: string;
  VITE_CANONICAL_URL: string
  VITE_MAILGUN_KEY: string
  VITE_MAILGUN_DOMAIN: string
  VITE_MAILGUN_BASE_URL: string
}

 interface FormField {
    value:string|File | JobReference[],
    errorMsg: string |false,
    validator: (val:any) => false | string,
  }

type Fields = {[key:string] : FormField}
type FieldStore = Writable<Fields>
interface JobReference {
  name:string,
  relation: string,
  phone: string,
  email:string
}

interface SubmissionData {
  formName: string
  emailTo: string
  name: string
  email: string
}

interface ContactData extends SubmissionData {
  formName: 'Contact Form'
  topic: string
  message: string
}
interface JobData extends SubmissionData {
  formName: 'Job Application'
  phone: string,
  opening: string,
  resume: File,
  coverLetter:File,
  references: JobReference[]
}
interface SupportData extends SubmissionData {
  formName: 'Support Form'
  shop: string,
  orderNumber?: string
  orderDate?: string
  message: string
}


type SubmitResponse = { success:boolean, message?: string };
type SubmitFunction = (f: Fields) => Promise<SubmitResponse>;
//Wrapper for form
type MetaSubmitFunction = () =>void;
type ResponseError = { code: number, message: string};
type SelectOption = {value: string, label: string}
