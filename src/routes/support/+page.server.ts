import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

import type { PageServerLoad } from "./$types";
const load: PageServerLoad = async ()=>{
  const query = `${getSingleDocumentFromSlug('support')}{email,title,subtitle,counters,image,blurb,content}`
  const res = await sanityGet<PageData>(query, fetch)
  return res;
}

export {load};