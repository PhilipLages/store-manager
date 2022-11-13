const mockAllProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const mockProductById = {
  "id": 1,
  "name": "Martelo de Thor"
};


const mockProductNotFound = {
  "message": "Product not found"
};

const mockNewProduct = {
  "id": 4,
  "name": "ProductX"
}


module.exports = {
  mockAllProducts,
  mockProductById,
  mockProductNotFound,
  mockNewProduct,
};
