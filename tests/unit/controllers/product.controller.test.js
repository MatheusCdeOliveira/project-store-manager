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
  
  it('Inserindo um novo produto válido', async function () {
    const req = {
      body: { name: 'Matheus' }
    };
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    const newProduct = {
      id: 4,
      name: 'Matheus'
    };

    sinon.stub(productService, 'insert').resolves(newProduct);


    await productController.insert(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });
  
   it('Inserindo um novo produto inválido', async function () {
     const req = {
       body: { name: 'Mat' }
     };
     const res = {};

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();
 
     const errorMessage = "\"name\" length must be at least 5 characters long";
     sinon.stub(productService, 'insert')
       .resolves({ type: 'INVALID_VALUE', message: errorMessage });

     await productController.insert(req, res);
    
     expect(res.status).to.have.been.calledWith(422);
     expect(res.json).to.have.been.calledWith({ message: errorMessage });
   });
  
  
   it('Atualizando um produto válido', async function () {
     const req = {
       params: { id: 1 },
       body: { name: 'Matheus' }
     };
     const res = {};

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();

     const updatedProduct = {
       id: 1,
       name: 'Matheus'
     };

     sinon.stub(productService, 'update')
       .resolves(updatedProduct);

     await productController.update(req, res);
    
     expect(res.status).to.have.been.calledWith(200);
     expect(res.json).to.have.been.calledWith(updatedProduct);
   });
  
  it('Atualizando um produto com nome inválido', async function () {
     const req = {
       params: { id: 1 },
       body: { name: 'Math' }
     };
     const res = {};

     res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
     const errorMessage = "\"name\" length must be at least 5 characters long";
     sinon.stub(productService, 'update')
       .resolves({ message: errorMessage });

     await productController.update(req, res);
    
     expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: errorMessage });
  });
  
   it('Atualizando um produto com id inválido', async function () {
     const req = {
       params: { id: 999 },
       body: { name: 'Matheus' }
     };
     const res = {};

     res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
     const error = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
     sinon.stub(productService, 'update')
       .resolves(error);

     await productController.update(req, res);
    
     expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({ message: error.message });
   });
  
  
  it('Deletando um produto válido', async function () {
     const req = {
        params: { id: 999 }
     };
     const res = {};

     const product = {
       id: 3,
       name: 'Matheus'
     }

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();
    
     sinon.stub(productService, 'remove').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    
     await productController.remove(req, res);

     expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

   it('Deletando um produto inválido', async function () {
     const req = {
        params: { id: 3 }
     };
     const res = {};

     const product = {
       id: 3,
       name: 'Matheus'
     }

     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();
    
    sinon.stub(productService, 'remove').resolves(product);
    
    await productController.remove(req, res);

     expect(res.status).to.have.been.calledWith(204);
     expect(res.json).to.have.been.calledWith();
  });

   afterEach(function () {
    sinon.restore();
  });
});