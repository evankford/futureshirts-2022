import {  sanityGet } from "$lib/sanity";
import {getTeamMembers, getSingleDocumentFromSlug} from "$lib/draftCheck";
import type { TeamPageData} from "$lib/types/sanity";
import type { PageServerLoad } from "./$types";
const load:PageServerLoad= async()=>{
    const query = `${getSingleDocumentFromSlug('team')}{ title, subtitle, 'teamMembers': ${getTeamMembers()}{title, image, questions}}`;
    console.log(query);
    return await sanityGet<TeamPageData>(query);
}
export {load};
