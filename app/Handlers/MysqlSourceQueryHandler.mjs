import {createPool} from 'mysql2/promise';

/**
 * A Mysql Query Handler
 */
export class MysqlSourceQueryHandler {

    #settings
    #queryDefinition

    /**
     * Creates an instance of the MySQL query handler.
     * @param {MysqlClientConfig} config
     */
    constructor(settings, queryDefinition) {
        this.#settings = settings;
        this.#queryDefinition = queryDefinition;
        this.pool = createPool(settings.server);
    }

    /**
     * @param settings, queryDefinition
     * @returns {MysqlSourceQueryHandler}
     */
    static new(settings, queryDefinition) {
        return new MysqlSourceQueryHandler(settings, queryDefinition)
    }

    /**
     * Adds a join to the query.
     * @return {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async handle() {
        const {tableName, joins, where, orderBy} = this.#queryDefinition

        let query = `SELECT * FROM ${tableName}`;
        if (joins && joins.length > 0) {
            joins.forEach((join) => {
                query += ` ${join.type} ${join.tableName} ON ${join.condition.leftTableField} ${join.condition.operator} ${join.condition.rightTableField}`;
            });
        }
        if (where) {
            let whereConditions = [];
            where.conditions.forEach((condition) => {
                whereConditions.push(`${condition.column} ${condition.operator} ${condition.value}`);
            });
            query += ` where `;
            query += whereConditions.join(` ${where.operator} `);
        }
        if (orderBy) {
            query += ` ${orderBy.column} `;
        }
        const [rows] = await this.pool.query(query);
        return rows;
    }

}