import {defineConfig} from 'sanity'
import {visionTool} from "@sanity/vision";
import {codeInput} from "@sanity/code-input";
import { markdownSchema } from "sanity-plugin-markdown";
import structure from "./schemas/deskStructure";
import { noteField } from 'sanity-plugin-note-field'
import {
    dashboardTool,
    sanityTutorialsWidget,
    projectUsersWidget,
    projectInfoWidget,
} from "@sanity/dashboard";
import objects from "./schemas/objects";
import documents from "./schemas/documents";
import settings from "./schemas/settings";
import {structureTool} from 'sanity/structure'

export default defineConfig({
    "name": "futureshirts-site",
    projectId: '13ahf4jn',
    "dataset": "production",
    "plugins": [
        structureTool({
            structure,
        }),
        visionTool(),
        codeInput(),
        noteField(),
        dashboardTool({widgets: [
                sanityTutorialsWidget(),
                projectInfoWidget(),
                projectUsersWidget(),
            ]}),
        markdownSchema()
    ],
    schema: {
        types: [
            ...objects,
            ...documents,
            ...settings
        ]
    },
});
