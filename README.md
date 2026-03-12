# Product Inventory Backend

Simple Node.js/Express backend implementing a product inventory system with MongoDB.

## Project structure

```
MSE1/
├── .env                # environment variables
├── controllers/        # request handlers
│   └── productsController.js
├── models/             # mongoose schemas
│   └── Product.js
├── routes/             # express routers
│   └── products.js
├── server.js           # entry point
├── package.json        # npm metadata
└── README.md           # this file
```

## Setup

1. Clone the repo or copy files.
2. Run `npm install` to install dependencies.
3. Create a `.env` file (see example above) with your MongoDB connection string and port.
4. Start MongoDB (`mongod`).
5. Run `npm run dev` for development or `npm start` for production.

## API Endpoints

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| POST   | /products                  | Add a new product           |
| GET    | /products                  | Get all products            |
| GET    | /products/:id              | Get product by id           |
| PUT    | /products/:id              | Update product              |
| DELETE | /products/:id              | Delete product              |
| GET    | /products/search?name=xyz  | Search products by name     |
| GET    | /products/category?cat=xyz | Filter products by category |

## Schema Validations

- `name` required
- `code` required & unique
- `supplierName` required
- `quantityInStock` non-negative
- `unitPrice` positive
- `reorderLevel` greater than or equal to 0
- `status` default `Available`

## Additional Notes

- Uses Mongoose for schema definitions and validations.
- CORS enabled for cross-origin requests.
- Express JSON middleware for parsing request bodies.
"# Store-Management" 
