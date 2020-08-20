### Views

```
PATH           NAME         DESCRIPTION
'/'            Home         Displays all available products. Allows users to add products to shopping cart.
'/checkout'    Checkout     See the list of products in shopping cart. Have form to enter credit card details and finish purchase.
```

### Rest API Endpoints

```
METHOD    PATH                DESCRIPTION
GET       '/product/list'    List all products.
POST      '/order'           Handle order.
```

### Models

```
// Product
{
  "name": String,
  "weight": String,
  "origin": String,
  "picture": String,
  "price": {
    "amount": Number, // (Integer, eg. 1500 for 15.00€)
    "currency": String // (Enumerated values ["EUR", "USD", "NOK"])
  }
}
```

```
// Order
{
  "address": String,
  "total": {
    "amount": Number,
    "currency": String
  },
  "basket": [
    {
      "product": {
        type: ObjectId,
        ref: "Product"
      },
      "quantity": Number
    }
  ],
  "charge": String
}
```
