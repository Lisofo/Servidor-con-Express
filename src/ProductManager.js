// Santiago Castañares


const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.nextId = 1;
      this.products = require(path);
      console.log(this.products)
    }
  
    addProduct(product) {

      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log('Todos los campos son obligatorios');
        return;
      }
  

      if (this.products.some(existingProduct => existingProduct.code === product.code)) {
        console.log('Ya existe un producto con el mismo código');
        return;
      }

      product.id = this.nextId++;
      this.products.push(product);

      const products = JSON.stringify(this.products);
      fs.writeFileSync(this.path, products);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const productId = parseInt(id);
    
      const product = this.products.find(product => product.id === productId);
      if (product) {
        return product;
      } else {
        console.log('Product not found');
        return null;
      }
    }
  
    updateProduct(id, field, value) {
      const product = this.getProductById(id);
      if (!product) {
        console.log('Product not found');
        return;
      }

      if (field === 'id') {
        console.log('El id no se puede actualizar');
        return;
      }

      product[field] = value;

      const products = JSON.stringify(this.products);
      fs.writeFileSync(this.path, products);
    }
  
    deleteProduct(id) {
      const product = this.getProductById(id);
      if (!product) {
        console.log('Product not found');
        return;
      }

      this.products.splice(this.products.indexOf(product), 1);

      const products = JSON.stringify(this.products);
      fs.writeFileSync(this.path, products);
    }
  }

  module.exports = ProductManager
