require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());

// Import routes
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

// Use routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 8000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
