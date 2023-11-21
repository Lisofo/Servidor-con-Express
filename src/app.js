const express = require("express");
const app = express();
const port = 8080;
const ProductManager = require('./ProductManager');


const productManager = new ProductManager('../products.json');

app.get('/products', async (req, res) => {
  const products = await productManager.getProducts();

  const limit = req.query.limit;

  if (!limit) {
    res.json(products);
  } else {
    res.json(products.slice(0, parseInt(limit))); // Convertir limit a número
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});