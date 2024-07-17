
import {  json } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";
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

export const POST:RequestHandler = async ({ request }) => {
  const errors: ResponseError[] = [];

  const sentFormData: JobData|ContactData = await request.json();

  const html = generateHTML(sentFormData);

  const body = {
    Recipients: {
      To: ['evan.ford@futureshirts.com'],
      // To: sentFormData.emailTo,
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
