class MysqlClientConfig {
    /**
     * Create a new database connection.
     * @typedef {Object} DatabaseConfig
     * @param {Object} - The configuration object for the database connection.
     * @property {string} host - The hostname of the database server.
     * @property {number} port - The port number of the database server.
     * @property {string} database - The name of the database to connect to.
     * @property {string} user - The username to authenticate with.
     * @property {string} password - The password to authenticate with.
     */
    #serverConfig;
    /**
     * @typedef {Object} MysqlDataSourceDefinition
     * @param serverConfigs
     * @param allowedSourceData
     */
    #mysqlDataSourceDefinition;

    /**
     * @var {Object[]} #allowedSourceData
     * @typedef {Object} AllowedSourceData
     * @property {Array} allowedTableNames - An array of allowed table names.
     * @property {Array} allowedFields - An array of allowed field names.
     */
    #allowedSourceData;


    constructor(serverConfigs, mysqlDataSourceDefinition, allowedSourceData) {
        this.serverConfig = serverConfigs;
        this.#mysqlDataSourceDefinition = mysqlDataSourceDefinition;
        this.#allowedSourceData = allowedSourceData;
    }

    static async new(serverConfigs, mysqlDataSourceDefinition, allowedSourceData) {
        return new MysqlClientConfig(serverConfigs, mysqlDataSourceDefinition, allowedSourceData);
    }

    /**
     * @return {DatabaseConfig}
     */
    get serverConfig() {
        return this.#serverConfig
    }

    /**
     * @return {AllowedSourceData[]}
     */
    get allowedSourceData() {
        return this.#allowedSourceData;
    }

}