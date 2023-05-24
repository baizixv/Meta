'use strict';

const bookAlgorithm = require('..');
const assert = require('assert').strict;

assert.strictEqual(bookAlgorithm(), 'Hello from bookAlgorithm');
console.info('bookAlgorithm tests passed');
