const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require("../../../src/services");

const {
  getAllSales,
  saleFindById,
} = require("../models/mocks/sales.model.mock");

const { salesController } = require("../../../src/controllers");

describe("Testes de unidade da camada controller de sales", function () {
  it("listagem de todos as vendas", async function () {
    //arrange
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, "getAll").resolves([getAllSales]);
    //act
    await salesController.getAll(req, res);
    //assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([getAllSales]);
  });

  it("listagem de uma venda a partir de um id existente", async function () {
    //arrange
    const req = {
      params: { id: 1 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, "findById").resolves(saleFindById);
    //act
    await salesController.findById(req, res);
    //assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFindById);
  });

  it("listagem de uma venda a partir de um id inexistente", async function () {
    //arrange
    const req = {
      params: { id: 999 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "findById")
      .resolves({ type: 'SALE_NOT_FOUND' });
    //act
    await salesController.findById(req, res);
    //assert
    expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    expect(res.status).to.have.been.calledWith(404);
  });

  it("Inserindo uma nome venda válida", async function () {
    const resultReturned = {
      id: 7,
      itemsSold: [
        [
          {
            productId: 1,
            quantity: 2,
          },
        ],
      ],
    };

    const req = {
      body: { productId: 1, quantity: 2 },
    };
    const res = {}; 

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "insert").resolves(resultReturned);

    await salesController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(resultReturned);
  });

  it("Inserindo uma nova venda inválida", async function () {
    const req = {
      body: { productId: 999, quantity: 2 },
    };
    const res = {}; 

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "insert").resolves({ type: 'PRODUCT_NOT_FOUND' });

    await salesController.insert(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
