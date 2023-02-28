# flux-eco-query-actions

This is a class that allows you to query both MySQL and REST data sources. The class takes two configuration objects: *
*mysqlClientConfig** for configuring MySQL data source and **restClientConfig** for configuring REST data source. It
exposes two methods, **queryHttpDataSource** for querying the REST data source, and **queryMysqlDataSource** for
querying the MySQL data source.

## Methods

### new

This method creates a new instance of the API class.

    options - The configuration options for the API.
    options.mysqlClientConfig - The configuration options for the MySQL data source. || options.restClientConfig - The configuration options for the REST data source.

Returns a Promise that resolves to a new instance of the API class.

## queryHttpDataSource

This method queries the REST data source.

    options - The configuration options for the query.

Returns a Promise that resolves to an array of results.

## queryMysqlDataSource

This method queries the MySQL data source.

    options - The configuration options for the query.

Returns a Promise that resolves to an array of results.

## handleMiddlewares

This method executes a list of middleware functions on an array of data.

    data - The data to process.
    middlewareFunctions - An array of middleware functions to execute.
    - FilterMiddleware
    - MapToResponseTemplateMiddleware
    - SortMiddleware

Returns a Promise that resolves to the processed data.


```
import { Api } from './api.js';
import { MysqlClientConfig } from './mysql-client-config.js';
import { RestClientConfig } from './rest-client-config.js';

const mysqlConfig = new MysqlClientConfig({host: 'localhost', user: 'root', password: 'password', database: 'database_name'});

const api = await Api.new(mysqlConfig);

const options = {
    responseTemplate: [{field: 'name', alias: 'Name'}, {field: 'age', alias: 'Age'}]
};

const data = await api.queryHttpDataSource(options);

const processedData = await api.handleMiddlewares(data, []);

```
