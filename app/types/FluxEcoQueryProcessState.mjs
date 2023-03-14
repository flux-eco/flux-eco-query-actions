/**
 * @typedef {Object} FluxEcoQueryProcessState
 * @property {string<QueryDefinition>} queryDefinition
 * @property {TransformationDefinitions} transformationDefintions
 */

/**
 * @typedef {Object} QueryDefinition
 * @param {string} tableName
 * @param {Join[]} joins
 * @param {WhereClause|null} where
 * @param {OrderBy|null} orderBy
 */

/**
 * Adds a join to the query.
 *
 * @typedef {function} QueryMysqlDataSource
 * @param {string} tableName - The name of the table to join.
 * @param {null|Join[]} joins - The name of the table to join. |  The type of the join (e.g. 'LEFT JOIN').  The join condition, including the fields to join on and the comparison operator.
 */

/**
 * An object that represents a join operation between two database tables.
 *
 * @typedef {Object} Join
 * @property {string} tableName - The name of the table to join.
 * @property {string} type - The type of the join (e.g. 'LEFT JOIN').
 * @property {JoinCondition} condition - The join condition, including the fields to join on and the comparison operator.
 */

/**
 * An object that represents the condition used in a join operation between two database tables.
 *
 * @typedef {Object} JoinCondition
 * @property {string} leftTableField - The name of the field in the left table to use in the join condition.
 * @property {string} rightTableField - The name of the field in the right table to use in the join condition.
 * @property {string} operator - The comparison operator to use in the join condition (e.g. '=', '<', '>', '<=', '>=', '<>', '!=', 'LIKE', 'NOT LIKE', etc.).
 */

/**
 * An object representing a WHERE clause for a SQL query.
 *
 * @typedef {Object} WhereClause
 * @property {string} operator - The operator to use for linking the WHERE conditions (e.g. "AND" or "OR").
 * @property {Condition[]} conditions - An array of WHERE conditions.
 * Each condition is represented as an object with the following properties:
 * @typedef {Object} Condition
 * @property {string} column - The name of the column to filter on.
 * @property {string} operator - The comparison operator to use (e.g. "=", "<", ">=", "LIKE", "IN").
 * @property {string} value - The value to compare the column against.
 */

/**
 * @property {Object} OrderBy - An object representing the ORDER BY clause for the query.
 * @property {string} column - An object representing the column to order the results by.
 * @property {string|null} asc|desc
 * The object should have a "type" property indicating the type of the column (e.g. "path").
 */



/**
 * @typedef {Object} TransformationDefinitions
 * @property {MapToTreeSettings} mapToTreeSettings
 * @property {CreateRootNodeFromMappedNodesSettings} createRootNodeFromMappedNodesSettings
 * @property {FilterTreeForASpecificLeafSettings} filterTreeForASpecificLeafSettings
 */

/**
 * @typedef {Object} MapToTreeSettings
 * @property {string} fieldNameNodeId
 * @property {string} fieldNameParentId
 * @property {boolean} expandedPerDefault
 * @property {MapDataSettings} mapDataSettings
 * @property {string} fieldNamePosition
 * @property {string} fieldNameType
 */

/**
 * @typedef {Object} MapDataSettings
 * @property {string} fieldNameLabel
 */

/**
 * @typedef {Object} CreateRootNodeFromMappedNodesSettings
 * @property {boolean} usePositionAsChildPropertyKey
 */

/**
 * @typedef {Object} FilterTreeForASpecificLeafSettings
 * @property {string} type
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


