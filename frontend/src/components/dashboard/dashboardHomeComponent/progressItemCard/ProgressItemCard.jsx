import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./progressItemCard.module.css";
import LinearBar from "../linearBar/LinearBar";

const ProgressItemCard = ({ cardTitle, minWidth, minHeight, orderSummary }) => {
  return (
    <Card
      sx={{ minWidth: minWidth, minHeight: minHeight,boxShadow:5,borderRadius:"10px" }}
      className={`${styles.progItmContainer}`}
    >
      <CardContent className={styles.progItmContent}>
        {cardTitle && <div className={styles.cardTitle}>{cardTitle}</div>}
        <div className={styles.linearBarCont}>
          <LinearBar 
            barName="NEW ORDERS" 
            barValue={orderSummary.newOrder} 
            barColor="#3F59A3" 
          />
          <LinearBar
            barName="IN TRANSIT ORDERS"
            barValue={orderSummary.inTransit}
            barColor="#FF8C00"
          />
          <LinearBar
            barName="ORDER COMPLETED"
            barValue={orderSummary.orderComplete}
            barColor="#00C53C"
          />
          <LinearBar
            barName="CANCELLED ORDER"
            barValue={orderSummary.orderCancel}
            barColor="#EF5350"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressItemCard;
