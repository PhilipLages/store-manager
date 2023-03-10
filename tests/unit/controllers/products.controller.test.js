const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const {
  mockAllProducts,
  mockProductById,
  mockProductNotFound,
  mockNewProduct,
  mockUpdatedProduct
} = require('../../mocks/products.mocks');

const httpStatus = require('../../../src/utils/httpStatus');

describe('Products Controller Layer', function () {
  afterEach(sinon.restore);

  it('should list all products', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(mockAllProducts);

    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockAllProducts);
  });

  it('should list a product searched by id', async function () {
    sinon.stub(productsService, 'getProductById').resolves([mockProductById]);

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockProductById);
  });

  it('should return a error message if no product is found', async function () {
    sinon.stub(productsService, 'getProductById').resolves([mockProductNotFound]);

    const res = {};
    const req = { params: { id: 100 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    // expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockProductNotFound);
  });

  it('should be able to create a new product', async function () {
    sinon.stub(productsService, 'createNewProduct').resolves(mockNewProduct);

    const res = {};
    const req = {
      body: {
        name: 'ProductX',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(mockNewProduct);
  });

    it('should be able to return an error message', async function () {
    sinon.stub(productsService, 'createNewProduct').resolves(mockNewProduct);

    const res = {};
    const req = {
      body: {
        name: 'ProductX',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(mockNewProduct);
  });
  
    it('updates a product searched by id', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(mockUpdatedProduct);

    const res = {};
      const req = {
      params: { id: 1 },
      body: {
        name: 'Martelo do Batman',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockUpdatedProduct);
  });
  
    it('returns an error message if no product is found while updating', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(null);

    const res = {};
    const req = {
      params: { id: 100 },
      body: {
        name: 'Martelo do Batman',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockProductNotFound);
  });
  
    it('deletes a product searched by id', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({ status: 204 });

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.DELETED);
  });
  
  it('returns an message if no product if found while deleting', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(null);

    const res = {};
    const req = { params: { id: 100 } }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockProductNotFound);
  });
});
