// // Mock data
// const yearlyData = [
//   { month: "Jan", value: 100 },
//   { month: "Feb", value: 120 },
//   { month: "Mar", value: 150 },
//   { month: "Apr", value: 80 },
//   { month: "May", value: 200 },
//   { month: "Jun", value: 170 },
//   { month: "Jul", value: 90 },
//   { month: "Aug", value: 160 },
//   { month: "Sep", value: 220 },
//   { month: "Oct", value: 190 },
//   { month: "Nov", value: 130 },
//   { month: "Dec", value: 140 },
// ];

// const weeklyData = Array.from({ length: 30 }, (_, i) => ({
//   day: i + 1,
//   value: Math.floor(Math.random() * 80) + 20,
// }));
import { useEffect, useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  CardContent,
  Skeleton,
} from "@mui/material";
import { LineChart, useDrawingArea } from "@mui/x-charts";
import styles from "./salesChartCard.module.css";
import { getSalesGraph } from "../../../../services/orderService";

const Colorswitch = () => {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;
  return (
    <>
      <defs>
        <linearGradient
          id="paint0_linear_45_2"
          x1="300.25"
          y1="46.9999"
          x2="300.25"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2F4CDD" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2F4CDD" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};

const SalesChartCard = ({ minWidth, minHeight }) => {
  const [timeframe, setTimeframe] = useState("yearly");
  const [year, setYear] = useState("2024");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await getSalesGraph(timeframe, year);
        const formattedData = formatSalesData(
          response?.data?.salesData || [],
          timeframe
        );
        setData(formattedData);
      } catch (err) {
        setError("Failed to load sales data");
      }
      setLoading(false);
    }
    fetchData();
  }, [timeframe, year]);

  const formatSalesData = (salesData, filter) => {
    if (filter === "yearly") {
      const monthlyTotals = {};
      salesData.forEach(({ date, total_sales }) => {
        const month = new Date(date).toLocaleString("en-US", {
          month: "short",
        });
        monthlyTotals[month] = (monthlyTotals[month] || 0) + total_sales;
      });
      return Object.keys(monthlyTotals).map((month) => ({
        month,
        value: monthlyTotals[month],
      }));
    } else {
      return salesData.map(({ date, total_sales }) => ({
        day: new Date(date).getDate(),
        value: total_sales,
      }));
    }
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <CardContent sx={{ minHeight, minWidth }} className={styles.itemContent}>
      <div className={styles.saleContainer}>
        <div className={styles.saleHeader}>
          <div className={styles.salesTitle}>Sales</div>
          <div className={styles.selectCont}>
            <Select
              size="small"
              value={timeframe}
              onChange={handleTimeframeChange}
              className={styles.selectType}
            >
              <MenuItem value="yearly">Yearly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
            <Select
              size="small"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={styles.selectType}
            >
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </div>
        </div>

        <div style={{ minHeight: 350, position: "relative" }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={350} />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : data.length === 0 ? (
            <Typography>No sales data available</Typography>
          ) : (
            <LineChart
              series={[
                {
                  data: data.map((item) => item.value),
                  area: true,
                  showMark: false,
                  color: "#2F4CDD",
                },
              ]}
              xAxis={[
                {
                  data: data.map((item) => item.month || item.day),
                  scaleType: "point",
                  tickSize: 0,
                  axisLine: null,
                },
              ]}
              yAxis={[{ label: "Units", tickSize: 0, axisLine: null }]}
              grid={{
                vertical: false,
                horizontal: true,
                strokeDasharray: "4 4",
                stroke: "#D3D3D3",
              }}
              height={350}
              margin={{ top: 20, right: 0, bottom: 20, left: 20 }}
              sx={{
                ".css-j6h5qe-MuiAreaElement-root": {
                  fill: "url(#paint0_linear_45_2)",
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.4",
                  fill: "#9b9b9b",
                },
                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                  fontFamily: "Roboto",
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                  strokeWidth: "0.5",
                  fill: "#9b9b9b",
                },
                "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                  stroke: "#ffffff",
                  strokeWidth: 0.4,
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                  stroke: "#ffffff",
                  strokeWidth: 0.4,
                },
              }}
            >
              <Colorswitch />
            </LineChart>
          )}
        </div>
      </div>
    </CardContent>
  );
};

export default SalesChartCard;
