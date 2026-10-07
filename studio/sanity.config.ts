import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemas';
import { singletonTypes, structure } from './structure';

// Set SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET in studio/.env (see studio/.env.example).
export default defineConfig({
  name: 'kuroda-autobody',
  title: 'Kuroda Autobody',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons (homepage) are not offered under "New document" and can't be duplicated or deleted.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((item) => !singletonTypes.has(item.templateId)) : prev,
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },
});
