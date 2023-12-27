

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

import { FaAddressCard , FaSearchengin, FaEnvelope, FaLink, FaArrowDown,  FaArrowUp, FaCode } from 'react-icons/fa';
import {TbSection, TbSettings, TbUsers, TbUsersGroup, TbIdBadge2 } from 'react-icons/tb';
import type {StructureBuilder, StructureResolverContext} from "sanity/lib/exports/desk";


export default (S: StructureBuilder, context: StructureResolverContext) =>
	S.list()
		.title('Futureshirts')

		.items([
			...S.documentTypeListItems()
				.filter(
				(listItem) => {
					const sT = listItem.getSchemaType()
					return !['section', 'teamMember', 'tools', 'team', 'position'].includes((typeof sT === 'string' ?  sT : sT.name)) &&
					![
						'siteSEO',
						'contactSettings',
						'header',
						'footer',
						'socialMedia',
						'codes',
						'redirection',
						'jobs',
						'support'
					].includes(listItem.getId())
				}

			),
			orderableDocumentListDeskItem({
				S,
				context,
				type: 'section',
				// @ts-ignore
				icon: TbSection,
				title: 'Front page Sections'
			}),
			S.listItem()
				.icon(TbUsers)
				.title('FS Team')

				.child(
					S.list()
						.title('Team & Org')
						.items([
							orderableDocumentListDeskItem({
								S,
								context,
								type: 'teamMember',
								// @ts-ignore
								icon: TbUsers,
								title: 'Team Members'
							}),
							orderableDocumentListDeskItem({
								S,
								context,
								type: 'team',
								// @ts-ignore
								icon: TbUsersGroup,
								title: 'Teams'
							}),
							orderableDocumentListDeskItem({
								S,
								context,
								type: 'position',
								// @ts-ignore
								icon: TbIdBadge2,
								title: 'Positions'
							}),

						])

				),
			S.divider(),
			S.listItem()
				.title('Job Openings')
				.icon(FaAddressCard)
				.child(S.document().schemaType('jobs').id('jobs').title('Jobs').documentId('jobs')),

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
								),
							// S.listItem()
							// 	.title('Redirection')
							// 	.icon(FaArrowRight)
							// 	.child(
							// 		S.document()
							// 			.schemaType('redirection')
							// 			.id('redirection')
							// 			.title('Redirection')
							// 			.documentId('redirection')
							// 	)
						])
				),
		]);
