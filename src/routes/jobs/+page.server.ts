import { sanityGet } from "$lib/sanity";
import { getSingleDocument } from "$lib/draftCheck";

const query = `${getSingleDocument('jobs')} {email,title, subtitle,image,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle,openings}`

/** @type {import('./__types/jobs.json').RequestHandler} */

export async function GET() {
  return await sanityGet(query);
}

