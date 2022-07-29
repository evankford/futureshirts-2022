import { sanityGet } from "$lib/sanity";

const query = `*[_id == 'jobs'][0] {email,title, subtitle,image,blurb,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle,openings}`

/** @type {import('./__types/jobs.json').RequestHandler} */

export async function GET() {
  return await sanityGet(query);
}

