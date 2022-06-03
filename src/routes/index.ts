import { sectionGroqs, sanityGet } from "$lib/sanity";

/** @type {import('./__types/index').RequestHandler} */

const query = `{"sections": *[_type == 'section' && !(_id in path("drafts.**"))] | order(orderRank) {${Object.values(sectionGroqs)} }  }`;
export async function get() {
  // `params.id` comes from [id].js
  const res = await sanityGet<SiteSettings>(query)
  return res;
}
