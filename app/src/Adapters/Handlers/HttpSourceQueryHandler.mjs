class HttpSourceQueryHandler {
    /**
     * {RestClientConfig}
     */
    #config;

    /**
     * @param {RestClientConfig} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Query the REST data source.
     * @return {Promise<Array>} - A Promise that resolves to an array of results.
     */
    async query({options}) {
        let resolve_promise, reject_promise;
        const promise = new Promise((resolve, reject) => {
            resolve_promise = resolve;
            reject_promise = reject;
        });

        const request = this.#config.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const [result] = JSON.parse(data);
                    resolve_promise(result);
                } catch (error) {
                    reject_promise(error);
                }
            });
        });
        request.on('error', (error) => {
            reject_promise(error);
        });
        request.end();

        return promise;
    }
}
