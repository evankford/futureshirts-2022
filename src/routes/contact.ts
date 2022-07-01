import { sanityGet } from "$lib/sanity";
import { videoFields } from "$lib/sanity";


/** @type {import('./__types/contact').RequestHandler} */
export async function get() {
  const query  = `*[_id == 'contactSettings' ][0] {title, subtitle, sites, contactOptions, 'contactVideo' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage}`
  const res = await sanityGet<ContactSettings>(query);
  return res;
}