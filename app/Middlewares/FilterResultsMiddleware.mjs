/**
 * FilterMiddleware
 *
 * Middleware that filters the database query results based on the given filter object.
 * @param {Object} filterSchema - The filter schema object to apply to the query results.
 * @return {function} - Express middleware function.
 */
class FilterResultsMiddleware {
    #filterSchema
    onFailure;
    #interruptProcessing;

    constructor(filterScheman, onFailure, interruptProcessing) {
        this.#filterSchema = filterSchema;
        this.onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }


    process(results, next) {
        const filteredResults = filteredResults.filter(item => {
            for (let key in this.#filterSchema) {
                const filterValue = this.#filterSchema[key];
                if (item[key] !== filterValue) {
                    return false;
                }
            }
            next(filteredResults, next)
        });
        next(filteredResults, next)
    }

}