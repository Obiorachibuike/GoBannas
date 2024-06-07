// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  InputAdornment,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { styled } from '@mui/system';

// Example API URL
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Styled component for Card with hover effect
const HoverCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function using axios
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle search input and filter data
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            GoBananas
          </Typography>
          <SearchIcon />
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4} mb={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={3}>
          {filteredData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <HoverCard>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {item.email}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item.phone}
                  </Typography>
                </CardContent>
              </HoverCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
