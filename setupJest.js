const fetchMock = require('fetch-mock').sandbox();
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock;