const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

const { saleTest, mockAllSales, mockSaleById } = require('../../mocks/sales.mocks');

const ID_OK = 1;

describe('Sales Model Layer', function () {
  afterEach(sinon.restore);
  
  it('should create a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
    const result = await salesModel.createNewSale(saleTest);

    expect(result).to.be.equal(4);
  });

  it('should list all sales', async function () {
    sinon.stub(connection, 'execute').resolves(mockAllSales);
    
    const result = await salesModel.getAllSales();

    expect(result).to.be.equal(mockAllSales);
  });

  it('should list a sale by its id', async function () {
    sinon.stub(connection, 'execute').resolves(mockSaleById);
    
    const result = await salesModel.getSaleById(ID_OK);

    expect(result).to.be.equal(mockSaleById);
  });
});