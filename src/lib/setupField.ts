import type {Writable}  from "svelte/store";

export default function setupField( id:string,validator: (v: any)=>(string | false), fields:Writable<{[key:string] : FormField}> ):void {
  fields.update(val=> {
    let newVal = val;
    newVal[id] = {
      value: null,
      validator,
      errorMsg:validator(null)
    }
    return newVal;
  })
}