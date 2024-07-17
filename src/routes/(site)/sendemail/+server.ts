
import * as ElasticEmail from '@elasticemail/elasticemail-client';
import {  json } from '@sveltejs/kit';
import {contact, job, support} from '$lib/emailTemplate';
import type { RequestHandler } from "./$types";
import type {ContactData, JobData, ResponseError, SupportData} from "../../global";

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
  const defaultClient = ElasticEmail.ApiClient.instance;
  const apikey = defaultClient.authentications['apikey'];
  apikey.apiKey = import.meta.env.ELASTIC_EMAIL_APIKEY
  const api = new ElasticEmail.EmailsApi()

  const errors: ResponseError[] = [];

  const sentFormData:JobData|ContactData = await request.json();

  const html = generateHTML(sentFormData);

  const emailData = {
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
      From: "contact@futureshirts.com",
      Subject: `${sentFormData.formName} Submission ${'topic' in sentFormData ? '(' + sentFormData.topic + ')' : ''}`,
    },
  }


    try {
      let data = null
      let init = {status: 200}
      const handler = function(error, data, response) {
        if (error) {
          console.error(error)
          errors.push({code: 500, message: 'Could not send message. Check your logs for more info.'})
          data = { errors }
          init =  {status: 520}
          return
        }
        data = {
          message: 'Successfully sent email',
          errors
        }
      }
      api.emailsTransactionalPost(emailData, handler)
      return json(data, init)
    } catch (error) {
      console.error(error)
      errors.push({code: 500, message: 'Could not send message. Check your logs for more info.'})
      return json(errors, {status: 520});
    }
}

export const prerender = false;
