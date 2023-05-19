'use strict';

const utilsCrypto = require('..');
const assert = require('assert').strict;

assert.strictEqual(utilsCrypto(), 'Hello from utilsCrypto');
console.info('utilsCrypto tests passed');
