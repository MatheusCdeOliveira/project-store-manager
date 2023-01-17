const express = require('express');

const app = express();

const { productController, salesController } = require('./controllers');
const { validationName } = require('./middlewares/validateNameProduct');
const { validationProductId } = require('./middlewares/validateProductSale');
const { validationQuantity } = require('./middlewares/validateQuantitySale');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.findById);

app.put('/products/:id', validationName, productController.update);

app.delete('/products/:id', productController.remove);

app.post('/products', validationName, productController.insert);

app.post('/sales', validationProductId, validationQuantity, salesController.insert);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.findById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;