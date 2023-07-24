'use strict';

const configRollup = require('..');
const assert = require('assert').strict;

assert.strictEqual(configRollup(), 'Hello from configRollup');
console.info('configRollup tests passed');
