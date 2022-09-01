import {Buffer} from "buffer";
import {Readable} from "readable-stream";
import {FormDataEncoder, type FormDataLike} from "form-data-encoder"
import { FormData } from 'formdata-polyfill/esm.min.js'
import {contact, job, support} from '$lib/emailTemplate';
import type { IFormDataOptions } from "mailgun.js/interfaces/IFormData";

// @ts-ignore
globalThis.Buffer = Buffer;

function generateHTML(data: ContactData | JobData | SupportData):string | false {
  if (!('formName' in data)) {
    throw new Error("How did this happen? No form name in data");
  }
  if (data.formName == 'Contact Form') {
    return contact(data)
  }
  if (data.formName == 'Job Application') {
    return job(data)
  }
  if (data.formName == 'Support Form') {
    return support(data) ;
  }
  return false;
}

interface EmailData {
  [key:string] : string | string[] | Attachment[] |  false,
}

function convertToFormData(data:EmailData) {
  let fData = new FormData();
  Object.keys(data).forEach(key => {
    const val = data[key] ;
    if (!val) {return;}
    if (key == 'attachment') {
      const attachments = val as Attachment[];
      attachments.forEach(a=>{
        const dataToAdd = a.data;
        fData.append(key, dataToAdd, a.filename);
      })
      return
    }
    if (Array.isArray(val)) {
      val.forEach(l=> {
        if (typeof l == 'string' ) {
          fData.append(key,  l );
          return;
        }
        fData.append(key, JSON.stringify(l));
      })
      return;
    }
    fData.append(key, data[key] as string)
  });
  return fData;
}

interface Attachment {
  filename: string,
  data:string | File
}
async function generateAttachments(data: ContactData | JobData | SupportData) {
  let attachments: Attachment[] = [];
  if ('resume' in data) {
    attachments.push(
      {
        filename: data.name + '-resume.pdf',
        data:data.resume
      }
    );
  }
  if ('coverLetter' in data) {
    attachments.push({
      filename: data.name + '-coverLetter.pdf',
      data:data.coverLetter
    });
  }
  return attachments.length > 0 ? attachments : false
}

function convertFormData(form_data: FormData):ContactData | JobData | SupportData | false | ResponseError[] {
  let errors:ResponseError[] = [];
  let prim: {[key:string]: FormDataEntryValue } ={};

  for (const pair of form_data.entries()) {
    prim[pair[0] ] = pair[1];
  }

   if (!('emailTo' in prim)) {
    errors.push({code: 500, message: 'No Destination Email sent (emailTo field)'})
  }

  if (!('email' in prim)) {
    errors.push({code: 500, message: "Need to provide a reply-to email"})
  }
  if (!('name' in prim)) {
    errors.push({code: 500, message: "Need to provide a reply-to name"})
  }
  if (!('formName' in prim)) {
    errors.push({code: 500, message: "Need to provide a formName in the form data"})
  }

  //Contact form
  if (errors.length == 0) {
    switch (prim.formName) {
      case 'Contact Form':
        if (!('topic' in prim)) {
          errors.push({code: 500, message: "Need to provide a topic in the form data"})
        }
        if (!('message' in prim)) {
          errors.push({code: 500, message: "Need to provide a message in the form data"})
        }
        if (errors.length == 0) {
          return prim as unknown as ContactData;
        }
        break;

      case 'Job Application':
         if (!('phone' in prim)) {
          errors.push({code: 500, message: "Need to provide a phone number in the form data"})
        }
        if (!('resume' in prim)) {
          errors.push({code: 500, message: "Need to provide a resume in the form data"})
        }
        if (!('coverLetter' in prim)) {
          errors.push({code: 500, message: "Need to provide a coverLetter in the form data"})
        }
        if (!('opening' in prim)) {
          errors.push({code: 500, message: "Need to provide a opening in the form data"})
        }
        if (!('references' in prim)) {
          errors.push({code: 500, message: "Need to provide references in the form data"})
        }

         if (errors.length == 0) {
         return prim as unknown as JobData;
        }

        break;
      case 'Support Form':
        if (!('message' in prim)) {
          errors.push({code: 500, message: "Need to provide a message in the form data"})
        }
        if (!('shop' in prim)) {
          errors.push({code: 500, message: "Need to provide a shop in the form data"})
        }

         if (errors.length == 0) {
          return prim as unknown as SupportData;
        }
        break;
      default:
        errors.push({code: 500, message: "Invalid form name: Should be either 'Job Application' , 'Contact Form', or 'Support Form'"})
        break;
    }

  }

  if (errors.length > 0) {
    return errors;
  }
  return false;
}

