 const { expect } = require('chai');
const sinon = require('sinon');

const { getAllSales, saleFindById } = require('../models/mocks/sales.model.mock');

const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');

describe('Testes de unidade da camada service de vendas', function () {
  it('listagem de todas as vendas', async function () {
    //arrange
    sinon.stub(salesModel, 'getAll').resolves([getAllSales]);
    //act
    const sales = await salesService.getAll();
    //assert
    expect(sales).to.be.deep.equal(getAllSales);
  });

  it('listagem de uma venda a partir de um id existente', async function () {
    //arrange
    sinon.stub(salesModel, 'findById').resolves(saleFindById);
    //act
    const sale = await salesService.findById(2);
    //assert
    expect(sale).to.be.deep.equal(saleFindById);
  });

   it('listagem de umma venda a partir de um id inexistente', async function () {
    //arrange
    sinon.stub(salesModel, 'findById').resolves(undefined);
    //act
    const sale = await salesService.findById(999);
    //assert
     expect(sale.type).to.equal('SALE_NOT_FOUND');
   });
  
  it('Inserindo um novo produto válido', async function () {
    //arrange
    const newSale = [{
      productId: 1,
      quantity: 2
    }];

    const resultReturned = {
      id: 7,
      itemsSold: [
    [
      {
        productId: 1,
        quantity: 2
      }
    ]
   ]
  }
    sinon.stub(salesModel, 'insertSale').resolves(7);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(newSale);
    // act
    const result = await salesService.insert(newSale);
    // assert
    expect(result).to.be.deep.equal(resultReturned);
  });

  it('Inserindo um novo produto inválido', async function () {
    //arrange
    const newSale = [{
      productId: 1,
      quantity: 2
    }];

    const error = { type: 'PRODUCT_NOT_FOUND' };

    sinon.stub(salesModel, 'insertSale').resolves(7);
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // act
    const result = await salesService.insert(newSale);
    // assert
    expect(result).to.be.deep.equal(error);
  });


  afterEach(function () {
    sinon.restore();
  });
});