// inject mocha globally to allow custom interface refer without direct import - bypass bundle issue
global._ = require('lodash');
global.mocha = require('mocha');
global.chai = require('chai');
global.sinon = require('sinon');
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
global.chai.use(require('sinon-chai'));

// Override ts-node compiler options
process.env.TS_NODE_PROJECT = 'tsconfig.test.json'
