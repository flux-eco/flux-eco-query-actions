import http from 'http';
import https from 'https';

class HttpClientConfig {
    /**
     * @var {ServerConfig}
     */
    #serverConfig;
    /**
     * @var {string}
     */
    #protocol;

    constructor(serverConfigs, protocol) {
        this.#serverConfig = serverConfigs;
        this.#protocol = protocol;
    }


    /**
     * @return {http|https}
     */
    get requestCallable() {
        const requestCallables = {
            'http': http.request,
            'https': https.request
        };
        return requestCallables[this.#protocol];
    }

    /**
     * @var {ServerConfig}
     */
    get serverConfig() {
        return this.#serverConfig
    }


    static async new(serverConfigs, protocol) {
        return new HttpClientConfig(serverConfigs, protocol);
    }
}