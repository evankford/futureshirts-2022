import { sectionGroqs, sanityGet } from "$lib/sanity";
import { getSections } from "$lib/draftCheck";
/** @type {import('./__types/index').RequestHandler} */

export async function GET() {
  const query = `{"sections": ${getSections()} { ${Object.values(sectionGroqs)} }}`;
  console.log(query);
  const res = await sanityGet<SiteSettings>(query)
  return res;
}
