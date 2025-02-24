# Sales Dashboard - README

## Project Setup

This project consists of a frontend (React) and a backend (Node.js with Express and Sequelize). The frontend runs on port `3000`, and the backend runs on port `8000`. The database used is `SQLite`.

### Installation Steps

#### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

#### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## Viewing the Application

Once the frontend is running, navigate to:

```
http://localhost:3000/admin-dashboard
```

to access the admin dashboard and view the sales data.

---

## API Endpoints

The backend API is prefixed with:

```
http://localhost:8000/api/v1/
```

### **Order APIs** (`/api/v1/orders`)

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/total-orders`  | Fetch total number of orders |
| GET    | `/total-sales`   | Fetch total sales amount     |
| GET    | `/sales-graph`   | Retrieve sales graph data    |
| GET    | `/recent-orders` | Fetch recent orders          |

### **Product APIs** (`/api/v1/products`)

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/total-products` | Fetch total number of products |
| GET    | `/top-products`   | Fetch top-selling products     |

These APIs power the `/admin-dashboard` section of the frontend.

---

## Environment Variables

This project uses environment variables. Ensure you have a `.env` file in the backend directory with the necessary configurations.

Example:

```
PORT=8000
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
```

---

## Notes

- The backend uses `Sequelize` ORM with SQLite.
- CORS is configured to allow requests from `http://localhost:3000`.

Thankyou!!!
