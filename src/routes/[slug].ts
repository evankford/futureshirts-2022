import { sectionGroqs, sanityGet } from "$lib/sanity";

/** @type {import('./__types/[slug]').RequestHandler} */
export async function get({params}) {
  const query = `*[slug.current == '${params.slug}'][0]{'slug' : slug.current, "seo" : {nofollow, 'title':  seoTitle, 'image': seoImage, 'description' : seoDescription }, title, subtitle, image, content}`;
  // `params.id` comes from [id].js
  const res = await sanityGet<SiteSettings>(query)
  return res;
}