import {  sanityGet } from "$lib/sanity";
import {getTeamMembers, getSingleDocumentFromSlug, getPartners} from "$lib/draftCheck";
import type { TeamPageData} from "$lib/types/sanity";
import type { PageServerLoad } from "./$types";
const load:PageServerLoad= async()=>{
    const query = `${getSingleDocumentFromSlug('partners')}{ title, subtitle, unfeaturedTitle, includeContact, contactTitle, 'partners': ${getPartners()}{_id, title, featured, featuredImage, logo, websiteUrl, storeUrl}}`;
    return await sanityGet<TeamPageData>(query);
}
export {load};

export const prerender = process.env.NODE_ENV ? process.env.NODE_ENV != 'development' : true;
