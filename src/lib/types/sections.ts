import type {VideoOrImage, CodeShape, TeamMember, Partner} from "./sanity";

export type SectionLayout = 'hero' | 'heroSimple' | 'more' | 'product' | 'tour' | 'ecommerce' | 'licensing' | 'team' | 'partners' | 'connect'

export interface Block {
  _type: string,
  _key: string,
  [key: string]: string;
  id: string,
  content: string,
  mark: string,
  type: string,
}

export interface QuoteShape {
  image: SanityImageObject,
  logo: SanityImageObject,
  quote: string,
  title: string,
  quoteTitle: string,
  subtitle?:string
}

export interface SectionBase {
  anchor: string,
  intro: string | null,
  title: string | null,
  layout: SectionLayout,
  subtitle: string | null,
}
export interface CounterModel {
  introduction: string,
  subtitle: string,
  number: number
}

export interface CommonSection extends SectionBase {
  box: Array<Block>
}

export interface ImageSection extends CommonSection {
  image: SanityImageObject
}

export interface HeroImage {
  image: SanityImageObject,
  title: string
}

export interface HeroSection extends CommonSection {
  layout: 'hero'
  heroGallery: Array<HeroImage>
}

export interface MoreSection extends CommonSection {
  layout: 'more'
  moreVideo: VideoOrImage
}

export interface ProductSection extends ImageSection {
  layout: 'product'
  imageSmall: SanityImageObject
}
export interface TourSection extends CommonSection {
  layout: 'tour'
  quoteGallery: Array<QuoteShape>
}

export interface ECommerceSection extends CommonSection {
  layout: 'ecommerce'
  counters: Array<CounterModel>,
  computer: VideoOrImage,
  computer2: VideoOrImage,
  phone: VideoOrImage,
  phone2: VideoOrImage,
  tablet: VideoOrImage
}
export interface LicensingSection extends ImageSection {
  layout: 'licensing'
  logoGallery: Array<SanityImageObject>,
  image2: SanityImageObject
}

export interface TeamSection extends ImageSection {
  layout: 'team',
  logoGallery: Array<SanityImageObject>
  teamMembers: Array<TeamMember>
}

export interface ConnectSection extends SectionBase {
  layout: 'connect'
  instagramWidget: CodeShape,
  showSocials: boolean
}

export interface PartnerSection extends SectionBase {
  layout: 'partners',
  partners: Partner[]
}

export interface HeroSimpleSection extends SectionBase {
  layout: 'heroSimple',
  anchor: string|null,
  subtitleLine1: string|null,
  subtitleLine2: string|null,
}

export type SectionShape = HeroSection | HeroSimpleSection | MoreSection | ProductSection | TourSection | ECommerceSection | LicensingSection | TeamSection | PartnerSection | ConnectSection;
