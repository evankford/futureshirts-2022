import {defineConfig} from 'sanity'
import type { SanityDocumentStub } from "@sanity/client";
import {deskTool, StructureBuilder} from 'sanity/desk'
import {visionTool} from "@sanity/vision";
import {codeInput} from "@sanity/code-input";
import { markdownSchema } from "sanity-plugin-markdown";
import deskStructure from "./schemas/deskStructure";
import { noteField } from 'sanity-plugin-note-field'

import objects from "./schemas/objects";
import documents from "./schemas/documents";
import settings from "./schemas/settings";


export default defineConfig({
  "name": "futureshirts-site",
  "projectId": process.env.SANITY_STUDIO_PROJECT_ID,
  "dataset": "production",
  "plugins": [
    markdownSchema(),
    deskTool({
      structure: deskStructure
    }),
    visionTool(),
    codeInput(),
    noteField()
  ],
  schema: {
    types: [
      ...objects,
      ...documents,
      ...settings
    ]
  },
  // document: {
  //   productionUrl:  async (prev, context) => {
  //     // context includes the client and other details
  //     const { dataset, document} = context
  //     const stagingUrl = process.env.SANITY_STUDIO_STAGING_URL
  //     if (document._type == 'section') {
  //       return `${stagingUrl}/#${document.anchor}`
  //     }
  //
  //     if (document.slug.current == 'jobs' || document._id == 'jobs') {
  //       return `${stagingUrl}/jobs`
  //     }
  //     if (document.slug.current == 'contact') {
  //       return `${stagingUrl}/contact`
  //     }
  //     return `${stagingUrl}/${document.slug.current}`
  //   }
  // },
  // "env": {
  //   "development": {
  //     "plugins": [
  //       "@sanity/vision"
  //     ]
  //   }
  // },

});
