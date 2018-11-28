// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');// eslint-disable-line
const Table = require('../../..').Table;
const Utils = require('codemaster').utils;


const assert = chai.assert; //eslint-disable-line


// Our parent block
describe('TABLE GATEWAY: extractColumns', () => { // eslint-disable-line

  it('One element ',  (done) => { // eslint-disable-line
    const columns = 'price';
    const query = {};
    query.columns = columns;
    const extracted = Table.extractColumns(Utils.cloneJSON(query));
    assert.isArray(extracted);
    assert.equal(extracted.length, 1);
    assert.equal(columns, extracted[0]);
    done();
  });

  it('With array',  (done) => { // eslint-disable-line
    const columns = ['price', 'name'];
    const query = {};
    query.columns = columns;
    const extracted = Table.extractColumns(Utils.cloneJSON(query));
    assert.isArray(extracted);
    assert.deepEqual(extracted.length);
    done();
  });

  it('With an array within another array',  (done) => { // eslint-disable-line
    const query = {};
    const extracted = Table.extractColumns(Utils.cloneJSON(query));
    assert.equal(extracted, 'all');
    done();
  });
});
