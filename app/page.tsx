"use client"

import { useState } from "react"
import { Box, Container, Typography, Grid, Paper, IconButton, useMediaQuery, useTheme } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import RestaurantList from "@/components/restaurant-list"
import RestaurantDetail from "@/components/restaurant-detail"
import { restaurantsData } from "@/data/restaurants"

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleBackClick = () => {
    setSelectedRestaurant(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2, px: isMobile ? 1 : 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {selectedRestaurant && (
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: isMobile ? "1.5rem" : "2.125rem",
            mb: 0,
          }}
        >
          Restaurant Finder
        </Typography>
      </Box>

      <Paper sx={{ p: isMobile ? 1 : 2, bgcolor: "#f5f5f5" }}>
        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid
            item
            xs={12}
            md={selectedRestaurant ? 5 : 12}
            sx={{
              display: selectedRestaurant && isMobile ? "none" : "block",
            }}
          >
            <RestaurantList
              restaurants={restaurantsData}
              onSelectRestaurant={setSelectedRestaurant}
              selectedRestaurant={selectedRestaurant}
            />
          </Grid>

          {selectedRestaurant && (
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "white",
                  borderRadius: 1,
                  p: isMobile ? 1 : 2,
                  overflow: "auto",
                }}
              >
                <RestaurantDetail restaurant={selectedRestaurant} />
              </Box>
              {isMobile && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <IconButton
                    onClick={handleBackClick}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  )
}

