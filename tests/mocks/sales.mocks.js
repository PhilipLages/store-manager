const saleTest = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 1
  }
];

const invalidSaleTest = [
  {
    "productId": 100,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 1
  }
];

const validSaleMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
};

const mockAllSales = [
	{
		"saleId": 1,
		"date": "2022-11-15T17:41:51.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"saleId": 1,
		"date": "2022-11-15T17:41:51.000Z",
		"productId": 2,
		"quantity": 10
	},
	{
		"saleId": 2,
		"date": "2022-11-15T17:41:51.000Z",
		"productId": 3,
		"quantity": 15
	}
]

const mockSaleById = [
  {
    "date": "2022-11-15T17:41:51.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-15T17:41:51.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const mockSaleNotFound = {
  "message": "Sale not found"
};

module.exports = {
  saleTest,
  invalidSaleTest,
  validSaleMock,
  mockAllSales,
  mockSaleById,
  mockSaleNotFound,
};