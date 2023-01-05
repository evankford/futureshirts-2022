type ImageUrlBuilderOptions = Partial<SanityProjectDetails> & {
    baseUrl?: string;
    source?: SanityImageSource;
    bg?: string;
    dpr?: number;
    width?: number;
    height?: number;
    focalPoint?: {
        x: number;
        y: number;
    };
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    blur?: number;
    sharpen?: number;
    rect?: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    format?: ImageFormat;
    invert?: boolean;
    orientation?: Orientation;
    quality?: number;
    download?: boolean | string;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    ignoreImageParams?: boolean;
    fit?: FitMode;
    crop?: CropMode;
    saturation?: number;
    auto?: AutoMode;
    pad?: number;
};
type ImageUrlBuilderOptionsWithAliases = ImageUrlBuilderOptions & {
    w?: number;
    h?: number;
    q?: number;
    fm?: number;
    dl?: boolean | string;
    or?: Orientation;
    sharp?: number;
    'min-h'?: number;
    'max-h'?: number;
    'min-w'?: number;
    'max-w'?: number;
    sat?: number;
    [key: string]: any;
};
type ImageUrlBuilderOptionsWithAsset = ImageUrlBuilderOptions & {
    asset: {
        id: string;
        width: number;
        height: number;
        format: string;
    };
    [key: string]: any;
};
type ImageFormat = 'jpg' | 'pjpg' | 'png' | 'webp';
type FitMode = 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
type CropMode = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy';
type AutoMode = 'format';
type Orientation = 0 | 90 | 180 | 270;
 interface SanityClientLike {
    clientConfig: {
        dataset?: string;
        projectId?: string;
        apiHost?: string;
    };
}
type SanityImageSource = string | SanityReference | SanityAsset | SanityImageObject | SanityImageWithAssetStub;
 interface SanityProjectDetails {
    projectId: string;
    dataset: string;
}
 interface SanityReference {
    _ref: string;
}
 interface SanityImageWithAssetStub {
    asset: {
        url: string;
    };
}
 interface SanityAsset {
    _id?: string;
    url?: string;
    path?: string;
    assetId?: string;
    extension?: string;
    [key: string]: any;
}
 interface SanityImageDimensions {
    aspectRatio: number;
    height: number;
    width: number;
}
 interface SanityImageFitResult {
    width?: number;
    height?: number;
    rect: SanityImageRect;
}
 interface SanityImageRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
 interface SanityImageCrop {
    _type?: string;
    left: number;
    bottom: number;
    right: number;
    top: number;
}
 interface SanityImageHotspot {
    _type?: string;
    width: number;
    height: number;
    x: number;
    y: number;
}
 interface SanityImageObject {
    asset: SanityReference | SanityAsset;
    crop?: SanityImageCrop;
    alt?: string
    hotspot?: SanityImageHotspot;
}
 interface CropSpec {
    left: number;
    top: number;
    width: number;
    height: number;
}
 interface HotspotSpec {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
