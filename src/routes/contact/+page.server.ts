import { getSingleDocument } from "$lib/draftCheck";
import { sanityGet } from "$lib/sanity";
import { videoFields } from "$lib/sanity";

/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad } from "./$types";
import type {ContactSettings} from "$lib/types/sanity";
const load:PageServerLoad= async ()=>{
  const query  = `${getSingleDocument('contactSettings')} {title, subtitle, sites, contactOptions, 'contactVideo' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage}`
  return await sanityGet<ContactSettings>(query);
}

export {load};
export const prerender = process.env.NODE_ENV ? process.env.NODE_ENV != 'development' : true;
