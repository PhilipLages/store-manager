const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');

const {
  saleTest,
  invalidSaleTest,
  validSaleMock,
} = require('../../mocks/sales.mocks');

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

  // it('should list all sales', async function () {
  //   sinon.stub(salesModel, 'getAllsales').resolves(mockAllsales);

  //   const result = await salesService.getAllsales();

  //   expect(result).to.be.deep.equal(mockAllsales);
  // });

  // it('should list a product searched by id', async function () {
  //   sinon.stub(salesModel, 'getProductById').resolves([mockProductById]);

  //   const result = await salesService.getProductById(ID_OK);

  //   expect(result).to.be.deep.equal(mockProductById);
  // });
});