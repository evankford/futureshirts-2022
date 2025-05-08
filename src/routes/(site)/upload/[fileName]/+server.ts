import type { RequestHandler} from './$types';
import { json, error } from '@sveltejs/kit';
import {
    S3Client,
    // ListBucketsCommand,
    // ListObjectsV2Command,
    // GetObjectCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
    region: import.meta.env.SPACES_BUCKET_REGION,
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: `https://${import.meta.env.SPACES_BUCKET_REGION}.digitaloceanspaces.com`,
    credentials: {
        accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
    },
});


export const PUT:RequestHandler = async({request, params})=> {
  const stuff = await request.blob();
  const body = await stuff.arrayBuffer()

  const now = new Date();
  const path=`jobUploads/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}/${params.fileName}`

  try {
      const cmd = new PutObjectCommand({
        // @ts-ignore
          Body: body,
          Key: path,
          Bucket: import.meta.env.SPACES_BUCKET_NAME,
          ACL: "public-read"})
    await S3.send(cmd)

    // const j = await response.json();
    // console.log(j);
    return json({path: `https://${import.meta.env.SPACES_BUCKET_NAME}.${import.meta.env.SPACES_BUCKET_REGION}.digitaloceanspaces.com/${path}`, success: true});

  } catch(e) {
    console.error(e);
    return json(e)
  }
}
export const prerender = false;
