import {Buffer} from "buffer";
import {Readable} from "readable-stream";
import { FormData  } from 'formdata-node';
import { FormDataEncoder } from 'form-data-encoder';
import {contact, job, support} from '$lib/emailTemplate';
import type { IFormDataOptions } from "mailgun.js/interfaces/IFormData";

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

function convertToFormData(data:EmailData):FormData {
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
  console.log(fData);
  return fData
}

interface Attachment {
  filename: string,
  data: Buffer | string | File
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
    //@ts-ignore
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
  if (formData) {
    //Need to check for email-to:



    const html = generateHTML(converted);

    let attachment = await generateAttachments(converted);
    let data:IFormDataOptions = {
      from: `Futureshirts Website <mailgun@${import.meta.env.VITE_MAILGUN_DOMAIN}>`,
      'h:Reply-To': converted.email,
      'h:Content-type': 'multipart/form-data',
      // to: converted.emailTo,
      to: 'Evan Test <evankerrickford@gmail.com>',
      subject:  `${converted.formName} Submission ${'topic' in converted ? '(' + converted.topic + ')' : ''}`,
      html,
      attachment
    }
    const v = convertToFormData(data) ;

    //// switch to fetch;
    try {
      console.log("Made it here 1");
      const encoder = new FormDataEncoder(v);
      console.log("Made it here 1.5");
      const resp = await fetch(`https://api.mailgun.net/v3/${import.meta.env.VITE_MAILGUN_DOMAIN}/messages`, {
        method: "post",
        body: Readable.from(encoder.encode()) as unknown as ReadableStream,
        headers: Object.assign(
          {
            'Authorization' : 'Basic ' + Buffer.from(`api:${import.meta.env.VITE_MAILGUN_KEY}`).toString('base64')
          }
          , encoder.headers
          )
        });
      console.log("Made it here 2");
      const contentType = resp.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const j = await resp.json();
        console.log(j);
        errors.push({code: 500, message:j})
      }
      console.log("Made it here 3");

      if (resp.status == 200) {
        success = true;
      } else {
        console.log(resp);
        return JSON.stringify(resp);

      }
    } catch(e) {
      console.error(error);
      errors.push({code: 520, message: JSON.stringify(e) + "Error sending email. Please try again."})
      errors.push({code: 520, message:e})
    }

    // await mg.messages.create(import.meta.env.VITE_MAILGUN_DOMAIN, data).then(d=> {
    //   if (d.status == 200) {
    //     success = true;
    //   }
    // }).catch(e => {
    //   console.error(e);
    //   errors.push({code: 520, message: "Error sending email. Please try again."})
    // });
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