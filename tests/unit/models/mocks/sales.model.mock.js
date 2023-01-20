const saleMock = {
  saleid: 1,
  date: '2023-01-19T18:49:30.000Z',
  productid: 1,
  quantity: 5
};

const saleMockById = [
  {
    date: "2023-01-19T18:49:30.000Z",
    productId: 3,
    quantity: 15
  }
];

const getAllSales = [
  {
    saleId: 1,
    date: '2023-01-19T18:49:30.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 3,
    date: '2023-01-19T19:10:08.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 4,
    date: '2023-01-19T19:18:56.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 5,
    date: '2023-01-19T19:21:08.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 6,
    date: '2023-01-19T19:27:10.000Z',
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: '2023-01-19T18:49:30.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2023-01-19T18:49:30.000Z',
    productId: 3,
    quantity: 15
  }
];


const saleFindById = [
  {
    date: '2023-01-19T18:49:30.000Z',
    productId: 3,
    quantity: 15
  }
]


module.exports = {
  saleMock,
  saleMockById,
  getAllSales,
  saleFindById
}