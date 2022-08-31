/// <reference path="../node_modules/@sanity/image-url/lib/types/types.d.ts" />
/// <reference types="@sanity/image-url" />



interface LinkURL {
  type: 'internal' | 'external' | 'anchor' | 'submenu',
  anchor?: string,
  ref?:DocBase,
  url?:string,
  openInNewTab?:boolean
  submenu?: MenuItem[]
}

interface MenuItemShape {
  title: string,
  linkUrl: LinkURL
}

interface CodeSnippetSettings {
  headerCode?: CodeSnippet[],
  footerCode?: CodeSnippet[]
}

interface ContactLink {
  title: string,
  slug: string
}

interface HeaderSettings {
  contactLink: ContactLink
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
  favicon: SanityImageObject,
  image: SanityImageObject
}

interface PageSEO {
  title?:string,
  description?:string,
  nofollow?: boolean
  image?: SanityImageObject
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
interface ContactOption {
  title: string,
  message: Block[],
  email?: EmailOptionShape[],
}


interface SiteSettings {
  seo: SiteSEO | null,
  header: HeaderSettings | null,
  footer: FooterSettings | null,
  contact: ContactSettings | null,
  codes: CodeSnippetSettings | null,
  socials: SocialMediaSettings | null,
  jobs: JobSettings | null
  support: SimpleSupportSettings | null
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

interface LocalVideo extends SanityAsset {

  image: SanityImageObject,
  smallVersion: SanityAsset //?
 }

interface VideoObject {
  type: 'youtube' | 'vimeo' | 'local',
  title: string | null,
  background: boolean,
  url: string | null,
  local: string | null,
  smallVideo: string | null,
  localImage: SanityImageObject | null,
  fallbackImage: SanityImageObject | null,
  _type: 'video'
}

type VideoOrImage = VideoOrImageImage | VideoOrImageVideo

interface VideoOrImageImage {
  is: 'image',
  title: string | null,
  image: SanityImageObject
}

interface VideoOrImageVideo extends VideoObject {
  is: 'video'
  image: SanityImageObject
}


 interface Opening {
    title: string,
    subtitle?: string
    email: EmailOptionShape[],
    description: Block[],
    fullDescription: Block[],
  }

  interface EmailOptionShape {
    name?:string
    email: string
  }

  interface FormSettings {
    email: EmailOptionShape[]
    title: string
    subtitle ?:string
    successTitle: string
    successMessage: string
    errorTitle: string
    errorMessage: string
  }
interface ContactSettings extends FormSettings {
  image:SanityImageObject
  content: Block[]
  stores: ContactOption[]
}
interface SupportSettings extends DocBase {
  email: string,
  counters?: CounterModel[],

}

  interface JobSettings extends FormSettings{
    image:SanityImageObject
    content: Block[]
    haveOpeningsTitle: string
    haveOpenings: string
    noCurrentOpeningsTitle: string
    noCurrentOpenings: string
    openings: Opening[]
  }

interface SlugShape {
  _type: 'slug',
  current: string
}

  interface SEOSettingsBase {
  seoTitle?: string,
  slug: string,
  seoImage?:SanityImageObject,
  seoDescription: string,
}


  interface DocBase extends SEOSettingsBase {
  _type: 'company'|'news'|'page',
  _createdAt: string,
  _id: string,
  title: string,
  subtitle?: string
  image?:SanityImageObject
}

interface SimpleSupportSettings {
  title: string
  subtitle: string
  email: string
}