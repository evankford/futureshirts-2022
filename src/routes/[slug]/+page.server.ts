import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

/** @type {import('./$types').PageServerLoad} */
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad=async({params})=> {
  const query = `${getSingleDocumentFromSlug(params.slug)}{'slug' : slug.current, "seo" : {nofollow, 'title':  seoTitle, 'image': seoImage, 'description' : seoDescription }, title, subtitle, image, content}`;
  // `params.id` comes from [id].js
  const res = await sanityGet<PageData>(query)
  return res;
}