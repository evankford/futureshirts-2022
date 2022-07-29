import { type Writable, type Readable, writable, derived} from "svelte/store";

//Possible stores here
export const hasJobs:Writable<boolean> = writable(false);
export const navOpen:Writable<boolean> = writable(false);
export const socials: Writable<false | SocialLink[]> = writable(false);
export const seo: Writable<false | SiteSEO > = writable(false);
export const support: Writable<false | SimpleSupportSettings > = writable(false);
export const contact: Writable<false | ContactSettings > = writable(false);