import {createPool} from 'mysql2/promise';

/**
 * A Mysql Query Handler
 */
class MysqlSourceQueryHandler {

    #config

    /**
     * Creates an instance of the MySQL query handler.
     * @param {MysqlClientConfig} config
     */
    constructor(config) {
        this.#config = config;
        this.pool = createPool(config);
    }

    /**
     * Adds a join to the query.
     *
     * @param {object} queryConfig
     * @property {string} options.tableName - The name of the table to join.
     * @property {{tableName:string, type: string, condition}[]} options.joins - The name of the table to join. |  The type of the join (e.g. 'LEFT JOIN').  The join condition, including the fields to join on and the comparison operator.
     * @return {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async handle({tableName, joins}) {
        let resolve_promise, reject_promise;
        const promise = new Promise((resolve, reject) => {
            resolve_promise = resolve;
            reject_promise = reject;
        });

        this.#assertQueringTableAllowed(tableName, reject_promise);

        joins.forEach(join, {
            // Get all fields in the join condition
            const fields = join.Condition.match(/(?<=\.)\w+/g);
            // Check that all fields are allowed
            fields.forEach((field) => {
                this.#assertQueringTableAllowed(join.type, reject_promise);
                this.#assertQueringFieldAllowed(join.condition.table, field, reject_promise);
            })
        });


        const [rows] = await this.pool.query(`SELECT * FROM ${tableName} WHERE ${joins}`);
        resolve_promise(rows);
        return promise;
    }

    #assertQueringTableAllowed(tableName, reject_promise) {
        if (!this.#config.allowedSourceData.prototype.hasOwnProperty(tableName)) {
            reject_promise(`Table name "${tableName}" not allowed.`);
        }
        return true;
    }

    #assertQueringFieldAllowed(tableName, fieldName, reject_promise) {
        if (!this.#config.allowedSourceData[tableName].includes(fieldName)) {
            reject_promise(`Field "${fieldName}" not allowed.`);
        }
        return true;
    }
}