/// <reference types="@portabletext/svelte"/>
/// <reference types="svelte" />

interface ImportMetaEnv {
  VITE_PROJECT_ID: string;
  VITE_DATASET: string;
  VITE_CANONICAL_URL: string
}

 interface FormField {
    value:any,
    errorMsg: string |false,
    validator: (val:any) => false | string,
  }

type Fields = {[key:string] : FormField}
type FieldStore = Writable<Fields>