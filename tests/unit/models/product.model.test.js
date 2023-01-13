const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { allProducts, oneProduct } = require('./mocks/product.model.mock');
const { productsModel } = require('../../../src/models')

describe('Testes de unidade da camada model de produtos', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([allProducts])
    // act
    const result = await productsModel.getAll();
    // assert
    expect(result).to.be.deep.equal(allProducts)
  });

  it('Recuperando apenas um único produto a partir de seu id', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts])

    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(oneProduct)
  });

   afterEach(function () {
    sinon.restore();
  });
})