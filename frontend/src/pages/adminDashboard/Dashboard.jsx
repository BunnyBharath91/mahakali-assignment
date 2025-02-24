import { useEffect, useState } from "react";
import { getTotalProducts } from "../../services/productService";
import { getTotalSales } from "../../services/orderService";
import BalanceCard from "../../components/dashboard/dashboardHomeComponent/balanceCard/BalanceCard";
import CustomerReview from "../../components/dashboard/dashboardHomeComponent/customerReview/CustomerReview";
// import InfoCard from "../../components/dashboard/dashboardHomeComponent/infoCard/InfoCard";
import LinearBar from "../../components/dashboard/dashboardHomeComponent/linearBar/LinearBar";
import OrderGrid from "../../components/dashboard/dashboardHomeComponent/orderGrid/OrderGrid";
import ProductCard from "../../components/dashboard/dashboardHomeComponent/productCard/ProductCard";
import SellerCard from "../../components/dashboard/dashboardHomeComponent/sellerCard/SellerCard";
import SalesChartCard from "../../components/dashboard/dashboardHomeComponent/salesChartCard/SalesChartCard";
import ProgressItemCard from "../../components/dashboard/dashboardHomeComponent/progressItemCard/ProgressItemCard";
import ItemCard from "../../components/dashboard/dashboardHomeComponent/itemCard/ItemCard";
import styles from "./dashboard.module.css";
import {
  ConstructionOutlined,
  TroubleshootOutlined,
} from "@mui/icons-material";

