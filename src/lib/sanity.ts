import sanityClient from '@sanity/client'
import { error } from '@sveltejs/kit';

import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource} from "@sanity/image-url/lib/types/types"
import {getTeamMembers} from "$lib/draftCheck";
const apiVersion = '2021-10-21';
const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET

export const client = sanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: import.meta.env.SANITY_TOKEN
})

const builder = imageUrlBuilder(client);
export const urlFor = (source:SanityImageSource) => {
  return builder.image(source);
}

export const sanityFetch = async (query:string, fetcher:typeof fetch| undefined = undefined) => {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization' : `Bearer ${import.meta.env.SANITY_TOKEN}`
  }
  if (fetcher){

    return await fetcher(url, {headers})
  }

  return await fetch(url, {headers});
}


export const sanityGet = async<T>(query:string, fetcher: typeof fetch | undefined = undefined):Promise<T> => {
  try {
      const resp = await sanityFetch(query, fetcher );
      const data = await resp.json();
      if (!data?.result)  {
        // noinspection ExceptionCaughtLocallyJS
        throw error(400, "No Data returned from CMS for query: " + query);
      }
      return data.result
    } catch(e:unknown) {
      console.error(e);
      if (e instanceof Error){
        throw error(500, e.message);
      }

    }
  }



// const combineButtons = `"buttons" : buttons[]{title, "linkUrl" : linkUrl{..., ref->{slug, _type}}}`
const standardStuff = `layout, title, intro , subtitle, anchor`
function videoFields(str = 'video') {
  return `{'is': ${str}.is, 'image': ${str}.image , 'type' : ${str}.type, 'title': ${str}.title, 'background' : ${str}.background, 'url' : ${str}.url, 'fallbackImage' :  ${str}.fallbackImage, 'local': ${str}.video.asset->url, 'smallVideo' : ${str}.video.smallVersion.asset->url, 'localImage': ${str}.video.image }`
}

export const sectionGroqs = {
  hero: `layout == 'hero' => { ${standardStuff}, box, heroGallery}`,
  more: `layout == 'more' => { ${standardStuff}, box, 'moreVideo' : ${videoFields('moreVideo')}}`,
  product: `layout == 'product' => { ${standardStuff}, image, imageSmall, box}`,
  tour: `layout == 'tour' => { ${standardStuff},box, quoteGallery}`,
  ecommerce: `layout == 'ecommerce' => { ${standardStuff}, box, counters, 'computer' : ${videoFields('computer')}, 'computer2' : ${videoFields('computer2')}, 'phone' : ${videoFields('phone')}, 'phone2' : ${videoFields('phone2')}, 'tablet' : ${videoFields('tablet')}}`,
  licensing: `layout == 'licensing' => { ${standardStuff},image, box, image2, logoGallery}`,
  team: `layout == 'team' => {${standardStuff}, "teamMembers": ${getTeamMembers()}{ title, image }}`,
  connect: `layout == 'connect' => {${standardStuff}, instagramWidget,showSocials}`
}


export const sectionCheck = `_type == 'section' => {
  _type,
  "section": *[ _type == "section" && _id == ^._ref][0]{
    ${Object.values(sectionGroqs)}
  }
}`

const blockCheck = `_type == 'block' => {..., "emptyBlock": count(children)== 1 && children[0].text == ""}`
const defaultContent = `_type != 'block' && _type != 'section' => {...}`;
export const pageContent =  `"content" : content[]{
  ${sectionCheck}, ${blockCheck}, ${defaultContent}
}`


export { videoFields }
