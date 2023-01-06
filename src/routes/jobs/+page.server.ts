import { sanityGet } from "$lib/sanity";
import { getSingleDocument } from "$lib/draftCheck";

const query = `${getSingleDocument('jobs')} {email,title, subtitle,image,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle,openings}`

import type { PageServerLoad } from "./$types";
import type {JobSettings} from "$lib/types/sanity";
export const load: PageServerLoad=async()=> {
  const all:JobSettings = await sanityGet<JobSettings>(query);
  if (all.openings) {
    all.openings = all.openings.filter(op=>op.active == true);
  }

  return all;
}

