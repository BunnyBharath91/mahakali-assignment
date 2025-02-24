import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import styles from "./orderGrid.module.css";
import { getRecentOrders } from "../../../../services/orderService";

function OrderGrid({ minWidth, minHeight }) {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const ordersResponse = await getRecentOrders();
        setOrders(ordersResponse.data.recentOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Format date & time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
      date
    );
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", { timeStyle: "short" }).format(
      date
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
        <div className={styles.gridHeader}>
          <Typography className={styles.gridTitle} variant="h6">
            Recent Orders
          </Typography>
          {orders.length > 3 && (
            <Button
              variant="text"
              size="small"
              className={styles.btnViewAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          )}
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        {loading ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Order ID",
                    "Product",
                    "Date & Time",
                    "Amount",
                    "Order Type",
                  ].map((header, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width={80} height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={20}
                          sx={{ borderRadius: "6px" }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer
            sx={{
              borderRadius: "15px",
              maxHeight: showAll ? 300 : "auto",
              overflowY: showAll ? "auto" : "visible",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#EAEAEA" }}>
                  <TableCell className={styles.orderTitle}>Order ID</TableCell>
                  <TableCell className={styles.orderTitle}>Product</TableCell>
                  <TableCell className={styles.orderTitle}>
                    Date & Time
                  </TableCell>
                  <TableCell className={styles.orderTitle}>Amount</TableCell>
                  <TableCell className={styles.orderTitle}>
                    Order Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "white" }}>
                {(showAll ? orders : orders.slice(0, 3)).map((order) => (
                  <TableRow
                    key={order.order_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className={styles.orderID}>
                      {order.order_id}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={styles.orderName}>
                        {order.Product?.name || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={styles.orderName}>
                        {formatDate(order.created_at)}
                      </Typography>
                      <Typography variant="body2" className={styles.orderTime}>
                        {formatTime(order.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={styles.orderAmt}>
                        ₹ {order.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.order_type}
                        sx={{
                          backgroundColor:
                            order.order_type === "Cash on Delivery"
                              ? "#fff3e0"
                              : "#e8f5e9",
                          color:
                            order.order_type === "Cash on Delivery"
                              ? "#e65100"
                              : "#2e7d32",
                          fontWeight: 500,
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!showAll && orders.length > 3 && !loading && (
          <div className={styles.gridFooter}>{orders.length - 3} more...</div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrderGrid;
