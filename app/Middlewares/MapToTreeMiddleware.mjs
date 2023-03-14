export class MapToTreeMiddleware {
    /**
     * @type {MapToTreeSettings}
     */
    #mapToTreeSettings;

    /** @var {function(message:string)} */
    #onFailure;

    /** @var {function(results:[])}  */
    #interruptProcessing;

    /**
     * @param {MapToTreeSettings} mapToTreeSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    constructor(mapToTreeSettings, onFailure, interruptProcessing) {
        this.#mapToTreeSettings = mapToTreeSettings;
        this.#onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }


    /**
     * @param {MapToTreeSettings} mapToTreeSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    static new(mapToTreeSettings, onFailure, interruptProcessing) {
        return new MapToTreeMiddleware(mapToTreeSettings, onFailure, interruptProcessing)
    }

    /**
     * @param {[]} results - The array of result objects to map.
     * @param {function(results:[])} next - The array of (processed) objects to handle
     * @return {Promise<void>}E
     */
    process(results, next) {
        let mappedNodes = {};
        results.forEach((node) => {
            let mappedNode = {
                id: node[this.#mapToTreeSettings.fieldNameNodeId],
                parentId: node[this.#mapToTreeSettings.fieldNameParentId],
                status: {
                    expanded: node[this.#mapToTreeSettings.expandedPerDefault],
                },
                data: {
                    label: node[this.#mapToTreeSettings.mapDataSettings.fieldNameLabel],
                },
                position: node[this.#mapToTreeSettings.fieldNamePosition],
                children: {},
                type: node[this.#mapToTreeSettings.fieldNameType],
            };
            mappedNodes[node[this.#mapToTreeSettings.fieldNameNodeId]] = mappedNode;
            if (mappedNodes.hasOwnProperty(mappedNode.parentId)) {
                mappedNodes[mappedNode.parentId].children[this.#mapToTreeSettings.fieldNameNodeId] = mappedNode;
            }
        })

        next(mappedNodes)
    }
}