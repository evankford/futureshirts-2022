import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

import type { PageServerLoad } from "./$types";
import type {PageData} from "$lib/types/sanity";
const load: PageServerLoad = async ()=>{
  const query = `${getSingleDocumentFromSlug('support')}{email,title,subtitle,counters,image,blurb,content}`
  return await sanityGet<PageData>(query, fetch)
}

export {load};

export const prerender = process.env.NODE_ENV ? process.env.NODE_ENV != 'development' : true;
