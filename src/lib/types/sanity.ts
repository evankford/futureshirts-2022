import type {
    SanityImageObject,
    SanityAsset
}  from "@sanity/image-url/lib/types/types";
import type {Block, CounterModel, SectionShape} from "$lib/types/sections";
/// <reference types="@sanity/image-url" />

export interface LinkURL {
  type: 'internal' | 'external' | 'anchor' | 'submenu',
  anchor?: string,
  ref?:DocBase,
  url?:string,
  openInNewTab?:boolean
  submenu?: MenuItemShape[]
}

export interface MenuItemShape {
  title: string,
  linkUrl: LinkURL
}

export interface CodeSnippetSettings {
  headerCode?: CodeSnippet[],
  footerCode?: CodeSnippet[]
}
export interface TeamMember {
  title: string,
  image: SanityImageObject,
  questions?: TeamMemberQuestion[]
}

export interface TeamMemberQuestion {
  question: string,
  answer?: string
}

export interface ContactLink {
  title: string,
  slug: string
}

export interface HeaderSettings {
  contactLink: ContactLink
  menuItems: MenuItemShape[]
}

export interface FooterSettings {
  copyrightText: string,
  address: string,
  menuItems: MenuItemShape[]
}
export interface SiteSEO {
  title: string,
  description: string,
  nofollow: boolean,
  favicon: SanityImageObject,
  image: SanityImageObject
}

export interface PageSEO {
  title?:string,
  description?:string,
  nofollow?: boolean
  image?: SanityImageObject
}
export type SocialLinkType ='facebook'| 'instagram' |'twitter' | 'youtube' |'tiktok'| 'spotify' | 'apple' | 'twitch'

export interface SocialLink {
  type: SocialLinkType
  url: string,
}

export interface SocialMediaSettings {
  socials: SocialLink[]
  image: SanityImageObject,

}
export interface ContactOption {
  title: string,
  message: Block[],
  email?: EmailOptionShape[],
}


export interface SiteSettings {
  seo: SiteSEO | null,
  header: HeaderSettings | null,
  footer: FooterSettings | null,
  contact: ContactSettings | null,
  codes: CodeSnippetSettings | null,
  socials: SocialMediaSettings | null
  jobs: JobSettings | null
  support: SimpleSupportSettings | null
  sections?: SectionShape[]
}

export interface TeamPageData {
  title: string
  subtitle?: string
  teamMembers: TeamMember[]
}


export interface CodeShape {
  _type: 'code',
  language: 'html' ,
  code: string
}

export interface CodeSnippet {
  code: CodeShape,
  title: string,
  active: boolean
}

export interface LocalVideo extends SanityAsset {

  image: SanityImageObject,
  smallVersion: SanityAsset //?
 }

export interface VideoObject {
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

export type VideoOrImage = VideoOrImageImage | VideoOrImageVideo

export interface VideoOrImageImage  {
  is: 'image',
  title: string | null,
  image: SanityImageObject,

}

export interface VideoOrImageVideo extends VideoObject {
  is: 'video'
  image: SanityImageObject
}


 export interface Opening {
    title: string,
    subtitle?: string
    email: EmailOptionShape[],
    description: Block[],
    fullDescription: Block[],
    active: boolean,
    url?: string
  }

  export interface EmailOptionShape {
    name?:string
    email: string
  }

  export interface FormSettings {
    email: EmailOptionShape[]
    title: string
    subtitle ?:string
    successTitle: string
    successMessage: string
    errorTitle: string
    errorMessage: string
  }
export interface ContactSettings extends FormSettings {
  image:SanityImageObject
  content: Block[]
  contactOptions: ContactOption[]
  contactVideo?: VideoOrImage
}
export interface SupportSettings extends DocBase {
  email: string,
  counters?: CounterModel[],

}

  export interface JobSettings extends FormSettings{
    image:SanityImageObject
    content: Block[]
    haveOpeningsTitle: string
    haveOpenings: string
    noCurrentOpeningsTitle: string
    noCurrentOpenings: string
    openings: Opening[]
  }

export interface SlugShape {
  _type: 'slug',
  current: string
}

  export interface SEOSettingsBase {
  seoTitle?: string,
  slug: string,
  seoImage?:SanityImageObject,
  seoDescription: string,
}


  export interface DocBase extends SEOSettingsBase {
  _type: 'company'|'news'|'page',
  _createdAt: string,
  _id: string,
  title: string,
  subtitle?: string
  image?:SanityImageObject
}

export interface SimpleSupportSettings {
  title: string
  subtitle: string
  email: string
}

export interface PageData extends PageSEO {
  title: string,
  subtitle?: string,
  image?: SanityImageObject,
  email?:string,
  counters?: CounterModel[]
  content: Block[]
}
