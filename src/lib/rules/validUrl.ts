import type { Rule } from '@sanity/types';

const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export function validUrl(config: {
    required?: boolean;
    allowedDomains?: string[];
} = {}): (rule: Rule) => Rule {
    return (rule: Rule) =>
        rule.custom((value: string | undefined) => {
            if (!value) {
                return config.required ? 'URL is required' : true;
            }

            if (!urlPattern.test(value)) {
                return 'Please enter a valid URL';
            }

            if (config.allowedDomains && config.allowedDomains.length > 0) {
                const domain = new URL(value).hostname;
                if (!config.allowedDomains.some(allowedDomain => domain.includes(allowedDomain))) {
                    return `URL must be from one of these domains: ${config.allowedDomains.join(', ')}`;
                }
            }

            return true;
        });
}