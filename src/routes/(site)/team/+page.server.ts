import {  sanityGet } from "$lib/sanity";
import {getTeamMembers, getSingleDocumentFromSlug} from "$lib/draftCheck";
import type { TeamPageData} from "$lib/types/sanity";
import type { PageServerLoad } from "./$types";
const load:PageServerLoad= async()=>{
    const query = `${getSingleDocumentFromSlug('team')}{ title, subtitle, 'teamMembers': ${getTeamMembers()}{_id, title, image, questions}}`;
    return await sanityGet<TeamPageData>(query);
}
export {load};

export const prerender = process.env.NODE_ENV ? process.env.NODE_ENV != 'development' : true;
