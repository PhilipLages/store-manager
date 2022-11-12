const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');
const { mockAllProducts, mockProductById } = require('../../mocks');

const OK_ID = 1;
// const ID_NOT_FOUND = 100;

describe('Products models layer', function () {
  describe('Listing all products', function () {
    beforeEach(async function () {
      sinon.stub(connection, 'execute').resolves(mockAllProducts);
    });

    afterEach(async function () {
      connection.execute.restore();
    });

    it('The query must list all products', async function () {
      const products = await productsModel.getAllProducts();

      expect(products).to.be.deep.equal(mockAllProducts);
    });
  });

  describe('Listing a product by its ID', function () {    
    beforeEach(async function () {
      sinon.stub(connection, 'execute').resolves(mockProductById);
    });

    afterEach(async function () {
      connection.execute.restore();
    });

    it('The query must get the product correctly, based on its id', async function () {    
      const productById = await productsModel.getProductById(OK_ID);
  
      expect(productById).to.be.deep.equal(mockProductById);    
    });
  });
});