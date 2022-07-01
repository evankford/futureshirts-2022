import Mailgun  from "mailgun.js";
import formData from "form-data";
import {contact, job, support} from '$lib/emailTemplate';
import { faSledding } from "@fortawesome/pro-regular-svg-icons";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: import.meta.env.VITE_MAILGUN_KEY});

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


interface Attachment {
  filename: string,
  data: Buffer | string
}
async function generateAttachments(data: ContactData | JobData | SupportData) {
  let attachments: Attachment[] = []
  if ('resume' in data) {
    const array =await data.resume.arrayBuffer();
    attachments.push(
      {
        filename: data.name + '-resume.pdf',
        data:  Buffer.from(array)
      }
    );
  }
  if ('coverLetter' in data) {
    const arrayC =await data.coverLetter.arrayBuffer();

    attachments.push({
      filename: data.name + '-coverLetter.pdf',
      data:Buffer.from(arrayC)
    });
  }
  return attachments.length > 0 ? attachments : false
}

function convertFormData(form_data: FormData):ContactData | JobData | SupportData | false | ResponseError[] {
  let errors:ResponseError[] = [];
  let prim: {[key:string]: FormDataEntryValue } ={};

  form_data.forEach((value, key) => {prim[key] = value});

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
export async function post({ request }) {
  let success = false;
  let errors: ResponseError[] = [];

  const formData = await request.formData();
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
    let data:MailgunMessageData = {
      from: `Futureshirts Website <mailgun@${import.meta.env.VITE_MAILGUN_DOMAIN}>`,
      'h:Reply-To': converted.email,
      'h:Content-type': 'multipart/form-data',
      to: ["evankerrickford@gmail.com"], //'${converted.emailTo}'
      subject:  `${converted.formName} Submission ${'topic' in converted ? '(' + converted.topic + ')' : ''}`,
      html,
      attachment
    }
    await mg.messages.create(import.meta.env.VITE_MAILGUN_DOMAIN, data).then(d=> {
      if (d.status == 200) {
        success = true;
      }
    }).catch(e => {
      console.error(e);
      errors.push({code: 520, message: "Error sending email. Please try again."})
    });
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