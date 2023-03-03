import {MysqlSourceQueryHandler} from "../Handlers/MysqlSourceQueryHandler.mjs";
import '../../../types/flux-eco-query-actions-types.mjs';
import {MiddlewareChain} from "../Middlewares/MiddlewareChain.mjs";
import {MapResultsToResponseTemplateMiddleware} from "../Middlewares/MapResultsToResponseTemplateMiddleware.mjs";
import {SortResultsMiddleware} from "../Middlewares/SortResultsMiddleware.mjs";

export class FluxEcoQueryActionsApi {
    #config;

    constructor(config) {
        this.#config = config;
    }

    /**
     * Creates a new instance of the Api class.
     * @param {Object} options - The configuration options for the API.
     * @param {Object} options.mysqlClientConfig - The configuration options for the MySQL data source.
     * @returns {Promise<FluxEcoQueryActionsApi>} - A Promise that resolves to a new instance of the Api class.
     */
    static async newMysqlSourceQueryActions(options) {
        return new FluxEcoQueryActionsApi(options);
    }

    /**
     * Creates a new instance of the Api class.
     * @param {Object} options - The configuration options for the API.
     * @param {Object} options.httpClientConfig - The configuration options for the HTTP data source.
     * @returns {Promise<FluxEcoQueryActionsApi>} - A Promise that resolves to a new instance of the Api class.
     */
    static async newHttpSourceQueryActions(options) {
        return new FluxEcoQueryActionsApi(options);
    }


    /**
     * Query the REST data source.
     * @param {Object} options - The configuration options for the query.
     * @param {Object} options.sortDefinition - The sort object for the query.
     * @returns {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async queryHttpDataSource(options) {
        //const {filter, sortDefinition, responseTemplate} = options;
        //const response = await FilterMiddleware.new(responseTemplate);
        //const queryData = await this.#restClientConfig.query({sortDefinition});
        // Perform any additional data processing here
        //return queryData;
    }

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
     * @type QueryMysqlDataSource
     * @param {string} tableName
     * @param {Join[]} joins
     * @param {QueryOptions} queryOptions
     * @return {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async queryMysqlDataSource({tableName, joins, queryOptions}) {

        const handler = await MysqlSourceQueryHandler.new(this.#config.server);
        const results = await handler.handle(tableName, joins);

        const transformedResults = this.handleMiddlewares(results, queryOptions);
        return transformedResults;
    }

    /**
     * Executes a list of middleware functions on an array of data.
     * @param {Array} results - The array of results objects to process
     * @param {QueryOptions} queryOptions
     * @returns {Promise<Array>} - A Promise that resolves to the response objects
     */
    handleMiddlewares(data, queryOptions) {

         const onInterruptProcessing = (result) => {
             console.log(result);
            return result;
        }

        const handleFailure = (error) => {
            Error(error);
        }

        const middlewareChain = MiddlewareChain.new([
                MapResultsToResponseTemplateMiddleware.new(queryOptions, handleFailure, onInterruptProcessing),
            ], handleFailure, onInterruptProcessing);

        return middlewareChain.process(data);
    }
}
