export default {
	name: 'lnkPdf',
	title: 'Embedded PDF',
	type: 'object',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (R) => R.required()
		},
		{
			name: 'pdf',
			type: 'file',
			title: 'PDF',
			options: {
				accept: 'application/pdf'
			}
		}
	]
};
