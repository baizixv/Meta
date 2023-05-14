'use strict';

const polyfillsNode = require('..');
const assert = require('assert').strict;

assert.strictEqual(polyfillsNode(), 'Hello from polyfillsNode');
console.info('polyfillsNode tests passed');
