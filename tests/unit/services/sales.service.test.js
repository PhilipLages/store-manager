const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');

const {
  saleTest,
  invalidSaleTest,
  validSaleMock,
  mockSaleById,
  mockAllSales,
} = require('../../mocks/sales.mocks');

const ID_OK = 1;

describe('Sales Service Layer', function () {
  afterEach(sinon.restore);

  it('should create a new sale', async function () {
    sinon.stub(salesModel, 'createNewSale').resolves(validSaleMock);
    
    const result = await salesService.createNewSale(saleTest);

    expect(result.id).to.be.deep.equal(validSaleMock);
  });

  it('should return null if no product is found', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([null]);

    const result = await salesService.createNewSale(invalidSaleTest);

    expect(result).to.be.deep.equal(null);
  });

  it('should list all sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);

    const result = await salesService.getAllSales();

    expect(result).to.be.deep.equal(mockAllSales);
  });

  it('should list a sale searched by id', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);

    const result = await salesService.getSaleById(ID_OK);

    expect(result).to.be.deep.equal(mockSaleById);
  });

  it('deletes a sale searched by id', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(1);

    const result = await salesService.deleteSale(ID_OK);

    expect(result).to.be.deep.equal({ status: 204 });
  });
});