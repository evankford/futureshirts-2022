import { sanityGet } from "$lib/sanity";

const menuHelper = `[]{title, linkUrl{type, url, openInNewTab, anchor, ref->{'slug' : slug.current }}}`;

const query = `
{
  "header"   : *[_id == 'header'  ][0] {menuItems${menuHelper}, 'contactLink': { 'title':  coalesce(^.contactLink.title, 'Get in Touch'), 'slug': *[_type == 'page' && ^.contactLink.ref._ref == _id][0].slug.current }},
  "footer"   : *[_id == 'footer'  ][0] {menuItems${menuHelper}, copyrightText},
  "codes"    : *[_id == 'codes'   ][0] {headerCode, footerCode},
  "contact"  : *[_id == 'contactSettings' ] {email, successTitle, successMessage, errorTitle, errorMessage},
  "seo"      : *[_id == 'siteSEO' ][0] {title, description, nofollow, favicon, image},
  "socials"  : *[_id == 'socialMedia' ][0] { socials},
  "jobs"     : *[_id == 'jobs'    ][0] {email,title,blurb,successTitle,successMessage,errorTitle,errorMessage,haveOpeningsTitle,haveOpenings,noCurrentOpenings,noCurrentOpeningsTitle, openings}
}`;

/** @type {import('./__types/site.json').RequestHandler} */
export async function get():Promise<{status:number, body:SiteSettings|string}> {
  const res = await sanityGet<SiteSettings>(query)
  return res;
}