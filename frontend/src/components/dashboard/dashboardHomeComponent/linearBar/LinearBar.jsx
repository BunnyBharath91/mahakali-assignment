import { LinearProgress } from "@mui/material";
import styles from "./linearBar.module.css";

function LinearBar({ barName, barValue, barColor }) {
  return (
    <div className={styles.lbContainer}>
      <div className={styles.lbTitleContainer}>
        <div className={styles.barName}>{barName}</div>
        <div className={styles.barValue}>{barValue}</div>
      </div>
      <LinearProgress
        variant="determinate"
        value={barValue}
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: `${barColor}`, // Custom color
          },
          backgroundColor: "#919EAB29", // Track color
        }}
        className={styles.linearProgress}
      />
    </div>
  );
}

export default LinearBar;
