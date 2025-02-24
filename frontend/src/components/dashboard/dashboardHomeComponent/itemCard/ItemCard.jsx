import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import styles from "./itemCard.module.css";
import { useNavigate } from "react-router-dom";

const ItemCard = ({
  itemImg,
  itemVal,
  itemName,
  itemBg,
  itemBtn,
  customClass,
  btnClass,
  cardNameClass,
  minHeight,
  minWidth,
  headingColor,
  link,
  isLoading,
}) => {
  const navigate = useNavigate();

  const colorVariants = {
    blue: "#F8FAFF",
    orange: "#FFFAEE",
    green: "#EFFFF4",
    white: "#FFFFFF",
  };

  const colorVariantsHeading = {
    blue: "#3F59A3",
    orange: "#FF8C00",
    green: "#00C53C",
  };

  return (
    <CardContent
      sx={{ minWidth: minWidth, minHeight: minHeight }}
      className={`${styles.cardContainer} ${customClass}`}
      style={{ background: colorVariants[itemBg] }}
    >
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={80}
          height={80}
          sx={{ borderRadius: "8px" }}
        />
      ) : (
        <img src={itemImg} alt={itemName} className={styles.cardImg} />
      )}

      {isLoading ? (
        <Skeleton variant="text" width={60} height={20} />
      ) : (
        itemVal && <span className={styles.cardValue}>{itemVal}</span>
      )}

      {isLoading ? (
        <Skeleton variant="text" width={100} height={20} />
      ) : (
        itemName && (
          <span
            className={`${styles.cardName} ${cardNameClass}`}
            style={{ color: colorVariantsHeading[itemBg] }}
          >
            {itemName}
          </span>
        )
      )}

      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={80}
          height={30}
          sx={{ borderRadius: "4px" }}
        />
      ) : (
        itemBtn && (
          <Button
            variant="contained"
            className={`${styles.cardBtn} ${btnClass}`}
            size="small"
            onClick={() => navigate(link)}
          >
            {itemBtn}
          </Button>
        )
      )}
    </CardContent>
  );
};

export default ItemCard;
