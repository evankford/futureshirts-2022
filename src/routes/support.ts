import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

/** @type {import('./__types/support]').RequestHandler} */
export async function GET() {
  const query = `${getSingleDocumentFromSlug('support')}{email,title,subtitle,counters,image,blurb,content}`
  const res = await sanityGet<SiteSettings>(query)
  return res;
}