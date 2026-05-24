# 🪷 Sawai Gir Amrut Ghee — Full Stack eCommerce

**A Brand by Vithoba Ventures Group of Companies**
> Pure A2 Gir Cow Ghee · Vedic Bilona Method · Phaltan, Maharashtra

---

## 🗂️ Project Structure

```
sawai-ghee/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Navbar, Footer, ProductCard, GheeJar SVG
│   │   ├── pages/         # All pages + Admin panel
│   │   ├── store.js       # Zustand (cart + auth state)
│   │   └── utils/api.js   # Axios API client
├── backend/           # Spring Boot (Java 17)
│   └── src/main/java/com/sawai/ghee/
│       ├── controller/    # REST controllers
│       ├── model/         # JPA entities
│       ├── repository/    # Spring Data repositories
│       ├── dto/           # Request/Response DTOs
│       └── security/      # JWT auth + Spring Security
├── database/
│   └── schema.sql     # PostgreSQL schema + seed data
└── README.md
```

---

## ⚙️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Zustand, Framer Motion |
| Backend    | Spring Boot 3.2, Spring Security, JWT  |
| Database   | PostgreSQL 15+                          |
| Payments   | Razorpay                                |
| Auth       | JWT (Bearer token)                      |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+
- PostgreSQL 15+
- Razorpay account (test keys from https://dashboard.razorpay.com)

---

### 1. Database Setup

```bash
# Login to PostgreSQL
psql -U postgres

# Run schema
\i database/schema.sql

# Verify
\c sawai_ghee
\dt
```

---

### 2. Backend Setup

```bash
cd backend

# Edit application.properties
# Set DB credentials, Razorpay keys, JWT secret

# Build and run
./mvnw spring-boot:run
# or
mvn spring-boot:run

# Backend runs on: http://localhost:8080
```

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sawai_ghee
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD

razorpay.key.id=rzp_test_YOUR_KEY_ID
razorpay.key.secret=YOUR_KEY_SECRET

app.jwt.secret=YourLongSecretKeyHereAtLeast32Characters
```

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Edit .env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
VITE_API_BASE_URL=http://localhost:8080/api

# Run development server
npm run dev

# Frontend runs on: http://localhost:3000
```

---

### 4. Razorpay Integration

1. Create account at https://dashboard.razorpay.com
2. Go to Settings → API Keys → Generate Test Key
3. Copy Key ID and Key Secret
4. Add to `backend/application.properties` and `frontend/.env`

**Payment Flow:**
```
User clicks Pay → Frontend calls POST /api/payments/create-order
→ Backend creates Razorpay order → Returns order_id
→ Razorpay checkout opens → User pays
→ Razorpay calls handler with payment_id + signature
→ Frontend calls POST /api/payments/verify
→ Backend verifies HMAC signature → Updates order status
```

---

## 📡 API Reference

### Auth
| Method | Endpoint          | Auth     | Description            |
|--------|-------------------|----------|------------------------|
| POST   | /api/auth/register| Public   | Create new account     |
| POST   | /api/auth/login   | Public   | Login, get JWT token   |
| GET    | /api/auth/me      | User     | Get current user       |

### Products
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| GET    | /api/products         | Public   | List all products   |
| GET    | /api/products/{id}    | Public   | Get single product  |
| POST   | /api/products         | Admin    | Create product      |
| PUT    | /api/products/{id}    | Admin    | Update product      |
| DELETE | /api/products/{id}    | Admin    | Delete product      |
| PATCH  | /api/products/{id}/stock | Admin | Update stock       |

### Orders
| Method | Endpoint              | Auth     | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | /api/orders           | User     | Create order        |
| GET    | /api/orders/my        | User     | My orders           |
| GET    | /api/orders/{id}      | User     | Order details       |
| GET    | /api/orders/all       | Admin    | All orders          |
| PATCH  | /api/orders/{id}/status | Admin  | Update status       |

### Payments
| Method | Endpoint                 | Auth     | Description             |
|--------|--------------------------|----------|-------------------------|
| POST   | /api/payments/create-order | User   | Create Razorpay order   |
| POST   | /api/payments/verify      | User    | Verify payment signature |
| POST   | /api/payments/webhook     | Public  | Razorpay webhook        |

### Wholesale
| Method | Endpoint               | Auth     | Description          |
|--------|------------------------|----------|----------------------|
| POST   | /api/wholesale/leads   | Public   | Submit enquiry       |
| GET    | /api/wholesale/leads   | Admin    | All leads            |

### Reviews
| Method | Endpoint                      | Auth     | Description    |
|--------|-------------------------------|----------|----------------|
| GET    | /api/reviews/product/{id}     | Public   | Product reviews |
| POST   | /api/reviews                  | User     | Add review      |

---

## 🔐 Admin Access

Default admin credentials (created by seed data):
- **Email:** admin@sawaighee.com
- **Password:** Admin@123

> ⚠️ Change password immediately after first login in production!

Admin panel: http://localhost:3000/admin

---

## 💳 Coupon Codes (Demo)

| Code      | Discount |
|-----------|----------|
| SAWAI10   | 10% off  |
| FIRST15   | 15% off  |
| BILONA20  | 20% off  |

---

## 🛒 Pages

| Path                 | Description                    |
|----------------------|--------------------------------|
| /                    | Home page                      |
| /products            | All products listing           |
| /products/:id        | Product detail page            |
| /about               | Brand story & Bilona process   |
| /wholesale           | Wholesale enquiry              |
| /cart                | Shopping cart                  |
| /checkout            | Checkout + Razorpay            |
| /order-success       | Order confirmation             |
| /contact             | Contact form                   |
| /login               | User login                     |
| /register            | User registration              |
| /admin               | Admin dashboard                |
| /admin/products      | Product management             |
| /admin/orders        | Order management               |

---

## 📦 Build for Production

```bash
# Frontend
cd frontend
npm run build
# Output in: frontend/dist/

# Backend
cd backend
mvn clean package -DskipTests
# Output: backend/target/ghee-backend-1.0.0.jar
java -jar target/ghee-backend-1.0.0.jar
```

---

## 🏗️ Future Enhancements

- [ ] Email notifications (order confirmation, dispatch)
- [ ] SMS notifications via MSG91/Twilio
- [ ] Product image upload (AWS S3 / Cloudinary)
- [ ] Advanced analytics dashboard
- [ ] Loyalty points system
- [ ] Multi-language support (Marathi / Hindi)
- [ ] PWA (Progressive Web App) support
- [ ] Google Analytics integration

---

## 📞 Support

**Sawai Gir Farm** · Malwadi, Post Bibi, Tal Phaltan, Dist Satara – 415537  
**Customer Care:** 9130643003  
**WhatsApp:** https://wa.me/919130643003

*परंपरेची शुद्ध चव, आरोग्याचा खरा विश्वास* 🪷