const Dashboard = () => {
  // const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState("₹ 0");
  const [loadingTotalProducts, setLoadingTotalProducts] = useState(false);
  const [loadingTotalSales, setLoadingTotalSales] = useState(false);
  // const [topProducts, setTopProducts] = useState([]);

  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return "₹ 0";

    const absValue = Math.abs(value);
    let formattedValue = "";

    if (absValue >= 1_00_00_00_000) {
      formattedValue = (value / 1_00_00_00_000).toFixed(2) + " Cr";
    } else if (absValue >= 1_00_00_000) {
      formattedValue = (value / 1_00_00_000).toFixed(2) + " Cr";
    } else if (absValue >= 1_00_000) {
      formattedValue = (value / 1_00_000).toFixed(2) + " L";
    } else if (absValue >= 1_000) {
      formattedValue = (value / 1_000).toFixed(2) + "K";
    } else {
      formattedValue = value.toFixed(2);
    }

    return `₹ ${formattedValue}`;
  };

  // useEffect(() => {
  //     fetchProducts().then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingTotalProducts(TroubleshootOutlined);
        const totalProductsResponse = await getTotalProducts();
        setTotalProducts(totalProductsResponse.data.totalProducts);
        setLoadingTotalProducts(false);

        setLoadingTotalSales(true);
        const totalSalesResponse = await getTotalSales();
        const formattedSales = formatCurrency(
          totalSalesResponse.data.totalSales
        );
        setTotalSales(formattedSales);
        setLoadingTotalSales(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const balanceVal = {
    balance: 1000,
    totalSales: 10000,
    earning: 5000,
    refunded: 0,
  };

  const dummyReviews = [
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2 days ago",
      rating: 4.5,
      reviewText: "Great product! The quality exceeded my expectations.",
      tags: ["High Quality", "Worth the price", "Fast Shipping"],
    },
    {
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "1 week ago",
      rating: 5,
      reviewText: "Absolutely love it! Would definitely recommend to others.",
      tags: ["Amazing", "Superb", "Must Buy"],
    },
    {
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "5 days ago",
      rating: 3.5,
      reviewText: "Good product, but the delivery took longer than expected.",
      tags: ["Good Quality", "Late Delivery"],
    },
    {
      name: "Emily Brown",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "3 days ago",
      rating: 4,
      reviewText:
        "Very useful and works as described. Satisfied with the purchase.",
      tags: ["Useful", "Good Price", "Nice Design"],
    },
    {
      name: "Chris Wilson",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      date: "2 weeks ago",
      rating: 2.5,
      reviewText: "Not very happy with the product. It could be improved.",
      tags: ["Needs Improvement", "Okayish"],
    },
  ];

  const dummyItemCardsData = [
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/cart-img.png",
      itemVal: "172",
      itemName: "Wireless Headphones",
      itemBg: "orange",
      headingColor: "orange",
    },
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/sales-img.png",
      itemVal: "$ 13.5K",
      itemName: "Total Sales",
      itemBg: "blue",
      headingColor: "blue",
    },
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/products-img.png",
      itemVal: "124",
      itemName: "Total Products",
      itemBg: "green",
      headingColor: "green",
    },
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/add-item.png",
      itemBg: "white",
      itemBtn: "Add New Product",
      customClass: styles.customOrangeItemCard,
      btnClass: styles.orangeBtn,
    },
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/profile-img.png",

      itemBg: "blue",
      itemName: "Profile & Shop Settings",
      itemBtn: "Settings",

      customClass: styles.customLargeItemCard,
      cardNameClass: styles.customCardName,
      btnClass: "",
      headingColor: "blue",
    },
    {
      minHeight: 164,
      minWidth: 164,
      itemImg: "/assets/images/delivery-img.png",

      itemBg: "green",
      itemName: "Manage pick up address",
      itemBtn: "Settings",
      btnClass: styles.greenBtn,
      customClass: styles.customLargeItemCard,
      cardNameClass: styles.customCardName,
      headingColor: "green",
    },
  ];

  const dummyOrders = [
    {
      orderId: "ORD12345",
      orderIcon: "https://placehold.co/400",
      orderName: "Wireless Headphones",
      orderColor: "Black",
      orderDate: "2025-02-21",
      orderTime: "10:30 AM",
      orderAmt: 2499.99,
      orderTyp: "Prepaid",
    },
    {
      orderId: "ORD12346",
      orderIcon: "https://placehold.co/400",
      orderName: "Smart Watch",
      orderColor: "Silver",
      orderDate: "2025-02-20",
      orderTime: "03:45 PM",
      orderAmt: 4999.99,
      orderTyp: "COD",
    },
    {
      orderId: "ORD12347",
      orderIcon: "https://placehold.co/400",
      orderName: "Bluetooth Speaker",
      orderColor: "Blue",
      orderDate: "2025-02-19",
      orderTime: "01:15 PM",
      orderAmt: 1999.49,
      orderTyp: "Prepaid",
    },
    {
      orderId: "ORD12348",
      orderIcon: "https://placehold.co/400",
      orderName: "Gaming Mouse",
      orderColor: "Red",
      orderDate: "2025-02-18",
      orderTime: "05:50 PM",
      orderAmt: 1599.89,
      orderTyp: "COD",
    },
    {
      orderId: "ORD12349",
      orderIcon: "https://placehold.co/400",
      orderName: "Mechanical Keyboard",
      orderColor: "RGB",
      orderDate: "2025-02-17",
      orderTime: "08:20 AM",
      orderAmt: 3499.99,
      orderTyp: "Prepaid",
    },
  ];

  const dummyProducts = [
    {
      id: "P001",
      prodIcon: "https://placehold.co/400",
      title: "Wireless Earbuds",
      price: 2999,
      sales: 150,
      rating: 4.5,
      views: 1200,
    },
    {
      id: "P002",
      prodIcon: "https://placehold.co/400",
      title: "Smartphone",
      price: 24999,
      sales: 75,
      rating: 4.7,
      views: 2200,
    },
    {
      id: "P003",
      prodIcon: "https://placehold.co/400",
      title: "Gaming Laptop",
      price: 79999,
      sales: 30,
      rating: 4.8,
      views: 3500,
    },
    {
      id: "P004",
      prodIcon: "https://placehold.co/400",
      title: "Bluetooth Speaker",
      price: 1999,
      sales: 200,
      rating: 4.3,
      views: 1800,
    },
    {
      id: "P005",
      prodIcon: "https://placehold.co/400",
      title: "Smartwatch",
      price: 4999,
      sales: 125,
      rating: 4.6,
      views: 2500,
    },
  ];

  const sellerData = {
    turnoverRate: "15%",
    return: "2.5%",
    totalViews: "10,235",
  };

  return (
    <div className={`${styles.sectionContainer}`}>
      <h2 className={`${styles.sectionName}`}>Dashboard</h2>
      <h1 className={`${styles.sectionTitle}`}>
        Hi Seller! Check your profile summary quickly👋
      </h1>
      <div className={styles.sectionContent}>
        <ItemCard {...dummyItemCardsData[0]} />
        <ItemCard
          minHeight={164}
          minWidth={164}
          itemImg="/assets/images/sales-img.png"
          itemVal={totalSales}
          itemName="Total Sales"
          itemBg="blue"
          headingColor="blue"
          isLoading={loadingTotalSales}
        />
        <div className={styles.orderSummaryContainer}>
          <h2 className={styles.orderSummaryHeading}>Order Summary</h2>
          <LinearBar barName="NEW ORDERS" barValue={75} barColor="#3F59A3" />
          <LinearBar
            barName="IN TRANSIT ORDERS"
            barValue={50}
            barColor="#ff8c00"
          />
          <LinearBar
            barName="IN TRANSIT ORDERS"
            barValue={50}
            barColor="#00c53c"
          />
          <LinearBar
            barName="IN TRANSIT ORDERS"
            barValue={50}
            barColor="#ef5350"
          />
        </div>
        <ItemCard
          minHeight={164}
          minWidth={164}
          itemImg="/assets/images/products-img.png"
          itemVal={totalProducts}
          itemName="Total Products"
          itemBg="green"
          headingColor="green"
          isLoading={loadingTotalProducts}
        />
        <ItemCard {...dummyItemCardsData[3]} />
        <SalesChartCard minWidth={520} minHeight={450} />
        <ProductCard products={dummyProducts} minWidth={520} minHeight={450} />
        <BalanceCard minWidth={260} minHeight={200} balanceVal={balanceVal} />
        <SellerCard
          minWidth={280}
          minHeight={200}
          sellVal={sellerData}
          bgColor="#F5F5F5"
        />
        <ItemCard {...dummyItemCardsData[4]} />
        <ItemCard {...dummyItemCardsData[5]} />

        <OrderGrid minWidth={800} minHeight={200} orders={dummyOrders} />
        <CustomerReview reviews={dummyReviews} minWidth={300} minHeight={300} />
      </div>
    </div>
  );
};

export default Dashboard;
