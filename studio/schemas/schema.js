// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

import objects from './objects.js';
import documents from './documents.js';
import settings from './settings.js';

const schema = [
	/* Your types here! */
	...objects,
	...documents,
	...settings
]
export default schema
