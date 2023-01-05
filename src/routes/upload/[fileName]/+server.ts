import type { RequestHandler} from './$types';
import { json, error } from '@sveltejs/kit';
import { AwsClient } from 'aws4fetch'


 const uploader = new AwsClient ({
      region: 'us-east-1',
        accessKeyId:import.meta.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:import.meta.env.AWS_SECRET_ACCESS_KEY
 });

 const url = 'https://futureshirtsuploads.s3.amazonaws.com';
export const PUT:RequestHandler = async({request, params})=> {
  const stuff = await request.blob();
  const body = await stuff.arrayBuffer()

  const now = new Date();
  const path=`${now.getFullYear()}/${now.getMonth()}/${now.getDate()}/${params.fileName}`

  try {

    await uploader.fetch(`${url}/${path}`, {body, method: 'PUT', headers: {'Content-Type': 'application/pdf', "Content-Length": stuff.size.toString(), "x-amz-acl": 'public-read'}})
    // const j = await response.json();
    // console.log(j);
    return json({path: `${url}/${path}`, success: true});

  } catch(e) {
    console.error(e);
    return json(e)
  }
}
export const prerender = false;
