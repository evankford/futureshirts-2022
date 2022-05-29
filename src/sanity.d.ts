/// <reference path="../node_modules/@sanity/image-url/lib/types/index.d.ts" />
/// <reference path="../node_modules/@sanity/image-url/lib/types/types.d.ts" />

interface LinkURL {
  type: 'internal' | 'external' | 'anchor' | 'submenu',
  anchor?: string,
  ref?:DocBase,
  url?:string,
  openInNewTab?:boolean
  submenu: MenuItem[]
}

interface MenuItemShape {
  title: string,
  linkUrl: LinkURL
}

interface CodeSnippetSettings {
  headerCode?: CodeSnippet[],
  footerCode?: CodeSnippet[]
}

interface HeaderSettings {
  staticLogo?:SanityImageObject,
  staticLogoOverlay?:SanityImageObject,
  menuItems: MenuItemShape[]
}

interface FooterSettings {
  copyrightText: string,
  menuItems: MenuItemShape[]
}
interface SiteSEO {
  title: string,
  description: string,
  nofollow: boolean,
  favicon: SanityImageObject
}

type SocialLinkType ='facebook'| 'instagram' |'twitter' | 'youtube' |'tiktok'| 'spotify' | 'apple' | 'twitch'

interface SocialLink {
  type: SocialLinkType
  url: string,
}

interface SocialMediaSettings {
  socials: SocialLink[]
  image: SanityImageObject,

}

interface ContactSettings {
  email: string,
  title: string,
  blurb: string,
  successMessage: string,
  successTitle: string,
  errorMessage: string,
  errorTitle: string,
}

interface SiteSettings {
  seo: SiteSEO,
  header: HeaderSettings,
  footer: FooterSettings,
  contact: ContactSettings,
  codes: CodeSnippetSettings
}


interface CodeShape {
  _type: 'code',
  language: 'html' ,
  code: string
}

interface CodeSnippet {
  code: CodeShape,
  title: string,
  active: boolean
}