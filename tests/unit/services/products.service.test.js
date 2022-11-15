const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const {
  mockAllProducts,
  mockProductById,
  mockNewProduct,
  mockUpdatedProduct,
} = require('../../mocks/products.mocks');

const ID_OK = 1;
const NOT_FOUND_ID = 100;

describe('Products Service Layer', function () {
  afterEach(sinon.restore);

  it('should list all products', async function () {
    // sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

    const result = await productsService.getAllProducts();

    expect(result).to.be.deep.equal(mockAllProducts);
  });

  it('should list a product searched by id', async function () {
    // sinon.stub(productsModel, 'getProductById').resolves(mockProductById);

    const [result] = await productsService.getProductById(ID_OK);

    expect(result).to.be.deep.equal(mockProductById);
  });

  it('should return null if no product is found', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(null);

    const result = await productsService.getProductById(NOT_FOUND_ID);

    expect(result).to.be.deep.equal(null);
  });

  it('should create a new product', async function () {
    sinon.stub(productsModel, 'createNewProduct').resolves(mockNewProduct);

    const NEW_PRODUCT = { name: 'ProductX' };
    
    const result = await productsService.createNewProduct(NEW_PRODUCT);

    expect(result.id).to.be.deep.equal(mockNewProduct);
  });

  it('updates a product name searched by id', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(mockUpdatedProduct);

    const UPDATED_NAME = 'Martelo do Batman';

    const result = await productsService.updateProduct(ID_OK, UPDATED_NAME);

    expect(result).to.be.deep.equal(mockUpdatedProduct);
  });

  it('deletes a product searched by id', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(1);

    const result = await productsService.deleteProduct(ID_OK);

    expect(result).to.be.deep.equal({ status: 204 });
  });
});