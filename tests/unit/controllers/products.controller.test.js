const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { mockAllProducts, mockProductById, mockProductNotFound } = require('../../mocks');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

describe('Products Controller Layer', function () {
  afterEach(sinon.restore);

  it('should list all products', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(mockAllProducts);

    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(STATUS_OK);
    expect(res.json).to.have.been.calledWith(mockAllProducts);
  });

  it('should list a product searched by id', async function () {
    sinon.stub(productsService, 'getProductById').resolves([mockProductById]);

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_OK);
    expect(res.json).to.have.been.calledWith([mockProductById]);
  });

  it('should return a error message if no product is found', async function () {
    sinon.stub(productsService, 'getProductById').resolves([mockProductNotFound]);

    const res = {};
    const req = { params: { id: 100 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    // expect(res.status).to.have.been.calledWith(STATUS_NOT_FOUND);
    expect(res.json).to.have.been.calledWith([mockProductNotFound]);
  });
});