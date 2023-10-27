/*
 * @Author: Ma Tingyu (tingyuma) 
 * @Date: 2023-10-27 02:58:15 
 * @Last Modified by: Ma Tingyu (tingyuma)
 * @Last Modified time: 2023-10-27 05:46:16
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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '70vh',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'left',
}));


function App() {

  const [asin, setAsin] = React.useState()
  const [brand, setBrand] = React.useState()
  const [manufacturer, setManufacturer] = React.useState()
  const [categories, setCategories] = React.useState()

  const [recommendations, setRecommendations] = React.useState()

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeManufacturer = (event) => {
    setManufacturer(event.target.value);
  };

  const inputPanel = (
    <React.Fragment>
      
      <Item>
        <TextField
          required
          id="outlined-required"
          label="ASIN"
          fullWidth={true}
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
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Item>

      <Item>
        <TextField
          required
          id="outlined-required"
          label="Categories"
          multiline
          rows={15}
          fullWidth={true}
        />
      </Item>


    </React.Fragment>
  )

  const outputPanel = (
    <React.Fragment>
      <Item>
        <DemoPaper square={false}>
          {recommendations}
        </DemoPaper>
      </Item>
    </React.Fragment>
  )

  const m = (
    <React.Fragment>

      <CssBaseline />
      
      <Container maxWidth="l">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
        
          <Grid container spacing={2} padding={5}>

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
                  <Stack spacing={2}>
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
