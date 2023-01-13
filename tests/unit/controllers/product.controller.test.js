const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const { productService } = require('../../../src/services');

const { allProducts, oneProduct } = require('../models/mocks/product.model.mock');

const { productController } = require('../../../src/controllers');

describe('Testes de unidade da camada controller de produtos', function () {
  it('listagem de todos os produtos', async function () {
    //arrange
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
        sinon
        .stub(productService, 'getAll')
        .resolves([allProducts]);
    //act
     await productController.getAll(req, res);
    //assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([allProducts])
  });

   it('listagem de um produto a partir de um id existente', async function () {
    //arrange
     const req = {
      params: { id: 1 }
    }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
        sinon
        .stub(productService, 'findById')
        .resolves(oneProduct);
    //act
     await productController.findById(req, res);
    //assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneProduct)
   });
  
    it('listagem de um produto a partir de um id inexistente', async function () {
    //arrange
     const req = {
      params: { id: 9999 }
    }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
        sinon
        .stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    //act
     await productController.findById(req, res);
    //assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  });

   afterEach(function () {
    sinon.restore();
  });
});