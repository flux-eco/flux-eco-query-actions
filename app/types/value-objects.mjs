/**
 * @typedef {Object} QueryOptions
 * @property {Object} responseTemplate - The response template object.
 * @property {SortDefinition} [sortDefinition] - The sort definition object. Optional.
 * @property {FilterSchema} [filterSchema] - The filter schema object. Optional.
 */


/**
 * A template object that defines how to map a result object to a response item.
 *
 * @typedef {Object} ResponseTemplate
 * @property {Function} parent - A function that returns the parent ID for the item.
 * @property {Function} id - A function that returns the ID for the item.
 * @property {Object} data - An object that defines the properties for the item.
 */

/**
 * A structure object that defines the structure of a response item.
 *
 * @typedef {Object} ResponseStructure
 * @property {String} parent - The parent ID for the item.
 * @property {String} id - The ID for the item.
 * @property {Object} data - The properties for the item
 */


/**
 * @typedef {Object} SortConfiguration
 * @property {string} field - The name of the field to sort by.
 * @property {string} direction - The direction to sort by. Must be 'ASC' or 'DESC'.
 */

/**
 * @typedef {Object} SortDefinition
 * @property {string} field - The name of the field to sort by.
 * @property {string} [direction='ASC'] - The direction to sort by. Defaults to 'ASC'.
 */

/**
 * @typedef {Object} FilterSchema
 * @property {string} field - The name of the field to filter on.
 * @property {string} operator - The comparison operator to use for the filter.
 * @property {any} value - The value to compare the field against.
 */
