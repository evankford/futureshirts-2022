import { sanityGet } from "$lib/sanity";
import { getSingleDocument } from "$lib/draftCheck";

const query = `${getSingleDocument('jobs')} {email,title, subtitle,image,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle,openings}`

import type { PageServerLoad } from "./$types";
export const load: PageServerLoad=async()=> {
  return await sanityGet<JobSettings>(query);
}

