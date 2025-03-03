"use client"

import { useState } from "react"
import { Box, Container, Typography, Grid, Paper, IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import RestaurantList from "@/components/restaurant-list"
import RestaurantDetail from "@/components/restaurant-detail"
import { restaurantsData } from "@/data/restaurants"

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const handleBackClick = () => {
    setSelectedRestaurant(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {selectedRestaurant && (
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurant Finder
        </Typography>
      </Box>

      <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={selectedRestaurant ? 5 : 12}>
            <RestaurantList
              restaurants={restaurantsData}
              onSelectRestaurant={setSelectedRestaurant}
              selectedRestaurant={selectedRestaurant}
            />
          </Grid>

          {selectedRestaurant && (
            <Grid item xs={12} md={7}>
              <Box sx={{ height: "100%", bgcolor: "white", borderRadius: 1, p: 2 }}>
                <RestaurantDetail restaurant={selectedRestaurant} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  )
}

