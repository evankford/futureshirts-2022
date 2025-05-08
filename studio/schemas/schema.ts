// First, we must import the schema creator

// Then import schema types from any plugins that might expose them
// import schemaTypes from 'all:part:@sanity/base/schema-type';

import objects from './objects';
import documents from './documents';
import settings from './settings';

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [{
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: [
		/* Your types here! */
		...objects,
		...documents,
		...settings
	]
}];
