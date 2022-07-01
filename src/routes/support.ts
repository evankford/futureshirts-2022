import { sectionGroqs, sanityGet } from "$lib/sanity";

/** @type {import('./__types/support]').RequestHandler} */
export async function get() {
  const query = `*[_id == 'support'][0] {email,title,subtitle,image,blurb,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle, shops}`
  // `params.id` comes from [id].js
  const res = await sanityGet<SiteSettings>(query)
  return res;
}