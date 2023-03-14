export class FilterTreeForASpecificLeafMiddleware {
    /**
     * @type {FilterTreeForASpecificLeafSettings}
     */
    #filterTreeForASpecificLeafSettings;

    /** @var {function(message:string)} */
    #onFailure;

    /** @var {function(results:[])}  */
    #interruptProcessing;

    /**
     * @param {FilterTreeForASpecificLeafSettings} filterTreeForASpecificLeafSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    constructor(filterTreeForASpecificLeafSettings, onFailure, interruptProcessing) {
        this.#filterTreeForASpecificLeafSettings = filterTreeForASpecificLeafSettings;
        this.#onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }


    /**
     * @param {FilterTreeForASpecificLeafSettings} filterTreeForASpecificLeafSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    static new(filterTreeForASpecificLeafSettings, onFailure, interruptProcessing) {
        return new FilterTreeForASpecificLeafMiddleware(filterTreeForASpecificLeafSettings, onFailure, interruptProcessing)
    }

    /**
     * @param {[]} results - The array of result objects to map.
     * @param {function(results:[])} next - The array of (processed) objects to handle
     * @return {Promise<void>}E
     */
    process(results, next) {

        const removeNodesFromTree = function (results, nodeToRemove) {
            if (nodeToRemove) {
                if (nodeToRemove.parentId) {
                    const parentToRemove = nodeToRemove[nodeToRemove.parentId];
                    delete results[nodeToRemove.parentId];
                    removeNodesFromTree(results, parentToRemove)
                }
            }
        }

        Object.entries(results).forEach(([key, node]) => {
            const children = node.children;
            if(children) {
                if (Object.entries(children).length === 0) {
                    if (node.type !== this.#filterTreeForASpecificLeafSettings.type) {
                        removeNodesFromTree(results, node)
                    }
                }
            }

        });

        next(results)
    }
}