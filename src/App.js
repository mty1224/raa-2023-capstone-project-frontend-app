/*
 * @Author: Ma Tingyu (tingyuma) 
 * @Date: 2023-10-27 02:58:15 
 * @Last Modified by: Ma Tingyu (tingyuma)
 * @Last Modified time: 2023-10-27 12:25:27
 */


import * as React from "react";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const listOfBrands = [
  'Amazon',
  'Amazon Fire Tv',
  'Amazon Echo',
  'Amazon Fire',
  'Amazon Basics',
  'Amazon Digital Services Inc.',
]


const listOfManufacturers = [
  'Amazon',
  'AmazonBasics',
  'Amazon Digital Services',
  'Amazon Digital Services, Inc',
  'Amazon.com',  
]


function App() {

  const [asin, setAsin] = React.useState()
  const [brand, setBrand] = React.useState()
  const [manufacturer, setManufacturer] = React.useState()
  const [categories, setCategories] = React.useState()
  const [topK, setTopK] = React.useState()

  const [recommendations, setRecommendations] = React.useState()

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeManufacturer = (event) => {
    setManufacturer(event.target.value);
  };

  const handleClickRecommendButton = async () => {
    const payload = {
      asinEntry: {
        brand,
        manufacturer,
        categories,
      },
      topK,
    }
    console.log(payload)

    const response = await fetch('http://10.2.42.236:5000/recommender-system', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    console.log(data)

    setRecommendations(JSON.stringify(data.data))
  }

  React.useEffect(() => {
    console.log(categories)
  }, [categories])

  const inputPanel = (
    <React.Fragment>
      
      <Item>
        <TextField
          required
          id="outlined-required"
          label="ASIN"
          fullWidth={true}
          value={asin}
          onChange={e => setAsin(e.target.value) }
        />
      </Item>

      <Item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={brand}
            label="Age"
            onChange={handleChangeBrand}
            sx={{textAlign: 'left'}}
          >
            {
              listOfBrands.map((brand, idx) => {
                return (
                  <MenuItem key={idx+1} value={brand}>{brand}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Item>
      
      <Item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Manufacter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manufacturer}
            label="Manufacter"
            onChange={handleChangeManufacturer}
            sx={{textAlign: 'left'}}
          >
            {
              listOfManufacturers.map((manufacturer, idx) => {
                return (
                  <MenuItem key={idx+1} value={manufacturer}>{manufacturer}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Item>

      <Item>
        <TextField
          required
          id="outlined-required"
          label="Categories"
          multiline
          rows={10}
          fullWidth={true}
          value={categories}
          onChange={e => setCategories(e.target.value)}
        />
      </Item>

      <Item>
        <TextField
          required
          id="outlined-required"
          label="Top K"
          fullWidth={true}
          value={topK}
          onChange={e => setTopK(e.target.value) }
        />
      </Item>

      <Item>
        <Button variant="contained" onClick={handleClickRecommendButton}>Recommend</Button>
      </Item>

    </React.Fragment>
  )

  const outputPanel = (
    <React.Fragment>
      <Item>
        <TextField
          required
          id="outlined-required"
          label="Recommendations"
          multiline
          rows={25}
          fullWidth={true}
          value={recommendations}
          onChange={ e => {} }
        />
      </Item>
    </React.Fragment>
  )

  const m = (
    <React.Fragment>

      <CssBaseline />
      
      <Container maxWidth="l">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
        
          <Grid container spacing={1} padding={5}>

            <Grid xs={12}>
              <Item sx={{maxHeight: '8vh'}}>
                <Typography variant="h4" gutterBottom>
                  Amazon Product Recommender System
                </Typography>
              </Item>
            </Grid>

            <Grid xs={4}>
              <Item>
                <Container sx={{height: '75vh', minHeight: '75vh'}}>
                  <Stack spacing={1}>
                    {inputPanel}
                  </Stack>
                </Container>
              </Item>
            </Grid>

            <Grid xs={8}>
              <Item>
                <Container sx={{height: '75vh', minHeight: '75vh'}}>
                  <Stack spacing={2}>
                    {outputPanel}
                  </Stack>
                </Container>
              </Item>
            </Grid>
            
          </Grid>
        </Box>
      </Container>


    </React.Fragment>
  )

  return m;

}

export default App;
