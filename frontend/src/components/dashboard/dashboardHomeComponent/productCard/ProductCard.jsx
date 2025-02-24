import { getTopProducts } from "../../../../services/productService";
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./productCard.module.css";

function ProductCard({ minWidth, minHeight }) {
  const [filterType, setFilterType] = useState({
    type: "orders",
    listName: "Orders",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(filterType.type);
  }, [filterType.type]);

  const fetchData = async (filter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTopProducts(filter);
      if (response?.data?.topProducts) {
        setProducts(response.data.topProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching top products:", err);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType({
      type: selectedFilter,
      listName: selectedFilter === "orders" ? "Orders" : "Revenue",
    });
  };

  const getRow = (product, idx) => {
    const { product_id, total_orders, total_revenue, Product } = product;

    if (!Product) return null;

    return (
      <div className={styles.rowBox} key={product_id}>
        <div className={styles.prodContainer}>
          {/* Image */}
          <div className={styles.prodIcon}>
            <img
              src={Product.thumbnail_image_url || "https://placehold.co/400"}
              alt={Product.name || "No Name"}
            />
          </div>

          <div className={styles.prodRowCont}>
            <div className={styles.prodNamePriceCont}>
              {/* Product Name */}
              <div className={styles.prodTitle}>
                {Product.name || "Unknown Product"}
              </div>
              {/* Product Price */}
              <div className={styles.prodPrice}>
                &#x20B9;{" "}
                {Product.tag_price ? Product.tag_price.toFixed(2) : "N/A"}
              </div>
            </div>

            <div className={styles.prodBubInfoCont}>
              {/* Orders or Revenue */}
              <div className={styles.prodVal}>
                {filterType.type === "orders"
                  ? total_orders ?? 0
                  : `₹ ${total_revenue?.toFixed(2) ?? "0.00"}`}
              </div>
            </div>
          </div>
        </div>
        {idx !== products.length - 1 && <div className={styles.rowSperation} />}
      </div>
    );
  };

  return (
    <Card
      sx={{
        minWidth: minWidth,
        minHeight: minHeight,
        boxShadow: 5,
        borderRadius: "10px",
      }}
      className={styles.itemContainer}
    >
      <CardContent className={styles.itemContent}>
        <div className={styles.productTitles}>
          <div className={styles.prodHeading}>
            <div className={styles.mainHeading}>Top Products</div>
            <div>
              <Select
                value={filterType.type}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className={styles.prodListType}
              >
                <MenuItem value="orders">Orders</MenuItem>
                <MenuItem value="revenue">Revenue</MenuItem>
              </Select>
            </div>
          </div>
          <div className={styles.prodHeading}>
            <div className={styles.prodSecHeading}>Products</div>
            <div className={styles.prodSecHeading}>{filterType.listName}</div>
          </div>
        </div>

        {/* Show skeleton for individual elements */}
        <div className={styles.subRowContainer}>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div className={styles.rowBox} key={idx}>
                <div className={styles.prodContainer}>
                  <div className={styles.prodIcon}>
                    <Skeleton
                      variant="rectangular"
                      width={50}
                      height={50}
                      sx={{ borderRadius: "6px" }}
                    />
                  </div>

                  <div className={styles.prodRowCont}>
                    <div className={styles.prodNamePriceCont}>
                      <Skeleton
                        variant="text"
                        width={120}
                        height={20}
                        sx={{ borderRadius: "6px" }}
                      />

                      <Skeleton
                        variant="text"
                        width={60}
                        height={18}
                        sx={{ borderRadius: "6px" }}
                      />
                    </div>
                    <div className={styles.prodBubInfoCont}>
                      <Skeleton
                        variant="text"
                        width={40}
                        height={18}
                        sx={{ borderRadius: "6px" }}
                      />
                    </div>
                  </div>
                </div>
                {idx !== 4 && <div className={styles.rowSperation} />}
              </div>
            ))
          ) : error ? (
            <Typography className={styles.errorMessage}>{error}</Typography>
          ) : products.length > 0 ? (
            products.map((item, idx) => getRow(item, idx))
          ) : (
            <div className={styles.noData}>No products available</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
