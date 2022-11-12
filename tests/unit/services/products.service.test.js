const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const { mockAllProducts, mockProductById } = require('../../mocks');
const { afterEach } = require('mocha');

const ID_OK = 1;
const NOT_FOUND_ID = 100;

describe('Products Service Layer', function () {
  afterEach(sinon.restore);

  it('should list all products', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

    const result = await productsService.getAllProducts();

    expect(result).to.be.deep.equal(mockAllProducts);
  });

  it('should list a product searched by id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([mockProductById]);

    const result = await productsService.getProductById(ID_OK);

    expect(result).to.be.deep.equal(mockProductById);
  });

  it('should return null if no product is found', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([null]);

    const result = await productsService.getProductById(NOT_FOUND_ID);

    expect(result).to.be.deep.equal(null);
  });
});