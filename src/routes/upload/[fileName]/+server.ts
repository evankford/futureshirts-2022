import type { RequestHandler} from './$types';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { json, error } from '@sveltejs/kit';

const uploader = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId:process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
})
export const POST:RequestHandler = async({request, params})=> {
  try{
    const now = new Date();

    const path=`${now.getFullYear()}/${now.getMonth()}/${now.getDate()}/${params.fileName}`

  const stuff = await request.body;
  const upload = await new Upload({
    client: uploader,
    params:{
      Body:stuff,
        Key: path,
        Bucket:'futureshirtsuploads',
        ACL:'public-read',
        ContentType:'application/pdf',
    },
    queueSize:4,
    leavePartsOnError:false
  });
  return upload.done().then(e=>{console.log(e);
    return json(e);
  }).catch(e=>{
    console.error(e);
    throw error(500, e);
  })
  } catch(e){
    console.error(e);
    throw error(500, e);
  }
}