

import { error, json as json$1 } from '@sveltejs/kit';
import FormDataN from 'form-data'
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";

import Mailgun from "mailgun.js";
import type { MailgunMessageData } from 'mailgun.js/interfaces/Messages';

import sgMail, {type MailDataRequired} from "@sendgrid/mail";

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
  content:string ,
  fileType: 'application/pdf'
}
async function generateAttachments(data: ContactData | JobData | SupportData) {
  let attachments: Attachment[] = [];
  if ('resume' in data) {
    attachments.push(
      {
        filename: data.name + '-resume.pdf',
        content: await data.resume.text(),
        fileType:"application/pdf"
      }
    );
  }
  if ('coverLetter' in data) {
    attachments.push({
      filename: data.name + '-coverLetter.pdf',
      content: await data.coverLetter.text(),
      fileType:"application/pdf"
    });
  }
  return attachments
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
    let attachments = await generateAttachments(converted);
    let data = {
      from: `futureshirts@em2281.mail.ekfapps.com`,
      replyTo: converted.email,
      // to: converted.emailTo,
      to: 'evankerrickford@gmail.com',
      subject:  `${converted.formName} Submission ${'topic' in converted ? '(' + converted.topic + ')' : ''}`,
      html,
      attachments
    }




      sgMail.setApiKey(import.meta.env.VITE_SENDGRID_KEY);
      return sgMail.send(data).then(()=>{
          return json$1({
  message: 'Successfully sent email'
})
      }).catch(e=>{
      success = false;
      console.error(e);
      errors.push({code: 4, message: "Got Caught"});
      errors.push({code: 4.1, message: JSON.stringify(e.response.body)});

      return json$1({ errors }, {
        status: 500
      })
    })
}

export const prerender = false;
export const ssr = false;