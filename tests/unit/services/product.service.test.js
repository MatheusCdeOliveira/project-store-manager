const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts, oneProduct } = require('../models/mocks/product.model.mock');

const { productService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('Testes de unidade da camada service de produtos', function () {
  it('listagem de todos os produtos', async function () {
    //arrange
    sinon.stub(productsModel, 'getAll').resolves([allProducts]);
    //act
    const products = await productService.getAll();
    //assert
    expect(products).to.be.deep.equal([allProducts]);
  });

  it('listagem de um produto a partir de um id existente', async function () {
    //arrange
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    //act
    const products = await productService.findById(1);
    //assert
    expect(products).to.be.deep.equal(oneProduct);
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
  
  it('Inserindo um novo produto válido', async function () {
    //arrange
    const newProduct = {
      name: 'Kratos'
    }
    const newId = 1;
    sinon.stub(productsModel, 'insert').resolves(newId);
    // act
    const result = await productService.insert(newProduct);
    // assert
    expect(result).to.be.deep.equal({ id: newId, name: newProduct.name });
  });

  it('Inserindo um novo produto com name inválido', async function () {
    //arrange
    const invalidNewProduct = {
      name: 'Joel'
    };
    const errorMessage = "\"name\" length must be at least 5 characters long";
    const typeError = 'INVALID_VALUE';
    const newId = 1;
    sinon.stub(productsModel, 'insert').resolves(newId);
    // act
    const result = await productService.insert(invalidNewProduct);
    // assert
    expect(result).to.be.deep.equal({ type: typeError, message: errorMessage });
  });

  it('Atualizando um produto com name inválido', async function () {
    // assert
    sinon.stub(productsModel, 'update').resolves(undefined);
    // act
    const productId = 1;
    const invalidName = 'Zeca';
    const errorMessage = "\"name\" length must be at least 5 characters long";

    const result = await productService.update(productId, invalidName);
    // assert
    expect(result).to.be.deep.equal({ message: errorMessage });
  });

  it('Atualizando um produto com id inexistente', async function () {
    // assert
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // act
    const productId = 999;
    const name = 'Shrek';

    const result = await productService.update(productId, name);
    // assert
    expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });


  it('Atualizando um produto com id existente', async function () {
    // assert
    const product = {
      id: 3,
      name: "Shrek"
    }

    const updatedProduct = {
      id: 3,
      name: "Viserys"
    }
    const productId = 3;
    const name = 'Viserys';

    sinon.stub(productsModel, 'findById').resolves(product)
    sinon
      .stub(productsModel, 'update').resolves(updatedProduct);
    // act

    const result = await productService.update(productId, name);
    // assert
    expect(result).to.be.deep.equal(updatedProduct);
  });

  it('Deletando um produto existente', async function () {
    const productToRemove = 2
    sinon.stub(productsModel, 'findById').resolves({})
    sinon.stub(productsModel, 'remove').resolves(undefined);

    const result = await productService.remove(productToRemove);

    expect(result).to.be.deep.equal({});
  });

  it('Deletando um produto inexistente', async function () {
    const productToRemove = 999
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const result = await productService.remove(productToRemove);

    expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});