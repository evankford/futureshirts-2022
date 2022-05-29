import { sanityGet } from "$lib/sanity";

const query = `*[_id == 'header'] {menuItems, staticLogo, staticLogoOverlay}`;

/** @type {import('./__types/site.json').RequestHandler} */
export async function get() {
  return await sanityGet(query)
}