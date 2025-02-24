import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./customerReview.module.css";

const CustomerReview = ({ reviews, minWidth, minHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const getReview = (content) => {
    return (
      <div>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={content.avatar} alt={content.name} sx={{ mr: 2 }} />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: "14px" }}
            >
              {content.name}
            </Typography>
            <Typography
              sx={{ fontWeight: 700, fontSize: "12px", color: "#A1A1A1" }}
            >
              Posted {content.date}
            </Typography>
          </Box>
        </Box>

        <Rating value={content.rating} readOnly sx={{ mb: 2 }} />
        <Typography
          sx={{ fontWeight: 600, fontSize: "14px", color: "#212121", mb: 2 }}
        >
          {content.reviewText}
        </Typography>

        <Box display="flex" gap={1} flexWrap="wrap">
          {content.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                color: "#212121",
                borderRadius: "6px",
              }}
              className={styles.commentTags}
            />
          ))}
        </Box>
      </div>
    );
  };

  return (
    <Card
      sx={{
        minWidth: minWidth,
        maxWidth: minWidth,
        minHeight: minHeight,
        background: "#F8FAFF",
        boxShadow: 5,
        borderRadius: "10px",
      }}
      className={`${styles.itemContainer}`}
    >
      <CardContent className={styles.itemContent}>
        <div className={styles.headerContainer}>
          <div className={styles.headTitle}>Customer Reviews</div>
          <div className={styles.arrowCont}>
            <IconButton onClick={handlePrev}>
              <ArrowBackIosIcon sx={{ width: 15 }} />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForwardIosIcon sx={{ width: 15 }} />
            </IconButton>
          </div>
        </div>
        <div className={styles.moreReview}>{reviews.length} more reviews</div>
        <div>{getReview(reviews[currentIndex])}</div>
      </CardContent>
    </Card>
  );
};

export default CustomerReview;
