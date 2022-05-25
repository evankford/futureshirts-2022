export default {
	name: 'codes',
	title: 'Header/Footer Code',
	type: 'document',
	__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],

	fields: [
		{
			name: 'headerCode',
			title: 'Header Code',
			type: 'array',
			description: 'Inserted before the end of the </head> tag.',
			of: [{ type: 'codeSnippet' }]
		},
		{
			name: 'footerCode',
			title: 'Footer Code',
			type: 'code',
			description: 'Inserted before the end of the </body> tag.',
			type: 'array',
			of: [{ type: 'codeSnippet' }]
		}
	]
};