const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const {
  saleTest,
  validSaleMock,
  invalidSaleTest,
  mockAllSales,
  mockSaleById,
  mockSaleNotFound,
  mockUpdatedSale,
  updateSaleTest,
} = require('../../mocks/sales.mocks');

const httpStatus = require('../../../src/utils/httpStatus');

describe('Sales Controller Layer', function () {
  afterEach(sinon.restore);

  it('should be able to create a new sale', async function () {
    sinon.stub(salesService, 'createNewSale').resolves(validSaleMock);

    const res = {};
    const req = { body: saleTest };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createNewSale(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(validSaleMock);
  });

  it('returns error if no product is found while creating a sale', async function () {
    sinon.stub(salesService, 'createNewSale').resolves(mockSaleNotFound);

    const res = {};
    const req = { body: invalidSaleTest };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createNewSale(req, res);

    // expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockSaleNotFound);
  });

  it('should list all sales', async function () {
    sinon.stub(salesService, 'getAllSales').resolves([mockAllSales]);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockAllSales);
  });

  it('should list a sale searched by id', async function () {
    sinon.stub(salesService, 'getSaleById').resolves([mockSaleById]);

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockSaleById);
  });

  it('returns an error message if no sale is found by id', async function () {
    sinon.stub(salesService, 'getSaleById').resolves([mockSaleNotFound]);

    const res = {};
    const req = { params: { id: 100 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockSaleNotFound);
  });

  it('deletes a sale searched by id', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ status: 204 });

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.DELETED);
  });

  it('returns an message if no sale if found while deleting', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(null);

    const res = {};
    const req = { params: { id: 100 } }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith(mockSaleNotFound);
  });

  it('updates a sale searched by id', async function () {
    sinon.stub(salesService, 'updateSale').resolves(mockUpdatedSale);

    const res = {};
    const req = {
      params: { id: 1 },
      body: updateSaleTest
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(mockUpdatedSale);
  });
});