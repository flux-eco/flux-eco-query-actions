import '../../../types/flux-eco-query-actions-types.mjs';
import {mapResponseTemplateFunctions} from "../Handlers/mapResponseTemplateFunctions.mjs";

/**
 * MapToResponseTemplateMiddleware query results to a template object.
 * @param {Array} results - The results of a database query.
 * @param {ResponseTemplate} responseTemplate
 * @returns {Array} - An array of objects with properties mapped from the template object.
 */
export class MapResultsToResponseTemplateMiddleware {
    /**
     * @var {ResponseTemplate}
     */
    #template;
    #structure;
    /**
     * @var {function}
     */
    #onFailure;

    /**
     * @var {function}
     */
    #interruptProcessing;

    /**
     * @param {ResponseTemplate} template
     */
    constructor(template, queryOptions, onFailure, interruptProcessing) {
        this.queryOptions = queryOptions;
        this.#template = template;
        this.#structure = {
            parent: null,
            id: null,
            data: {}
        };
        this.#onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }


    /**
     * @param {QueryOptions} queryOptions
     * @return {MapResultsToResponseTemplateMiddleware}
     */
    static new(queryOptions, onFailure, interruptProcessing) {

        const mapResponseTemplateFunctions = function (template) {
            const dataKeys = Object.keys(template.data);
            const data = dataKeys.reduce((acc, key) => {
                if (typeof template.data[key] === "function") {
                    acc[key] = (result) => template.data[key](result);
                } else {
                    acc[key] = template.data[key];
                }
                return acc;
            }, {});

            return {
                parent: () => template.parent,
                id: () => template.id,
                data
            };
        };

        //const template = mapResponseTemplateFunctions(queryOptions.responseTemplate)

        return new MapResultsToResponseTemplateMiddleware(queryOptions.responseTemplate,queryOptions,onFailure, interruptProcessing)
    }


    /**
     * Map a result object to a template object.
     *
     * @param {T[]} results - The array of result objects to map.
     * @param {function(results:[])} next - The array of result objects to handle
     * @return {Promise<void>}
     */
    process(results, next) {

        const mapResultsToTemplate = function mapResultsToTemplate(data, template, mapResultToTemplate) {
            return data.map((result) => {
                const resObj = JSON.parse(JSON.stringify(result))
                const mappedResult = mapResultToTemplate(resObj, template, {});
                return Object.assign({}, template, mappedResult);
            });
        }

        const mapResultToTemplate = function mapResultToTemplate(result, template, mapped) {
            const keys = Object.keys(template);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = template[key];
                if (key === "parent") {
                    const parent = result[value];
                    mapped[key] = parent ? { label: parent } : null;
                } else if (key === "id") {
                    mapped[key] = result[value];
                } else if (key === "data") {
                    mapped[key] = {};
                    const dataKeys = Object.keys(value);
                    for (let j = 0; j < dataKeys.length; j++) {
                        const dataKey = dataKeys[j];
                        const dataValue = value[dataKey];
                        mapped[key][dataKey] =  result[dataValue];
                    }
                }
            }
            return mapped;
        };

        const mappedData = mapResultsToTemplate(results, this.queryOptions.responseTemplate, mapResultToTemplate);
console.log(JSON.stringify(mappedData));


        try {
            const mappedResults = mapResultsToTemplate(
                results,
                this.#template,
                mapResultToTemplate
            );
            return next(mappedResults);
        } catch (error) {
            console.error(error);
            // or call onFailure function
            // this.#onFailure(error);
        }
    }
}