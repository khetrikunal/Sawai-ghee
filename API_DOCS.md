# 📡 Sawai Gir Amrut Ghee — API Documentation

Base URL: `http://localhost:8080/api`

All authenticated endpoints require: `Authorization: Bearer <JWT_TOKEN>`

---

## Authentication

### POST `/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "SecurePass@123",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "9876543210",
      "role": "USER"
    }
  }
}
```

---

### POST `/auth/login`

**Request Body:**
```json
{
  "email": "priya@example.com",
  "password": "SecurePass@123"
}
```

**Response:** Same as register.

---

### GET `/auth/me`  *(Auth required)*

Returns the currently authenticated user.

---

## Products

### GET `/products`

**Query Params:** `?active=true`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sawai Gir Amrut Ghee",
    "size": "500 ml",
    "price": 699.00,
    "originalPrice": 849.00,
    "discount": 18,
    "description": "Premium A2 Gir Cow Ghee...",
    "stock": 100,
    "badge": "BESTSELLER",
    "imageUrl": null,
    "active": true
  }
]
```

---

### GET `/products/{id}`

Returns a single product by ID.

---

### POST `/products`  *(Admin only)*

**Request Body:**
```json
{
  "name": "Sawai Gir Amrut Ghee",
  "size": "250 ml",
  "price": 399.00,
  "originalPrice": 499.00,
  "discount": 20,
  "description": "Trial pack...",
  "stock": 200,
  "badge": "NEW",
  "active": true
}
```

---

### PUT `/products/{id}`  *(Admin only)*

Full update of a product. Same body as POST.

---

### DELETE `/products/{id}`  *(Admin only)*

Deletes a product permanently.

---

### PATCH `/products/{id}/stock`  *(Admin only)*

**Request Body:**
```json
{ "quantity": 150 }
```

---

## Orders

### POST `/orders`  *(Auth required)*

**Request Body:**
```json
{
  "items": [
    { "productId": 1, "quantity": 2, "price": 699.00 },
    { "productId": 2, "quantity": 1, "price": 1299.00 }
  ],
  "shippingAddress": {
    "name": "Priya Sharma",
    "phone": "9876543210",
    "email": "priya@example.com",
    "address": "Flat 4B, Sunrise Apartment, FC Road",
    "city": "Pune",
    "state": "Maharashtra",
    "pin": "411004",
    "landmark": "Near Goodluck Cafe"
  },
  "total": 2697.00,
  "couponCode": "SAWAI10"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "SWI1714912345678",
    "customerName": "Priya Sharma",
    "total": 2697.00,
    "status": "PENDING",
    "createdAt": "2025-05-05T10:30:00"
  }
}
```

---

### GET `/orders/my`  *(Auth required)*

Returns all orders for the logged-in user.

---

### GET `/orders/{id}`  *(Auth required)*

Returns a specific order by ID.

---

### GET `/orders/all`  *(Admin only)*

Returns all orders, newest first.

---

### PATCH `/orders/{id}/status`  *(Admin only)*

**Request Body:**
```json
{ "status": "SHIPPED" }
```

Valid statuses: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`

---

## Payments

### POST `/payments/create-order`  *(Auth required)*

Creates a Razorpay payment order.

**Request Body:**
```json
{
  "amount": 2697.00,
  "currency": "INR",
  "receipt": "sawai_1714912345"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_NZEUkqDMExxxxx",
    "backendOrderId": "SWI1714912345678",
    "amount": 2697.00,
    "currency": "INR",
    "status": "created"
  }
}
```

---

### POST `/payments/verify`  *(Auth required)*

Verify Razorpay payment signature after checkout.

**Request Body:**
```json
{
  "razorpayOrderId": "order_NZEUkqDMExxxxx",
  "razorpayPaymentId": "pay_NZEVxxxxxxxxxx",
  "razorpaySignature": "e7b9e98f12345...",
  "backendOrderId": "SWI1714912345678"
}
```

---

### POST `/payments/webhook`  *(Public)*

Razorpay webhook endpoint. Configure in Razorpay dashboard.

---

## Wholesale

### POST `/wholesale/leads`  *(Public)*

Submit a wholesale enquiry.

**Request Body:**
```json
{
  "name": "Rajesh Traders",
  "phone": "9988776655",
  "email": "rajesh@traders.com",
  "quantity": "50 units of 1L per month",
  "businessType": "Grocery / Retail Store",
  "city": "Nashik",
  "message": "We run 3 stores in Nashik and want to stock your ghee."
}
```

---

### GET `/wholesale/leads`  *(Admin only)*

Returns all wholesale leads.

---

## Reviews

### GET `/reviews/product/{productId}`  *(Public)*

Returns all reviews for a product.

**Response:**
```json
[
  {
    "id": 1,
    "productId": 2,
    "userName": "Priya Sharma",
    "rating": 5,
    "comment": "Excellent ghee, just like grandmother used to make!",
    "createdAt": "2025-05-01"
  }
]
```

---

### POST `/reviews`  *(Auth required)*

**Request Body:**
```json
{
  "productId": 2,
  "rating": 5,
  "comment": "Best ghee I have ever tasted!"
}
```

---

## Error Responses

All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description here",
  "data": null
}
```

| Status | Meaning                         |
|--------|---------------------------------|
| 400    | Bad request / validation failed |
| 401    | Unauthorized (no/invalid token) |
| 403    | Forbidden (insufficient role)   |
| 404    | Resource not found              |
| 500    | Internal server error           |
