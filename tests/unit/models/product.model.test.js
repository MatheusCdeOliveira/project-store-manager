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

    expect(result).to.be.deep.equal(oneProduct);
  });

  it('Inserindo um produto novo', async function () {
    //arrange
    const newProduct = {
      name: 'Matheus'
    }
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    //act
    const result = await productsModel.insert(newProduct);
    //assert
    expect(result).to.be.equal(5);
  });

  it('Atualizando um produto existente', async function () {
    //arrange
    const updateProduct = {
      name: 'Matt Murdock'
    }
    const productToUpdate = 2
    sinon.stub(connection, 'execute').resolves({ id: productToUpdate, name: updateProduct.name});
    //act
    const result = await productsModel.update(productToUpdate, updateProduct.name);
    //assert
    expect(result).to.be.deep.equal({ id: productToUpdate, name: updateProduct.name});
  })

    it('Deletando um produto existente', async function () {
    //arrange
    sinon.stub(connection, 'execute').resolves([{ deleteRows: 1 }]);
    const productToRemove = 1
    //act
      const result = await productsModel.remove(productToRemove);
    //assert
      expect(result).to.be.undefined;
  })

  afterEach(function () {
    sinon.restore();
  });
});