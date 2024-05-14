import { sanityGet } from "$lib/sanity";
import {json} from "@sveltejs/kit";
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

/** @type {import('./$types').RequestHandler} */
export async function GET({fetch}) {
  const res = await sanityGet<SiteSettings>(query, fetch);
  return json(res);
}

