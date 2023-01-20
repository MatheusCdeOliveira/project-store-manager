 const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleMock, saleMockById } = require('./mocks/sales.model.mock');
const { salesModel } = require('../../../src/models')

describe('Testes de unidade da camada model de vendas', function () {
  it('Recuperando a lista de todos as vendas', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves(saleMock);
    // act
    const result = await salesModel.getAll();
    // assert
    expect(result).to.be.deep.equal(saleMock);
  });

  it('Recuperando apenas um único produto a partir de seu id', async function () {
    sinon.stub(connection, 'execute').resolves([saleMockById]);

    const result = await salesModel.findById(1);

    expect(result).to.be.deep.equal(saleMockById);
  });

   it('Inserindo o id de uma venda e recuperando seu insertId', async function () {
     sinon.stub(connection, 'execute').resolves([{ insertId: 3}])

     const result = await salesModel.insertSale();

     expect(result).to.be.deep.equal(3);
  });
   it('Inserindo uma nova venda', async function () {
     sinon.stub(connection, 'execute').resolves([{ productId: 1, quantity: 2 }])

     const result = await salesModel.insertSaleProduct(1, 2, 3);

     expect(result).to.be.deep.equal({ productId: 1, quantity: 2 });
  });


  afterEach(function () {
    sinon.restore();
  });
});