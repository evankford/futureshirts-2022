import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

/** @type {import('./__types/[slug]').RequestHandler} */
export async function GET({params}) {
  const query = `${getSingleDocumentFromSlug(params.slug)}{'slug' : slug.current, "seo" : {nofollow, 'title':  seoTitle, 'image': seoImage, 'description' : seoDescription }, title, subtitle, image, content}`;
  // `params.id` comes from [id].js
  const res = await sanityGet<SiteSettings>(query)
  return res;
}