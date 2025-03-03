"use client"
import { useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemText,
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
} from "@mui/material"
import type { Restaurant } from "@/types/restaurant"
import React from "react"

interface RestaurantListProps {
  restaurants: Restaurant[]
  onSelectRestaurant: (restaurant: Restaurant) => void
  selectedRestaurant: Restaurant | null
}

export default function RestaurantList({ restaurants, onSelectRestaurant, selectedRestaurant }: RestaurantListProps) {
  const [sortBy, setSortBy] = useState("best_match")

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value)
  }

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    if (sortBy === "best_match") {
      return 0 // Keep original order
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select labelId="sort-label" value={sortBy} label="Sort by" onChange={handleSortChange}>
            <MenuItem value="best_match">Best match</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
            <MenuItem value="price_high">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
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
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  sx={{ width: 80, height: 80, mr: 1 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="body2" component="span" sx={{ mr: 1 }}>
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
                      <Typography variant="body2" component="span" color="text.secondary" sx={{ display: "block" }}>
                        {restaurant.distance} m • {restaurant.address}
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {restaurant.features.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5, fontSize: "0.7rem" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </Box>
  )
}

