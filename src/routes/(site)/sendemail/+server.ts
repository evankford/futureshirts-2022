
import {  json } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";
// import { Buffer } from 'buffer';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AwsClient } from 'aws4fetch'

import type {ContactData, JobData, ResponseError, SupportData} from "../../../global";

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

//
// async function tryToAddToSheets(d:JobData|ContactData):Promise<boolean> {
//   try{
//
//     let url=`https://sheetdb.io/api/v1/g8v9yhih3d96b`;
//     let  headers = {
//         'Authorization': 'Basic ' + Buffer.from(import.meta.env.VITE_SHEETS_USERNAME_JOBS + ":" + import.meta.env.VITE_SHEETS_PASSWORD_JOBS).toString('base64'),
//         'Content-Type':'application/json'
//       }
//
//     if (d.formName=='Contact Form'){
//       url='https://sheetdb.io/api/v1/7xgvdjl1g7j0h';
//       headers = {
//         'Authorization': 'Basic ' + Buffer.from(import.meta.env.VITE_SHEETS_USERNAME + ":" + import.meta.env.VITE_SHEETS_PASSWORD).toString('base64'),
//         'Content-Type':'application/json'
//       }
//     }
//     const now = new Date();
//     const date = ('0' + now.getDate()).slice(-2) + '/'
//              + ('0' + (now.getMonth()+1)).slice(-2) + '/'
//              + now.getFullYear()
//     let toSend:{ [header: string]: string | number | boolean; } = {
//       "Date Submitted":date,
//       "Name":d.name,
//       "Email": d.email
//     }
//
//     if (d.formName == 'Contact Form'){
//       toSend["Topic"]= d.topic;
//       toSend["Message"] = d.message;
//     } else {
//       let refs:string='';
//       if (d.references){
//         d.references.forEach(r=>{
//           refs+=`${r.name}: ${r.relation} - ${r.email} ${r.phone} \n`
//         })
//       }
//       toSend['Opening'] = d.opening;
//       toSend['Phone'] = d.phone;
//       toSend['Resume'] = d.resume;
//       if ('resume'in d) {
//         toSend['Cover Letter'] = d.coverLetter;
//       }
//       if(refs){
//         toSend['References'] = refs;
//       }
//     }
//
//     // const keyResp = await fetch(url + '/keys',{headers});
//     // const keys = await keyResp.json();
//     const body = JSON.stringify({data:[toSend]});
//     const resp = await fetch(url, {
//       method:"POST",
//       body,
//       headers
//     })
//
//     const j = await resp.json();
//
//     if ('created' in j && j.created==1){
//       return true;
//
//     }
//
//     return true;
//   } catch(e){
//     console.error(e);
//     }
//
// }


export const POST:RequestHandler = async ({ request }) => {
  const errors: ResponseError[] = [];

  const sentFormData: JobData|ContactData = await request.json();

  const html = generateHTML(sentFormData);

  const body = {
    Recipients: {
      To: sentFormData.emailTo,
    },
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Charset: 'utf-8',
          Content: html
        }
      ],
      ReplyTo: sentFormData.email,
      From: "website@futureshirts.com",
      Subject: `${sentFormData.formName} Submission ${'topic' in sentFormData ? '(' + sentFormData.topic + ')' : ''}`,
    },
  }

  const headers = {
    'X-ElasticEmail-ApiKey' : import.meta.env.ELASTIC_EMAIL_APIKEY,
    'Content-Type': 'application/json'
  }

  const url = 'https://api.elasticemail.com/v4/emails/transactional'


    try {
      const resp = await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers,
      })
      return json({message: 'Your email is sent!'}, {status: 200})
    } catch (error) {
      console.error(error)
      errors.push({code: 500, message: 'Could not send message. Check your logs for more info.'})
      return json(errors, {status: 520});
    }
}

export const prerender = false;
