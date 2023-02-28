export class FluxEcoQueryActionsApi {
    #mysqlClientConfig;
    #restClientConfig;

    constructor(mysqlClientConfig, restClientConfig) {
        this.#mysqlClientConfig = mysqlClientConfig;
        this.#restClientConfig = restClientConfig;
    }

    /**
     * Creates a new instance of the Api class.
     * @param {Object} options - The configuration options for the API.
     * @param {Object} options.mysqlClientConfig - The configuration options for the MySQL data source.
     * @returns {Promise<Api>} - A Promise that resolves to a new instance of the Api class.
     */
    static async newMysqlSourceQueryActions(options) {
        return new Api(options);
    }

    /**
     * Creates a new instance of the Api class.
     * @param {Object} options - The configuration options for the API.
     * @param {Object} options.httpClientConfig - The configuration options for the HTTP data source.
     * @returns {Promise<Api>} - A Promise that resolves to a new instance of the Api class.
     */
    static async newHttpSourceQueryActions(options) {
        return new Api(options);
    }


    /**
     * Query the REST data source.
     * @param {Object} options - The configuration options for the query.
     * @param {Object} options.sortDefinition - The sort object for the query.
     * @returns {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async queryHttpDataSource(options) {
        const {filter, sortDefinition, responseTemplate} = options;
        const response = await FilterMiddleware.new(responseTemplate);
        const queryData = await this.#restClientConfig.query({sortDefinition});
        // Perform any additional data processing here
        return queryData;
    }

    /**
     * Query the MySQL data source.
     * @param {Object} options - The configuration options for the query.
     * @returns {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async queryMysqlDataSource(options) {
        const {sortDefinition} = options;
        const data = await this.#mysqlClientConfig.query({sortDefinition});
        // Perform any additional data processing here
        return data;
    }

    /**
     * Executes a list of middleware functions on an array of data.
     * @param {Array} data - The data to process.
     * @param {Function[]} middlewareFunctions - An array of middleware functions to execute.
     * @returns {Promise<Array>} - A Promise that resolves to the processed data.
     */
    async handleMiddlewares(data, middlewareFunctions) {
        let result = data;
        for (const middlewareFunction of middlewareFunctions) {
            const middleware = middlewareFunction();
            result = await middleware.process(result);
        }
        return result;
    }
}
