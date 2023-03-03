/**
 * Sort middleware for sorting the query results.
 * @param {Object} sort - The sort object for the query. Consists of "field" and "order" properties.
 * @return {function} - The middleware function.
 */
export class SortResultsMiddleware {
    #sort = {
        field: 'id',
        direction: 'ASC'
    };
    #onFailure;
    #interruptProcessing;

    constructor(sortDefinition, onFailure, interruptProcessing) {
        if (sortDefinition) {
            this.#sort = sortDefinition;
        }
        this.#onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }

    /**
     * @param {QueryOptions} queryOptions
     */
    static new(queryOptions, onFailure, interruptProcessing) {
        return new SortResultsMiddleware(queryOptions.sortDefinition, onFailure, interruptProcessing)
    }

    /**
     * @param {ResponseStructure[]} data
     * @param {function(results:[])} next - The array of result objects to handle
     * @return {Promise<*>}
     */
    process(data, next) {

        try {
            if (!this.#sort) {
                return next(data);
            }

            const {field, direction} = this.#sort;
            const dirModifier = direction === "desc" ? -1 : 1;

            let sortedData = data;
            if (typeof data.sort === 'function') {
                sortedData = data.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return -1 * dirModifier;
                    } else if (a[field] > b[field]) {
                        return 1 * dirModifier;
                    } else {
                        return 0;
                    }
                });
            }
             return next(sortedData);
        } catch (error) {
            this.#onFailure(error)
        }
        return next(data);
    }
}