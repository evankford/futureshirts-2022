import { sectionGroqs, sanityGet } from "$lib/sanity";
import { getSections } from "$lib/draftCheck";
/** @type {import('./$types').PageServerLoad} */

import type { PageServerLoad } from "./$types";

const load:PageServerLoad= async()=>{
  const query = `{"sections": ${getSections()} { ${Object.values(sectionGroqs)} }}`;
  const res = await sanityGet<SiteSettings>(query)
  return res;
}
export {load};