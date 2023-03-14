import {MiddlewareChain} from "./Middlewares/MiddlewareChain.mjs";
import {CreateRootNodeFromMappedNodesMiddleware} from "./Middlewares/CreateRootNodeFromMappedNodesMiddleware.mjs";
import {FilterTreeForASpecificLeafMiddleware} from "./Middlewares/FilterTreeForASpecificLeafMiddleware.mjs";
import {MapToTreeMiddleware} from "./Middlewares/MapToTreeMiddleware.mjs";
import {MysqlSourceQueryHandler} from "./Handlers/MysqlSourceQueryHandler.mjs";

export default class FluxEcoQueryProcess {
    /**
     * @type FluxEcoQueryProcessSettings
     */
    #settings;
    /**
     * @type {string<FluxEcoQueryProcessState>}
     */
    #state;

    constructor(settings, state) {
        this.#settings = settings;
        this.#state = state;
    }

    /**
     * @param {FluxEcoQueryProcessConfig} config
     * @returns {FluxEcoQueryProcess}
     */

    static new(config) {
        return new FluxEcoQueryProcess(config.settings, config.state);
    }


    /**
     * @returns {void}
     */
    async process() {
        const results = await MysqlSourceQueryHandler.new(this.#settings, this.#state.readMainNavigationQueryProcessState.queryDefinition).handle();
        this.#handleTransformations(results);
    }

    /**
     * @param results
     * @returns {Object[]}
     */
    async #handleTransformations(results) {
        const transformationDefintions = this.#state.readMainNavigationQueryProcessState.transformationDefintions;
        const handleFailure = (error) => {
            Error(error);
        }
        const onInterrupt = (data) => {
            console.log(data)
            return data
        }

        console.log("before middlewares");

        const middlewares = [];
        if (transformationDefintions.mapToTreeSettings) {
            middlewares.push(MapToTreeMiddleware.new(transformationDefintions.mapToTreeSettings, handleFailure, onInterrupt));
        }
        if (transformationDefintions.createRootNodeFromMappedNodesSettings) {
            middlewares.push(CreateRootNodeFromMappedNodesMiddleware.new(transformationDefintions.createRootNodeFromMappedNodesSettings, handleFailure, onInterrupt));
        }
        if (transformationDefintions.filterTreeForASpecificLeafSettings) {
            middlewares.push(FilterTreeForASpecificLeafMiddleware.new(transformationDefintions.filterTreeForASpecificLeafSettings, handleFailure, onInterrupt));
        }

        const middlewareChain = MiddlewareChain.new(middlewares, handleFailure, onInterrupt);
        return middlewareChain.process(results);
    }
}
