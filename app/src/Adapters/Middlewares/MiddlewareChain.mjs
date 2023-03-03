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
    process(data) {

        let currentHandlerIndex = -1;
        const next = (mappedData) => {
            currentHandlerIndex++;
            if (currentHandlerIndex >= this.#middlewares.length) {
                return Promise.resolve(mappedData)
            }
            return this.#middlewares[currentHandlerIndex].process(mappedData, next.bind(this));
        };
        return next(data);
    }
}