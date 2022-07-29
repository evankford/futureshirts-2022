import { getSingleDocument } from "$lib/draftCheck";
import { sanityGet } from "$lib/sanity";
import { videoFields } from "$lib/sanity";


/** @type {import('./__types/contact').RequestHandler} */
export async function GET() {
  const query  = `${getSingleDocument('contactSettings')} {title, subtitle, sites, contactOptions, 'contactVideo' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage}`
  console.log(query);
  const res = await sanityGet<ContactSettings>(query);
  return res;
}