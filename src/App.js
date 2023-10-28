/*
 * @Author: Ma Tingyu (tingyuma) 
 * @Date: 2023-10-27 02:58:15 
 * @Last Modified by: Ma Tingyu (tingyuma)
 * @Last Modified time: 2023-10-28 00:45:06
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


const asinEntries = [
  {
    asin: "B00QL1ZN3G",
    brand: "amazon",
    categories: "case,kindle_store,amazon_device_accessory,accessory,tablet_accessory",
    manufacturer: "amazon"
  },
  {
    asin: "B00U3FPN4U",
    brand: "amazon_fire_tv",
    categories: "back_college,college_electronics,college_tv_home_theater,electronics,tv_home_theater,streaming_device,featured_brand,amazon_device,holiday_shop,way_shop,tv_home_theater,streaming_medium_player,streaming_medium_player,tv_entertainment,video_game,kindle_store,electronics_feature,kid_family,fire_tv",
    manufacturer: "amazon",
  }
]


function App() {

  const [selectedAsinEntry, setSelectedAsinEntry] = React.useState()
  const [selectedAsinInfo, setSelectedAsinInfo] = React.useState()

  const [review, setReview] = React.useState()

  const [recommendations, setRecommendations] = React.useState()
  const [outputInfo, setOutputInfo] = React.useState()

  const handleChangeASIN = (event) => {
    const selectedAsin = event.target.value
    const asinEntry = asinEntries.filter(entry => entry.asin === selectedAsin)[0]
    setSelectedAsinEntry(asinEntry)
  }

  const handleClickRecommendButton = async () => {
    const payload = {
      asinEntry: {
        brand: selectedAsinEntry?.brand,
        manufacturer: selectedAsinEntry?.manufacturer,
        categories: selectedAsinEntry?.categories,
      },
      textData: [review],
      topK: 3,
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

    setRecommendations(data.data)
  }

  React.useEffect(() => {
    console.log(selectedAsinEntry)
    if (selectedAsinEntry?.asin) {
      const asinInfo = 'Brand: ' + selectedAsinEntry?.brand + '\n' + 'Manufacturer: ' + selectedAsinEntry?.manufacturer + '\n' + 'Categories: \n' + selectedAsinEntry?.categories
      setSelectedAsinInfo(asinInfo)
      console.log(asinInfo)
    }
  }, [selectedAsinEntry])

  React.useEffect(() => {
    console.log(recommendations)
    if (recommendations) {
      let o = []
      recommendations.map((e, _) => {
        o.push(`ASIN: ${e['asin']}`)
        o.push(`brand: ${e['brand']}`)
        o.push(`manufacturer: ${e['manufacturer']}`)
        o.push(`categories: ${e['categories']}`)
        if (e['cosineSimilarityScore']){
          o.push(`cosineSimilarityScore: ${e['cosineSimilarityScore']}`)
        }
        o.push('\n')
      })
      setOutputInfo(o.join('\n'))
    } else {
      setOutputInfo()
    }
  }, [recommendations])

  const inputPanel = (
    <React.Fragment>
      
      <Item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">ASIN</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={selectedAsinEntry?.asin}
            label="ASIN"
            onChange={handleChangeASIN}
            sx={{textAlign: 'left'}}
          >
            {
              asinEntries.map((entry, idx) => {
                return (
                  <MenuItem key={idx+1} value={entry?.asin}>{entry?.asin}</MenuItem>
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
          // label="Categories"
          multiline
          rows={10}
          fullWidth={true}
          value={selectedAsinInfo}
          onChange={e => {}}
        />
      </Item>

      <Item>
        <TextField
          required
          id="outlined-required"
          label="Review"
          fullWidth={true}
          defaultValue={review}
          multiline
          rows={5}
          onChange={e => {setReview(e.target.value)}}
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
          // label="Recommendations"
          multiline
          rows={25}
          fullWidth={true}
          value={outputInfo}
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
