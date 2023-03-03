/**
 * Maps a set of result objects to the specified template structure.
 *
 * @param {Array} data - The result objects to map.
 * @param {Object} template - The response template object.
 * @param {Function} mapResultToTemplate - The mapping function to use for each individual result object.
 * @returns {Array} The mapped result objects.
 */
export const mapResultsToTemplate = function mapResultsToTemplate(data, template, mapResultToTemplate) {
    return data.map((result) => {
        const mappedResult = mapResultToTemplate(result, template, {});
        return Object.assign({}, template, mappedResult);
    });
};