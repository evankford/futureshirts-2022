

import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource} from "@sanity/image-url/lib/types/types"
import {api} from '../../studio/sanity.json'
const {projectId, dataset} = api;
const apiVersion = '2021-10-21';

export const client = sanityClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // token: import.meta.env.VITE_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);
export const urlFor = (source:SanityImageSource) => {
  return builder.image(source);
}

export const sanityFetch = async (query:string) => {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization' : `Bearer ${import.meta.env.VITE_SANITY_TOKEN}`
  }
  return fetch(url, {headers})
}


export const sanityGet = async (query:string) => {
  try {
      const resp = await sanityFetch(query);
      const data = await resp.json();
      if (!data?.result)  {
        return {
          status: 400,
          body: "No data"
        }
      }
      return {
        status: 200,
        body: data.result
      };
    } catch(e) {
      // console.error(e);
      return {
        status: 500,
        body : e
      }
    }
  }
