export class CreateRootNodeFromMappedNodesMiddleware {
    /**
     * @type {CreateRootNodeFromMappedNodesSettings}
     */
    #createRootNodeFromMappedNodesSettings;

    /** @var {function(message:string)} */
    #onFailure;

    /** @var {function(results:[])}  */
    #interruptProcessing;

    /**
     * @param {CreateRootNodeFromMappedNodesSettings} createRootNodeFromMappedNodesSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    constructor(createRootNodeFromMappedNodesSettings, onFailure, interruptProcessing) {
        this.#createRootNodeFromMappedNodesSettings = createRootNodeFromMappedNodesSettings;
        this.#onFailure = onFailure;
        this.#interruptProcessing = interruptProcessing;
    }


    /**
     * @param {CreateRootNodeFromMappedNodesSettings} createRootNodeFromMappedNodesSettings
     * @param {function} onFailure
     * @param {function} interruptProcessing
     */
    static new(createRootNodeFromMappedNodesSettings, onFailure, interruptProcessing) {
        return new CreateRootNodeFromMappedNodesMiddleware(createRootNodeFromMappedNodesSettings, onFailure, interruptProcessing)
    }

    /**
     * @param {[]} results - The array of result objects to map.
     * @param {function(results:[])} next - The array of (processed) objects to handle
     * @return {Promise<void>}E
     */
    process(results, next) {

        let rootNode = {
            id: 0,
            parentId: null,
            status: {
                expanded: false
            },
            data: {
                label: "rootNode"
            },
            children: {}
        };

        const addToRootNodeTree = function (clonedParent, clonedNode) {
            clonedParent.children[clonedNode.position] = clonedNode
            if (Object.keys(clonedNode.children).length > 0) {
                Object.entries(clonedNode.children).forEach(([key, childNode]) => {
                    const clonedChild = Object.assign({}, childNode);
                    addToRootNodeTree(clonedParent, clonedChild);
                });
            }
        }

        Object.entries(results).forEach(([key, result]) => {
            if (result.parentId === 1) {
                const clonedNode = Object.assign({}, result);
                addToRootNodeTree(rootNode, clonedNode)
            }
        });

        next({rootNode: rootNode, nodes: results})
    }
}