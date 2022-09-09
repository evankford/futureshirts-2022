type SectionLayout = 'hero' | 'more' | 'product' | 'tour' | 'ecommerce' | 'licensing' | 'team' | 'connect'

interface Block {
  _type: string,
  _key: string,
  [key: string]: string;
  id: string,
  content: string,
  mark: string,
  type: string,
}

interface QuoteShape {
  image: SanityImageObject,
  logo: SanityImageObject,
  quote: string,
  title: string,
  quoteTitle: string,
  subtitle?:string
}

interface SectionBase {
  anchor: string,
  intro: string | null,
  title: string | null,
  layout: SectionLayout,
  subtitle: string | null,
}
interface CounterModel {
  introduction: string,
  subtitle: string,
  number: number
}

interface CommonSection extends SectionBase {
  box: Array<Block>
}

interface ImageSection extends CommonSection {
  image: SanityImageObject
}

interface HeroImage {
  image: SanityImageObject,
  title: string
}

interface HeroSection extends CommonSection {
  layout: 'hero'
  heroGallery: Array<HeroImage>
}

interface MoreSection extends CommonSection {
  layout: 'more'
  moreVideo: VideoOrImage
}

interface ProductSection extends ImageSection {
  layout: 'product'
  imageSmall: SanityImageObject
}
interface TourSection extends CommonSection {
  layout: 'tour'
  quoteGallery: Array<QuoteShape>
}

interface ECommerceSection extends CommonSection {
  layout: 'ecommerce'
  counters: Array<CounterModel>,
  computer: VideoOrImage,
  computer2: VideoOrImage,
  phone: VideoOrImage,
  phone2: VideoOrImage,
  tablet: VideoOrImage
}
interface LicensingSection extends ImageSection {
  layout: 'licensing'
  logoGallery: Array<SanityImageObject>,
  image2: SanityImageObject
}

interface TeamSection extends ImageSection {
  layout: 'team',
  logoGallery: Array<SanityImageObject>
}

interface ConnectSection extends SectionBase {
  layout: 'connect'
  instagramWidget: CodeShape,
  showSocials: boolean
}

type SectionShape = HeroSection | MoreSection | ProductSection | TourSection | ECommerceSection | LicensingSection | TeamSection | ConnectSection;