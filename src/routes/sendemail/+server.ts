

import {  json as json$1 } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";

import { GoogleSpreadsheet } from "google-spreadsheet";


import {SESClient, SendEmailCommand, type SendEmailCommandInput} from "@aws-sdk/client-ses";
import Email from '$lib/components/fields/Email.svelte';

const mailer = new SESClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId:import.meta.env.AWS_ACCESS_KEY_ID,
      secretAccessKey:import.meta.env.AWS_SECRET_ACCESS_KEY
    }
})

const JobDoc = new GoogleSpreadsheet('1_eGgD_YMzUFRQjZ3Jw9mUQZCLIxmMYepxbgIKTVBR84');
const ContactDoc = new GoogleSpreadsheet('12bbyq064266vw4WNnSZyTKK6g_V0EMK70jCJiW4wZWA');

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

/** @type {import('./$types').RequestHandler} */


async function tryToAddToSheets(d:JobData|ContactData):Promise<boolean> {
  let doc= JobDoc;
  if (d.formName=="Contact Form"){
    doc = ContactDoc;
  }
  await doc.useServiceAccountAuth({
    client_email: import.meta.env.VITE_GSHEETS_CLIENT_EMAIL,
    private_key: import.meta.env.VITE_GSHEETS_PRIVATE_KEY.replace(/\\n/g, '\n')
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];


  let cleaned:{ [header: string]: string | number | boolean; } = {
    "Date Submitted":new Date().toString(),
    Name:d.name,
    Email: d.email
  }

  if (d.formName == 'Contact Form'){
    cleaned.Message = d.message;
    cleaned.Topic= d.topic;
  } else {
    let refs:string;



    cleaned.Opening = d.opening;
    cleaned.Phone = d.phone;
    cleaned.Resume = d.resume;
    cleaned['Cover Letter'] = d.coverLetter;
    cleaned.References;
  }
  const success = await sheet.addRow(
   cleaned
  );

  if (success){
    return true;

  }
  return false;

}


export const POST:RequestHandler = async ({ request }) => {

  let success = false;
  let errors: ResponseError[] = [];


  const sentFormData:JobData|ContactData = await request.json();
  await tryToAddToSheets(sentFormData);
  const html = generateHTML(sentFormData);

  let data:SendEmailCommandInput = {
    Source: `fs@m.ekfapps.com`,
    ReplyToAddresses: [sentFormData.email],
    Destination: {
      ToAddresses: ['evankerrickford@gmail.com'],
    },
    Message:{
      Subject: {
        Data: `${sentFormData.formName} Submission ${'topic' in sentFormData ? '(' + sentFormData.topic + ')' : ''}`,
      },
      Body: {
        Html: {
          Data: html
        }
      },
    },
  }



  const command = new SendEmailCommand(data);
  return mailer.send(command).then(()=>{
                return json$1({
        message: 'Successfully sent email'
      })
      }).catch(e=>{
      success = false;
      console.error(e);
      errors.push({code: 4, message: "Got Caught"});
      errors.push({code: 4.1, message: JSON.stringify(e)});

      return json$1({ errors }, {
        status: 500
      })
    })
  }

export const prerender = false;
export const ssr = false;