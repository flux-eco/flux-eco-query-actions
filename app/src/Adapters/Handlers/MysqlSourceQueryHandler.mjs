import {createPool} from 'mysql2/promise';

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
 * A Mysql Query Handler
 */
export class MysqlSourceQueryHandler {

    #config

    /**
     * Creates an instance of the MySQL query handler.
     * @param {MysqlClientConfig} config
     */
    constructor(config) {
        this.#config = config;
        this.pool = createPool(config);
    }

    static async new(config) {
        return new MysqlSourceQueryHandler(config)
    }

    /**
     * Adds a join to the query.
     *
     * @param {string} tableName - The name of the table to join.
     * @param {null|Join[]} joins - The name of the table to join. |  The type of the join (e.g. 'LEFT JOIN').  The join condition, including the fields to join on and the comparison operator.
     * @return {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async handle(tableName, joins) {
        /* let resolve_promise, reject_promise;
         const promise = new Promise((resolve, reject) => {
             resolve_promise = resolve;
             reject_promise = reject;
         });


         const [rows] = await this.pool.query(query);
         resolve_promise(rows);
         return promise;*/

        let query = `SELECT * FROM ${tableName}`;
        if (joins && joins.length > 0) {
            joins.forEach((join) => {
                query += ` ${join.type} ${join.tableName} ON ${join.condition.leftTableField} ${join.condition.operator} ${join.condition.rightTableField}`;
            });
        }

        query += " where (type = 'crs' or type = 'cat') and deleted is null";

        const [rows] = await this.pool.query(query);
        return rows;

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