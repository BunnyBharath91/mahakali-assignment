import { Button, Card, CardContent } from "@mui/material";
import styles from "./balanceCard.module.css";
function BalanceCard({ minWidth, minHeight, balanceVal, bgColor }) {
  const getRow = (title, value) => {
    return (
      <div className={styles.balContainer}>
        <div className={styles.balTitle}>{title}</div>
        <div className={styles.balVal}>&#x20B9; {value}</div>
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
        <div className={styles.currBalCont}>
          <div className={styles.currBalTitle}>Current Balance</div>
          <div className={styles.currBalVal}>&#x20B9; {balanceVal.balance}</div>
        </div>
        <div className={styles.subBalContainer}>
          {getRow("Total Sales", balanceVal.totalSales)}
          {getRow("Earning", balanceVal.earning)}
          {getRow("Refunded", balanceVal.refunded)}
        </div>
        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            size="small"
            className={styles.withdrawBtn}
          >
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default BalanceCard;
