

import S from '@sanity/desk-tool/structure-builder';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

import { FaAddressCard , FaSearchengin, FaEnvelope, FaLink, FaBring, FaArrowDown, FaGear, FaArrowUp, FaCode } from 'react-icons/fa';
import {TbSection, TbSettings } from 'react-icons/tb';


export default () =>
	S.list()
		.title('Base')

		.items([
			...S.documentTypeListItems()

				.filter(
				(listItem) =>
					listItem.getSchemaType().name != 'section' &&
					![
						'siteSEO',
						'contactSettings',
						'header',
						'footer',
						'socialMedia',
						'codes',
						'jobs',
						'support'
					].includes(listItem.getId())
			),
			orderableDocumentListDeskItem({
				type: 'section',
				icon: TbSection,
				title: 'Front page Sections'
			}),

			S.divider(),
			S.listItem()
				.title('Settings')
				.icon(TbSettings)
				.child(
					S.list()
					.title('Settings')
						.items([
							S.listItem()
								.title('Header')
								.icon(FaArrowUp)
								.child(
									S.document()
										.schemaType('header')
										.id('header')
										.title('Header')
										.documentId('header')
								),
							S.listItem()
								.title('Footer')
								.icon(FaArrowDown)
								.child(
									S.document()
										.schemaType('footer')
										.id('footer')
										.title('Footer')
										.documentId('footer')
								),

							S.listItem()
								.title('Contact Settings')
								.icon(FaEnvelope)
								.child(
									S.document()
										.schemaType('contactSettings')
										.id('contactSettings')
										.title('Contact')
										.documentId('contactSettings')
								),
							S.listItem()
								.title('Social Media')
								.icon(FaLink)
								.child(
									S.document()
										.schemaType('socialMedia')
										.id('socialMedia')
										.title('Social Media')
										.documentId('socialMedia')
								),
							S.listItem()
								.title('SEO Settings')
								.icon(FaSearchengin)
								.child(
									S.document()
										.schemaType('siteSEO')
										.id('siteSEO')
										.title('SEO')
										.documentId('siteSEO')
								),
							S.listItem()
								.title('Header/Footer Code')
								.icon(FaCode)
								.child(
									S.document()
										.schemaType('codes')
										.id('codes')
										.title('Header/Footer Code')
										.documentId('codes')
								)
						])
				),
			S.listItem()
				.title('Jobs')
				.icon(FaAddressCard)
				.child(S.document().schemaType('jobs').id('jobs').title('Jobs').documentId('jobs'))
		]);
