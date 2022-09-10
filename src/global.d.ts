/// <reference types="@portabletext/svelte"/>
/// <reference types="svelte" />
/// <reference types="svelte/store" />
/// <reference types="mailgun.js" />

interface ImportMetaEnv {
  VITE_PROJECT_ID: string;
  VITE_DATASET: string;
  VITE_CANONICAL_URL: string
  VITE_MAILGUN_KEY: string
  VITE_SENDGRID_KEY: string
  VITE_MAILGUN_DOMAIN: string
  VITE_SANITY_TOKEN: string
  VITE_IS_PREVIEW: string
  VITE_AWS_ACCESS_KEY_ID: string
  VITE_AWS_SECRET_ACCESS_KEY: string
  VITE_GSHEETS_CLIENT_EMAIL: string
  VITE_GSHEETS_PRIVATE_KEY: string
}

 interface FormField {
    value:string
    errorMsg: string |false,
    validator: (val:any) => false | string,
  }

type Fields = {
  resume?: FileField,
  coverLetter?: FileField,
  topic?:FormField,
  name?: FormField,
  email?:FormField,
  message?:FormField
  opening?:FormField
  phone?:FormField
  references?:ReferenceField
}
interface ReferenceField {
  value:JobReference[],
    errorMsg: string |false,
    validator: (val:any) => false | string,
}
interface FileField {
  value:File,
  errorMsg: string |false,
  validator: (val:any) => false | string,
}

type FieldStore = Writable<Fields>
interface JobReference {
  name:string,
  relation: string,
  phone: string,
  email:string
}

interface SubmissionData {
  formName: string
  emailTo: string[]
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
  resume: string,
  coverLetter:string,
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
