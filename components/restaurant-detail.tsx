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
  useMediaQuery,
  useTheme,
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
      {value === index && <Box sx={{ p: { xs: 1.5, sm: 3 } }}>{children}</Box>}
    </div>
  )
}

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const [openReviewDialog, setOpenReviewDialog] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState<number | null>(5)
  const [reviews, setReviews] = useState<Review[]>(restaurant.reviews)
  const [tabValue, setTabValue] = useState(2) // Default to Reviews tab
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px: isMobile ? 1 : 0,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "80%",
          }}
        >
          {restaurant.name}
        </Typography>
        <IconButton size={isMobile ? "small" : "medium"}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          flexWrap: isMobile ? "wrap" : "nowrap",
          px: isMobile ? 1 : 0,
        }}
      >
        <Typography variant="h6" component="span" sx={{ mr: 1, fontSize: isMobile ? "1rem" : "1.25rem" }}>
          {restaurant.rating}
        </Typography>
        <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
        <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 1 }}>
          ({restaurant.reviewCount})
        </Typography>
        <Typography variant="body2" component="span" color="text.secondary" sx={{ mx: 1 }}>
          • ₹{restaurant.priceRange[0]}–{restaurant.priceRange[1]}
        </Typography>
        <Typography variant="body2" component="span" color="text.secondary">
          • {restaurant.cuisine}
        </Typography>
      </Box>

      <Grid container spacing={1} sx={{ mb: 2, px: isMobile ? 0.5 : 0 }}>
        {restaurant.images.slice(0, 4).map((image, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper
              sx={{
                height: 80,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 1,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "space-around" : "space-between",
          mb: 2,
          px: isMobile ? 0.5 : 0,
          flexWrap: isMobile ? "wrap" : "nowrap",
          gap: isMobile ? 1 : 0,
        }}
      >
        {isMobile ? (
          <>
            <Button startIcon={<DirectionsIcon />} variant="outlined" size="small" sx={{ minWidth: 0, px: 1 }}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Directions
              </Box>
            </Button>
            <Button startIcon={<BookmarkBorderIcon />} variant="outlined" size="small" sx={{ minWidth: 0, px: 1 }}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Save
              </Box>
            </Button>
            <Button startIcon={<ShareIcon />} variant="outlined" size="small" sx={{ minWidth: 0, px: 1 }}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Share
              </Box>
            </Button>
            <Button startIcon={<CallIcon />} variant="outlined" size="small" sx={{ minWidth: 0, px: 1 }}>
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Call
              </Box>
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="restaurant tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontSize: isMobile ? "0.75rem" : "0.875rem",
              px: isMobile ? 1 : 2,
            },
          }}
        >
          <Tab label="Overview" id="restaurant-tab-0" />
          <Tab label="Menu" id="restaurant-tab-1" />
          <Tab label="Reviews" id="restaurant-tab-2" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            Service options:
          </Typography>
          <Box sx={{ mb: 2 }}>
            {restaurant.features.map((feature, index) => (
              <Chip key={index} label={feature} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
          </Box>

          <Typography variant="subtitle1" component="h3" gutterBottom>
            Located in:
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{
              mb: 2,
              wordBreak: "break-word",
            }}
          >
            {restaurant.location}
          </Typography>

          <Typography variant="subtitle1" component="h3" gutterBottom>
            Address:
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{
              mb: 2,
              wordBreak: "break-word",
            }}
          >
            {restaurant.address}
          </Typography>

          <Typography variant="subtitle1" component="h3" gutterBottom>
            Hours:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Chip color="success" size="small" label={restaurant.isOpen ? "Open now" : "Closed"} sx={{ mr: 1 }} />
            <Typography variant="body2" component="span">
              {restaurant.hours}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" component="h3" gutterBottom>
              Phone:
            </Typography>
            <Typography variant="body2" component="div">
              {restaurant.phone}
            </Typography>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="body1" component="div">
          Menu information is not available in this demo.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}>
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
                  py: isMobile ? 2 : 0,
                }}
              >
                <Typography variant="h3" component="div" sx={{ fontSize: isMobile ? "2.5rem" : "3rem" }}>
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
              <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 36, height: 36 }}>{review.userInitial}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" component="div" sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                      {review.userName}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {review.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog} maxWidth="sm" fullWidth fullScreen={isMobile}>
        <DialogTitle sx={{ pr: 6, fontSize: isMobile ? "1.1rem" : "1.25rem" }}>
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
            <Typography variant="subtitle1" component="div" gutterBottom>
              Rate your experience
            </Typography>
            <Rating
              name="review-rating"
              value={reviewRating}
              onChange={(event, newValue) => {
                setReviewRating(newValue)
              }}
              size={isMobile ? "medium" : "large"}
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
        <DialogActions sx={{ p: 2 }}>
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

