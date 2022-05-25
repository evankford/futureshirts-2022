import S from '@sanity/desk-tool/structure-builder';
export default () =>
	S.list()
		.title('Base')
		.items([
			...S.documentTypeListItems().filter(
				(listItem) =>
					![
						'siteSEO',
						'contactSettings',
						'header',
						'footer',
						'socialMedia',
						'codes'
					].includes(listItem.getId())
			),
			S.divider(),
			S.listItem()
				.title('Settings')
				.child(
					S.list()
						.title('Settings')
						.items([
							S.listItem()
								.title('Header')
								.child(S.document().schemaType('header').id('header').title('Header').documentId('header')),
							S.listItem()
								.title('Footer')
								.child(S.document().schemaType('footer').id('footer').title('Footer').documentId('footer')),
							S.listItem()
								.title('Contact Settings')
								.child(S.document().schemaType('contactSettings').id('contactSettings').title('Contact').documentId('contactSettings')),
							S.listItem()
								.title('Social Media')
								.child(S.document().schemaType('socialMedia').id('socialMedia').title('Social Media').documentId('socialMedia')),
							S.listItem()
								.title('SEO Settings')
								.child(S.document().schemaType('siteSEO').id('siteSEO').title('SEO').documentId('siteSEO')),
							S.listItem()
								.title('Header/Footer Code')
								.child(S.document().schemaType('codes').id('codes').title('Header/Footer Code').documentId('codes')),
						])
				)
		]);
