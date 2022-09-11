

import {  json as json$1 } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";


import { Buffer } from 'buffer';
import {SESClient, SendEmailCommand, type SendEmailCommandInput} from "@aws-sdk/client-ses";
import Email from '$lib/components/fields/Email.svelte';

const mailer = new SESClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId:import.meta.env.AWS_ACCESS_KEY_ID,
      secretAccessKey:import.meta.env.AWS_SECRET_ACCESS_KEY
    }
})

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


async function tryToAddToSheets(d:JobData|ContactData):Promise<boolean> {
  try{

    let url=`https://sheetdb.io/api/v1/g8v9yhih3d96b`;
    let  headers = {
        'Authorization': 'Basic ' + Buffer.from(import.meta.env.VITE_SHEETS_USERNAME_JOBS + ":" + import.meta.env.VITE_SHEETS_PASSWORD_JOBS).toString('base64'),
        'Content-Type':'application/json'
      }

    if (d.formName=='Contact Form'){
      url='https://sheetdb.io/api/v1/7xgvdjl1g7j0h';
      headers = {
        'Authorization': 'Basic ' + Buffer.from(import.meta.env.VITE_SHEETS_USERNAME + ":" + import.meta.env.VITE_SHEETS_PASSWORD).toString('base64'),
        'Content-Type':'application/json'
      }
    }

    let toSend:{ [header: string]: string | number | boolean; } = {
      "Date":new Date().toString(),
      "Name":d.name,
      "Email": d.email
    }

    if (d.formName == 'Contact Form'){
      toSend["Topic"]= d.topic;
      toSend["Message"] = d.message;
    } else {
      let refs:string='';

      d.references.forEach(r=>{
        refs+=`${r.name}: ${r.relation} - ${r.email} ${r.phone} \n`
      })
      toSend['Opening'] = d.opening;
      toSend['Phone'] = d.phone;
      toSend['Resume'] = d.resume;
      toSend['Cover Letter'] = d.coverLetter;
      toSend['References'] = refs;
    }

    const keyResp = await fetch(url + '/keys',{headers});
    const keys = await keyResp.json();
    const body = JSON.stringify({data:[toSend]});
    console.log(body);
    console.log(keys);
    const resp = await fetch(url, {
      method:"POST",
      body,
      headers
    })

    const j = await resp.json();

    console.log(j)
    if ('created' in j && j.created==1){
      return true;

    }

    return true;
  } catch(e){
    console.error(e);
    throw new Error("Couldn't add to sheet")
    }

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