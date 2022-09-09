import * as Sentry from "@sentry/svelte";

Sentry.init({
  dsn: "https://2582249d11884e0390407a00c3c0d958@o473025.ingest.sentry.io/6735437",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


import { error, json as json$1 } from '@sveltejs/kit';
import {Buffer} from "buffer";
import FormDataN from 'form-data'
import {contact, job, support} from '$lib/emailTemplate';
import type { IFormDataOptions } from "mailgun.js/interfaces/IFormData";
import type { RequestHandler } from "./$types";

import Mailgun from "mailgun.js";
import type { MailgunMessageData } from 'mailgun.js/interfaces/Messages';
// @ts-ignore
globalThis.Buffer = Buffer;

function generateHTML(data: ContactData | JobData | SupportData):string  {
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
  throw new Error("Should have a form name.");

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

/** @type {import('./$types').RequestHandler} */


export const POST:RequestHandler = async ({ request }) => {
  let success = false;
  let errors: ResponseError[] = [];

  const sentFormData = await request.formData();
  const converted = convertFormData(sentFormData);
  if (Array.isArray(converted)) {
    errors = converted;
    return json$1({ errors }, {
      status: 500
    })
  } else if (!converted) {
     return json$1({
 errors: [{
   code: 500,
   message: "Error converting form data"
 }]
}, {
       status: 500
     })
  }
    //Need to check for email-to:



    const html = generateHTML(converted);
    let attachment = await generateAttachments(converted);
    let data:MailgunMessageData = {
      from: `Futureshirts Website <mailgun@${import.meta.env.VITE_MAILGUN_DOMAIN}>`,
      'h:Reply-To': converted.email,
      // to: converted.emailTo,
      to: 'Evan Test <evankerrickford@gmail.com>',
      subject:  `${converted.formName} Submission ${'topic' in converted ? '(' + converted.topic + ')' : ''}`,
      html,
      attachment
    }
  Sentry.captureMessage("Pre mailgun.");

  try{

    const M = new Mailgun(FormDataN);
    const mail = M.client({username:'api', key: import.meta.env.VITE_MAILGUN_KEY });
    try {
      Sentry.captureMessage("Trying to send.");
      await mail!.messages.create(import.meta.env.VITE_MAILGUN_DOMAIN, data);
      success=true;


    } catch(e) {
      Sentry.captureException(e);
      errors.push({code: 4, message: "Got Caught"});
      errors.push({code: 4.1, message: e});
      console.error(e);
      return json$1({ errors }, {
        status: 500
      })
    }
  } catch(e){
    Sentry.captureException(e);
    throw error(500, "Mailgun didn't work");
  }

     //// switch to fetch;

    if (success) {
      return json$1({
  message: 'Successfully sent email'
})
    }
    if (errors.length > 0) {
      return json$1({ errors }, {
        status: 500
      })
    }


  return json$1({
  errors: [
    {
      code: 505,
      message: "No Data Sent"
    }
  ]
}, {
    status: 500
  })
}