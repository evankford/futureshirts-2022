import {  sanityGet } from "$lib/sanity";
import {getTeamMembers, getSingleDocumentFromSlug} from "$lib/draftCheck";
import type { TeamPageData} from "$lib/types/sanity";
import type { RequestHandler } from './$types'
import {image_from_component, type RenderOptions} from 'svelte-component-to-image'

async function getTeamImages() {
    const query = `${getSingleDocumentFromSlug('team')}{ 'teamMembers': ${getTeamMembers()}{image, _id, title}}`;
    return await sanityGet<TeamPageData>(query);
}

import { error } from '@sveltejs/kit'
import TeamSectionBackgroundRenderer from "../../../lib/components/TeamSectionBackgroundRenderer.svelte";

export const GET: RequestHandler = (async ({}) => {
    try {
        const data = await getTeamImages();
        if (!data?.teamMembers) {
            throw error(500, 'No team members gotten.')

        }
        const options: RenderOptions = {
            width: 3000,
            height: 1800,
            props: {
                teamMembers:data.teamMembers
            },
            fonts: [],
        }

        // pass the component and options to the package
        const image    = await image_from_component(TeamSectionBackgroundRenderer, options)
        const response = new Response(image)
        response.headers.append('Content-Type', 'image/png')
        response.headers.append('Cache-Control', 'public, max-age=6000, stale-while-revalidate=86400\n')
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error trying to generate image from component.')
    }
}) satisfies RequestHandler;

export const prerender = true;

