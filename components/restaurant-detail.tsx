"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Typography,
  Rating,
  Divider,
  Button,
  Chip,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Tab,
  Tabs,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ShareIcon from "@mui/icons-material/Share"
import CallIcon from "@mui/icons-material/Call"
import DirectionsIcon from "@mui/icons-material/Directions"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import type { Restaurant, Review } from "@/types/restaurant"

interface RestaurantDetailProps {
  restaurant: Restaurant
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`restaurant-tabpanel-${index}`}
      aria-labelledby={`restaurant-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const [openReviewDialog, setOpenReviewDialog] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState<number | null>(5)
  const [reviews, setReviews] = useState<Review[]>(restaurant.reviews)
  const [tabValue, setTabValue] = useState(2) // Default to Reviews tab

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true)
  }

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false)
  }

  const handleSubmitReview = () => {
    if (reviewText && reviewRating) {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        userName: "You",
        userInitial: "Y",
        rating: reviewRating,
        text: reviewText,
        date: new Date().toISOString(),
      }

      setReviews([newReview, ...reviews])
      setReviewText("")
      setReviewRating(5)
      setOpenReviewDialog(false)
    }
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 1-5 stars
  reviews.forEach((review) => {
    const ratingIndex = Math.floor(review.rating) - 1
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingCounts[ratingIndex]++
    }
  })

  // Calculate percentages for progress bars
  const totalReviews = reviews.length
  const ratingPercentages = ratingCounts.map((count) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0))

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" component="h2">
          {restaurant.name}
        </Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" component="span" sx={{ mr: 1 }}>
          {restaurant.rating}
        </Typography>
        <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({restaurant.reviewCount})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
          • ₹{restaurant.priceRange[0]}–{restaurant.priceRange[1]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • {restaurant.cuisine}
        </Typography>
      </Box>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {restaurant.images.slice(0, 4).map((image, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper
              sx={{
                height: 100,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 1,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button startIcon={<DirectionsIcon />} variant="outlined" size="small">
          Directions
        </Button>
        <Button startIcon={<BookmarkBorderIcon />} variant="outlined" size="small">
          Save
        </Button>
        <Button startIcon={<ShareIcon />} variant="outlined" size="small">
          Share
        </Button>
        <Button startIcon={<CallIcon />} variant="outlined" size="small">
          Call
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="restaurant tabs" variant="fullWidth">
          <Tab label="Overview" id="restaurant-tab-0" />
          <Tab label="Menu" id="restaurant-tab-1" />
          <Tab label="Reviews" id="restaurant-tab-2" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Service options:
          </Typography>
          <Box sx={{ mb: 2 }}>
            {restaurant.features.map((feature, index) => (
              <Chip key={index} label={feature} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Located in:
          </Typography>
          <Typography variant="body2" component="div" sx={{ mb: 2 }}>
            {restaurant.location}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Address:
          </Typography>
          <Typography variant="body2" component="div" sx={{ mb: 2 }}>
            {restaurant.address}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Hours:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Chip color="success" size="small" label={restaurant.isOpen ? "Open now" : "Closed"} sx={{ mr: 1 }} />
            <Typography variant="body2" component="span">
              {restaurant.hours}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Phone:
            </Typography>
            <Typography variant="body2" component="div">
              {restaurant.phone}
            </Typography>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="body1">Menu information is not available in this demo.</Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Review summary
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Box key={rating} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ minWidth: 10, mr: 1 }}>
                    {rating}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={ratingPercentages[rating - 1]}
                    sx={{
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 1,
                      backgroundColor: "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: rating >= 4 ? "#f5a623" : "#999",
                      },
                    }}
                  />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h3" component="div">
                  {restaurant.rating.toFixed(1)}
                </Typography>
                <Rating value={restaurant.rating} precision={0.1} readOnly />
                <Typography variant="body2" component="div" color="text.secondary">
                  {reviews.length} reviews
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Button variant="contained" color="primary" fullWidth onClick={handleOpenReviewDialog} sx={{ mb: 3 }}>
          Write a review
        </Button>

        <Divider sx={{ mb: 2 }} />

        <Box>
          {reviews.map((review) => (
            <Card key={review.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>{review.userInitial}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" component="div">
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly />
                  </Box>
                </Box>
                <Typography variant="body2" component="div" color="text.secondary" sx={{ mb: 2 }}>
                  {review.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Write a Review
          <IconButton
            aria-label="close"
            onClick={handleCloseReviewDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Rate your experience
            </Typography>
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                setReviewRating(newValue)
              }}
              size="large"
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Your review"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            color="primary"
            disabled={!reviewText || !reviewRating}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

