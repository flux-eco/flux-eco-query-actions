/**
 * MapToResponseTemplateMiddleware query results to a template object.
 * @param {Array} results - The results of a database query.
 * @param {Object} responseTemplate - The template object to map the query results to.
 * @returns {Array} - An array of objects with properties mapped from the template object.
 */
class MapToResponseTemplateMiddleware {
    #responseTemplate;

    constructor(responseTemplate) {
        this.#responseTemplate = responseTemplate;
    }

    static async new(responseTemplate) {
        return new MapToResponseTemplateMiddleware(responseTemplate)
    }


    /**
     * @param {array} results
     * @param {object }template
     * @return {Promise{*}}
     */
    async mapToResponseTemplate(results, template) {
        const mappedData = results.map((item) => {
            const mappedItem = {};
            for (const [key, value] of Object.entries(template)) {
                mappedItem[key] = item[value];
            }
            return mappedItem;
        });

        return mappedData;
    }
}