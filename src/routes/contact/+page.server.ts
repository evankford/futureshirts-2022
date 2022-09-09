import { getSingleDocument } from "$lib/draftCheck";
import { sanityGet } from "$lib/sanity";
import { videoFields } from "$lib/sanity";


/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad } from "./$types";
const load:PageServerLoad= async ()=>{
  const query  = `${getSingleDocument('contactSettings')} {title, subtitle, sites, contactOptions, 'contactVideo' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage}`
  const res = await sanityGet<ContactSettings>(query);
  return res;

}

export {load};