import { Card, CardContent } from "@mui/material";
// import InsightIcon from '../../assets/dashboardImages/insights.svg';
import styles from "./sellerCard.module.css";

function SellerCard({ minWidth, minHeight, sellVal, bgColor }) {
  const getRow = (title, value) => {
    return (
      <div className={styles.rowContainer}>
        <div className={styles.rowTitle}>{title}</div>
        <div className={styles.rowVal}>{value}</div>
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
        backgroundColor: bgColor,
      }}
      className={`${styles.itemContainer}`}
    >
      <CardContent className={styles.itemContent}>
        <div className={styles.sellTitle}>Seller Insights:</div>
        <div className={styles.sellerInsightIconCont}>
          <img src="/assets/images/insites-img.png" alt="seller-insight" />
        </div>
        <div className={styles.rowsCont}>
          {getRow("Inventory turnover rate", sellVal.turnoverRate)}
          {getRow("Return percentage", sellVal.return)}
          {getRow("Total Views", sellVal.totalViews)}
        </div>
      </CardContent>
    </Card>
  );
}

export default SellerCard;