/** @type {import('./__types/sendemail').RequestHandler} */
export async function POST({ request }) {
  let success = false;
  let errors: ResponseError[] = [];

  const formData = await request.formData() as FormData;
  const converted = convertFormData(formData);
  if (Array.isArray(converted)) {
    errors = converted;
    return {
        status: 500,
        body: { errors }
    }
  } else if (!converted) {
     return {
        status: 500,
        body: {
          errors: [{
            code: 500,
            message: "Error converting form data"
          }]
         }
      }
  }
    //Need to check for email-to:



    const html = generateHTML(converted);

    let attachment = await generateAttachments(converted);
    let data:IFormDataOptions = {
      from: `Futureshirts Website <mailgun@${import.meta.env.VITE_MAILGUN_DOMAIN}>`,
      'h:Reply-To': converted.email,
      // to: converted.emailTo,
      to: 'Evan Test <evankerrickford@gmail.com>',
      subject:  `${converted.formName} Submission ${'topic' in converted ? '(' + converted.topic + ')' : ''}`,
      html,
      attachment
    }
    const v = convertToFormData(data) ;
    //// switch to fetch;
    try {
      errors.push({code: 1, message: "Got Here"})
      let encoder: FormDataEncoder | false = false;
      try {

        encoder = new FormDataEncoder(v as unknown as FormDataLike);
        // errors.push({code: 1.1, message: "Made it past encoder"});
      } catch(e) {

        errors.push({code: 1.2, message: "Can't instantiate encoder"});
        errors.push({code:1.20 , message: e})
        errors.push({code:1.20 , message: e.message})
        errors.push({code:1.20 , message: JSON.stringify(e)});

      }
      if (!encoder) {
        return {
          status: 500,
          body : {
            errors
          }
        }
      }
      errors.push({code: 1, message: "Got Here"})
      errors.push({code: 1.1, message: "Got Here"});
      errors.push({code: 1.1, message: JSON.stringify(encoder.headers)});
      let read: ReturnType<Readable.from>;
      try {

         read =  Readable.from(encoder.encode())
      } catch(e) {
      errors.push({code: 1.2, message: "Can't instantiate reader"});
        errors.push({code:1.20 , message: e})
        errors.push({code:1.20 , message: e.message})
        errors.push({code:1.20 , message: JSON.stringify(e)});

      }
      if (!read) {
        return {
          status: 500,
          body : {
            errors
          }
        }
      }

      errors.push({code: 1.75, message: "Got Here"});;
      const headers = Object.assign(
          encoder.headers,
          {
            'Authorization' :  'Basic ' + Buffer.from(`api:${import.meta.env.VITE_MAILGUN_KEY}`).toString('base64'),
          }
          )
      errors.push({code: 2, message: "Got Here"});
      const resp = await fetch(`https://api.mailgun.net/v3/${import.meta.env.VITE_MAILGUN_DOMAIN}/messages`, {
        method: "post",
        body: read,
        headers
        });

        errors.push({code: 2.1, message: "Got Here"});

        if (resp.status == 200) {
        errors.push({code: 3, message: "Got Success"});
        success = true;
      } else {
        errors.push({code: 3, message: "Got Failed"});
        const j =await  resp.json();
        if ('message' in j) {
          errors.push({code: resp.status, message:j.message})
        } else {

          errors.push({code: resp.status, message:JSON.stringify(j)})
        }
      }
    } catch(e) {
      errors.push({code: 4, message: "Got Caught"});
      errors.push({code: 4.1, message: e});
      console.error(e);
      return {
        status: 500,
        body: { errors }
      }
    }

    if (success) {
      return {
        status: 200,
        body: {
          message: 'Successfully sent email'
        }
      }
    }
    if (errors.length > 0) {
      return {
        status: 500,
        body: { errors }
      }
    }


  return {
    status: 500,
    body: {
      errors: [
        {
          code: 505,
          message: "No Data Sent"
        }
      ]
    }
  }
}