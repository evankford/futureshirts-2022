import { sectionGroqs, sanityGet } from "$lib/sanity";
import { getSections } from "$lib/draftCheck";
/** @type {import('./$types').PageServerLoad} */

import type { PageServerLoad } from "./$types";
import type {SiteSettings} from "$lib/types/sanity";

const load:PageServerLoad= async()=>{
  const query = `{"sections": ${getSections()} { ${Object.values(sectionGroqs)} }}`;
  return await sanityGet<SiteSettings>(query)
}
export {load};
