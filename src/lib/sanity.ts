import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource} from "@sanity/image-url/lib/types/types"
const apiVersion = '2021-10-21';
const projectId = import.meta.env.VITE_PROJECT_ID;
const dataset = import.meta.env.VITE_DATASET
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


export const sanityGet = async <T>(query:string):Promise<{status:number, body: string | T | any}> => {
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
    } catch(e:any) {
      // console.error(e);
      return {
        status: 500,
        body : e
      }
    }
  }

const combineButtons = `"buttons" : buttons[]{title, "linkUrl" : linkUrl{..., ref->{slug, _type}}}`
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
  team: `layout == 'team' => {${standardStuff}, image}`,
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