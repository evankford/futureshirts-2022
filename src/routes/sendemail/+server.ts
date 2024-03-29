

import {  json } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";
import { Buffer } from 'buffer';

import { AwsClient } from 'aws4fetch'



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
    const now = new Date();
    const date = ('0' + now.getDate()).slice(-2) + '/'
             + ('0' + (now.getMonth()+1)).slice(-2) + '/'
             + now.getFullYear()
    let toSend:{ [header: string]: string | number | boolean; } = {
      "Date Submitted":date,
      "Name":d.name,
      "Email": d.email
    }

    if (d.formName == 'Contact Form'){
      toSend["Topic"]= d.topic;
      toSend["Message"] = d.message;
    } else {
      let refs:string='';
      if (d.references){
        d.references.forEach(r=>{
          refs+=`${r.name}: ${r.relation} - ${r.email} ${r.phone} \n`
        })
      }
      toSend['Opening'] = d.opening;
      toSend['Phone'] = d.phone;
      toSend['Resume'] = d.resume;
      if ('resume'in d) {
        toSend['Cover Letter'] = d.coverLetter;
      }
      if(refs){
        toSend['References'] = refs;
      }
    }

    // const keyResp = await fetch(url + '/keys',{headers});
    // const keys = await keyResp.json();
    const body = JSON.stringify({data:[toSend]});
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
    }

}


export const POST:RequestHandler = async ({ request }) => {

  let errors: ResponseError[] = [];

  try {
    const sentFormData:JobData|ContactData = await request.json();
    if(sentFormData.formName == "Job Application")
    {
      await tryToAddToSheets(sentFormData);
      console.log("Added to sheets")
    }

    const html = generateHTML(sentFormData);

    let body = {
      FromEmailAddress: `fs@m.ekfapps.com`,
      ReplyToAddresses: [sentFormData.email],
      Destination: {
        ToAddresses: sentFormData.emailTo,
      },
      Content:{
        Simple: {
          Subject: {
            Charset: 'utf-8',
            Data: `${sentFormData.formName} Submission ${'topic' in sentFormData ? '(' + sentFormData.topic + ')' : ''}`,
          },
          Body: {
            Html: {
              Charset: 'utf-8',
              Data: html
            }
          },
        }
      },
    }
    const sender = new AwsClient ({
      region: 'us-east-1',
      accessKeyId:import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey:import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    });


    const response = await sender.fetch('https://email.us-east-1.amazonaws.com/v2/email/outbound-emails', { method: 'POST' , body:JSON.stringify(body), headers:{'Content-Type' : 'application/json'}});
    const j = await response.json();
    if ('MessageId' in j) {
      return json({
           message: 'Successfully sent email',
           errors
         }, {status: 200});
    }
    errors.push({code: 3, message: j.message});
    return json(errors, {status: 520});
    // console.log(response);
  } catch(e) {
    console.error(e);
    errors.push({code:4, message:e});
    return json(errors, {status: 520});

  }
}

export const prerender = false;