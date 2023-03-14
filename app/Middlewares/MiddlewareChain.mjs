import {sendError} from "../../../flux-eco-node-http-server/app/handlers/sendError.mjs";

export class MiddlewareChain {
    #middlewares;
    #interruptProcessing;
    #onFailure;

    /**
     * @private
     * @param middlewares
     */
    constructor(middlewares = [], onFailure, interruptProcessing) {
        this.#middlewares = middlewares;
        this.#interruptProcessing = interruptProcessing;
        this.#onFailure = onFailure;
    }

    static new(middlewares = [], onFailure, interruptProcessing) {
        return new MiddlewareChain(middlewares, onFailure, interruptProcessing);
    }

    /**
     * @param {object[]} data
     * @return {Object[]}
     */
    async process(data) {
        let currentHandlerIndex = -1;


        const next = () => {
            currentHandlerIndex++;
            if (currentHandlerIndex >= this.#middlewares.length) {
                this.#interruptProcessing(data)
                return;
            }
            console.log(currentHandlerIndex);
            this.#middlewares[currentHandlerIndex].process(data, next.bind(this));
        };
        return next();
    }
}