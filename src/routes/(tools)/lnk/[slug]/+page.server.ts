import { sanityGet } from "$lib/sanity";
import { getSingleDocumentFromSlug } from "$lib/draftCheck";

/** @type {import('../../../../../.svelte-kit/types/src/routes').PageServerLoad} */
import type {EmailOptionShape, MenuItemShape, PageData, PageSEO, VideoObject} from "$lib/types/sanity";
import type { PageServerLoad } from "../../../../../.svelte-kit/types/src/routes/(site)/[slug]/$types";
import type {SanityFileAsset} from "@sanity/asset-utils";


export interface EmbedBase {
   title: string
  _key: string
  _type: 'lnkContact'|'lnkVideo'| 'lnkPdf'
}

export interface LinkPageContact extends EmbedBase {
  _type: 'lnkContact',
  email: EmailOptionShape[],
  prettyTitle: string,
  subtitle?: string
}

export interface LinkPageVideo extends EmbedBase {
  _type: 'lnkVideo',
  video: VideoObject,
}
export interface LinkPagePdf extends EmbedBase {
  _type: 'lnkPdf',
  pdfUrl: string,
}

export interface LinkPageLink extends MenuItemShape {
  _type: 'menuItem',
  _key: string
}

export type LinkPageEmbed = LinkPageContact | LinkPageVideo | LinkPagePdf | LinkPageLink

export interface LinkPageData extends PageSEO {
  title: string
  subtitle?: string
  slug: string,
  embed: LinkPageEmbed[]
}

export const load: PageServerLoad=async({params})=> {
  const query = `${getSingleDocumentFromSlug(params.slug, 'linker')}{
          'slug' : slug.current, "seo" : {'nofollow': true, 'title':  seoTitle }, title, subtitle, 'embed' : [
            ...embed[_type == 'lnkPdf'] { title, _type, _key,'pdfUrl': pdf.asset->url},
            ...embed[_type != 'lnkPdf'] {...},
          ]
         }`;
  // `params.id` comes from [id].js
  return await sanityGet<PageData>(query)
}
