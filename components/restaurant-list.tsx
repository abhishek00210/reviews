"use client"
import { useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantListProps {
  restaurants: Restaurant[]
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedRestaurant: Restaurant | null
}

export default function RestaurantList({ restaurants, onSelectRestaurant, selectedRestaurant }: RestaurantListProps) {
  const [sortBy, setSortBy] = useState("best_match")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value)
  }

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (sortBy === "best_match") {
      return 0
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "price_low") {
      return a.priceRange[0] - b.priceRange[0]
    } else if (sortBy === "price_high") {
      return b.priceRange[0] - a.priceRange[0]
    }
    return 0
  })

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <FormControl
          size="small"
          sx={{
            minWidth: "100%",
            ".MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "white",
            },
          }}
        >
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select labelId="sort-label" value={sortBy} label="Sort by" onChange={handleSortChange}>
            <MenuItem value="best_match">Best match</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
            <MenuItem value="price_high">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 0,
          ".MuiListItem-root": {
            px: 2,
            py: 1.5,
          },
        }}
      >
        {sortedRestaurants.map((restaurant) => (
          <Box key={restaurant.id}>
            <ListItem
              alignItems="flex-start"
              component="div"
              onClick={() => onSelectRestaurant(restaurant)}
              selected={selectedRestaurant?.id === restaurant.id}
              sx={{
                cursor: "pointer",
                "&.Mui-selected": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                  },
                },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 80, mr: 2 }}>
                <Avatar
                  variant="rounded"
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "8px",
                  }}
                />
              </ListItemAvatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    mb: 0.5,
                    color: "#000",
                  }}
                >
                  {restaurant.name}
                </Typography>
                <Box sx={{ color: "text.secondary" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.primary",
                        mr: 0.5,
                      }}
                    >
                      {restaurant.rating}
                    </Typography>
                    <Rating
                      value={restaurant.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{
                        fontSize: "1rem",
                        color: "#f5a623",
                      }}
                    />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                      }}
                    >
                      ({restaurant.reviewCount})
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                      }}
                    >
                      • ₹{restaurant.priceRange[0]}–{restaurant.priceRange[1]}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                      }}
                    >
                      • {restaurant.cuisine}
                    </Typography>
                  </Box>
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{
                      fontSize: "0.875rem",
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    {restaurant.distance} m • {restaurant.address}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {restaurant.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          height: "24px",
                          bgcolor: "rgba(0, 0, 0, 0.05)",
                          color: "text.secondary",
                          "& .MuiChip-label": {
                            px: 1,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Box>
  )
}

