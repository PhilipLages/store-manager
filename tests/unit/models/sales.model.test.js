const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

const { saleTest } = require('../../mocks/sales.mocks');

describe('Sales Model Layer', function () {
  afterEach(sinon.restore);
  
  it('should create a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
    const result = await salesModel.createNewSale(saleTest);

    expect(result).to.be.equal(4);
  });
});