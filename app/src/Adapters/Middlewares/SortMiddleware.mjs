/**
 * Sort middleware for sorting the query results.
 * @param {Object} sort - The sort object for the query. Consists of "field" and "order" properties.
 * @return {function} - The middleware function.
 */
class SortMiddleware {
    constructor(sortObj) {
        this.sortObj = sortObj;
    }

    /**
     *
     * @param  {field:string, direction:string} sortConfiguration - A field and the direction in which to sort the field (ASC or DESC).sortDefinition: A optional sortDefinition,sortObj
     * @return {Promise<MapToResponseTemplateMiddleware>}
     */
    static async new(sortConfiguration) {
        return new MapToResponseTemplateMiddleware(sortConfiguration)
    }

    /**
     * @param data
     * @return {Promise<*>}
     */
    async process(data) {
        if (!this.sortObj) {
            return data;
        }

        const { sortBy, sortOrder } = this.sortObj;
        if (!sortBy || !sortOrder) {
            return data;
        }

        data.sort((a, b) => {
            const sortValA = a[sortBy];
            const sortValB = b[sortBy];

            if (sortOrder.toLowerCase() === 'asc') {
                if (sortValA < sortValB) return -1;
                if (sortValA > sortValB) return 1;
                return 0;
            } else if (sortOrder.toLowerCase() === 'desc') {
                if (sortValA > sortValB) return -1;
                if (sortValA < sortValB) return 1;
                return 0;
            }
        });

        return data;
    }
}