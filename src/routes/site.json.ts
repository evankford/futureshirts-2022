import { sanityGet } from "$lib/sanity";
import { getSingleDocument, getSingleDocumentFromSlug } from "$lib/draftCheck";
const menuHelper = `[]{title, linkUrl{type, url, openInNewTab, anchor, ref->{'slug' : slug.current }}}`;
import { videoFields } from "$lib/sanity";
const query = `
{
  "header"   : ${getSingleDocument('header')} {menuItems${menuHelper}, 'contactLink': { 'title':  coalesce(^.contactLink.title, 'Get in Touch'), 'slug': coalesce(^.slug, '/contact')}},
  "footer"   : ${getSingleDocument('footer')} {menuItems${menuHelper}, copyrightText},
  "codes"    : ${getSingleDocument('codes')} {headerCode, footerCode},
  "contact"  : ${getSingleDocument('contactSettings')} {title, subtitle, sites, contactOptions, 'video' : ${videoFields('video')}, email, successTitle, successMessage, errorTitle, errorMessage},
  "seo"      : ${getSingleDocument('siteSEO')} {title, description, nofollow, favicon, image},
  "socials"  : ${getSingleDocument('socialMedia')} { socials},
  "jobs"     : ${getSingleDocument('jobs')} {openings},
  "support"  : ${getSingleDocumentFromSlug('support')}{title,subtitle,email}
}`;


/** @type {import('./__types/site.json').RequestHandler} */
export async function GET():Promise<{status:number, body:SiteSettings|string}> {
  const res = await sanityGet<SiteSettings>(query)
  return res;
}