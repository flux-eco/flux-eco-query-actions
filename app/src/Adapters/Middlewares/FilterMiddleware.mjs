/**
 * FilterMiddleware
 *
 * Middleware that filters the database query results based on the given filter object.
 * @param {Object} filterSchema - The filter schema object to apply to the query results.
 * @return {function} - Express middleware function.
 */
class FilterMiddleware {
    constructor(filterSchema) {
        this.filterSchema = filterSchema;
    }

    async execute(data) {
        const filteredData = data.filter(item => {
            for (let key in this.filterSchema) {
                const filterValue = this.filterSchema[key];
                if (item[key] !== filterValue) {
                    return false;
                }
            }
            return true;
        });
        return filteredData;
    }

}