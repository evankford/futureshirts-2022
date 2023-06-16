import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad } from "./$types";
import type {PageData} from "../../lib/types/sanity";
export const load: PageServerLoad=async({params})=> {
  const query = `${getSingleDocumentFromSlug(params.slug)}{'slug' : slug.current, "seo" : {nofollow, 'title':  seoTitle, 'image': seoImage, 'description' : seoDescription }, title, subtitle, image, content}`;
  // `params.id` comes from [id].js
  return await sanityGet<PageData>(query)
}
