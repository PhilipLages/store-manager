const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');

const {
  mockAllProducts,
  mockProductById,
} = require('../../mocks/products.mocks');

const ID_OK = 1;
const PRODUCT_NAME = 'ProductX';

describe('Products Model Layer', function () {
  afterEach(sinon.restore);

  it('should list all products', async function () {
    // sinon.stub(connection, 'execute').resolves(mockAllProducts);

    const result = await productsModel.getAllProducts();

    expect(result).to.be.deep.equal(mockAllProducts);
  });

  it('should list a product searched by id', async function () {
    sinon.stub(connection, 'execute').resolves([mockProductById]);

    const result = await productsModel.getProductById(ID_OK);

    expect(result).to.be.deep.equal(mockProductById);
  });
  
  it('should create a new product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
    const result = await productsModel.createNewProduct({ PRODUCT_NAME });

    expect(result).to.be.equal(4);
  });
});