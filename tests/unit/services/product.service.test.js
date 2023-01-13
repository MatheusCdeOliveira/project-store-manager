const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts, oneProduct } = require('../models/mocks/product.model.mock');

const { productService } = require('../../../src/services')
const { productsModel } = require('../../../src/models')

describe('Testes de unidade da camada service de produtos', function () {
  it('listagem de todos os produtos', async function () {
    //arrange
    sinon.stub(productsModel, 'getAll').resolves([allProducts]);
    //act
    const products = await productService.getAll();
    //assert
    expect(products).to.be.deep.equal([allProducts])
  });

  it('listagem de um produto a partir de um id existente', async function () {
    //arrange
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    //act
    const products = await productService.findById(1);
    //assert
    expect(products).to.be.deep.equal(oneProduct)
  });

   it('listagem de um produto a partir de um id inexistente', async function () {
    //arrange
    sinon.stub(productsModel, 'findById').resolves(undefined);
    //act
    const products = await productService.findById(5);
    //assert
     expect(products.type).to.equal('PRODUCT_NOT_FOUND');
     expect(products.message).to.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});