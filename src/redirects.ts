export interface RedirectOption {
    from: string
    to: string,
    status?: number
}


const redirects: RedirectOption[]=[
	{
		from: '/pages/contact-us',
		to:'/contact'
	},
	{
		from: '/pages/contact',
		to:'/contact'
	},
	{
		from: '/pages/privacy-policy',
		to:'/privacy-policy'
	},
	{
		from: '/pages/jobs',
		to:'/privacy-policy'
	},
	{
		from:'/pages/about',
		to:'/#more-than-shirts'
	},

	{
		from:'/pages/merchandise',
		to:'/#product'
	},
	{
		from:'/pages/faq',
		to: '/faq'
	},
	{
		from:'/collections/staff',
		to: '/team'
	},
	{
		from:'/collections/custom-shopify-site',
		to: '/#ecommerce'
	}
]

export default redirects;
