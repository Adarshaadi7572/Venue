import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
const Main = (props) => {
  const [venues, setVenues] = useState([]);
  console.log("search parameter" , props.search);
  useEffect(() => {   
  axios.get('https://eventeclipsebackend.onrender.com/api/v1/venues/get_all').then((res) => {
      console.log(res.data);
      setVenues(res.data.venues.venues);
    }).catch((error) => {
      console.log("Data fetching failed", error);
    });
  }, []);
  console.log(venues);
  return (
    <div className='mt-4'>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {venues.map((venue, index) => {
            if(props.search){
                if(props.search.toLowerCase() === venue.location.toLowerCase()) {
                  return <Grid key={index} item>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>

                          <CardMedia
                            component="img"
                            height="140"
                            image={venue.imageUrl}
                            alt="Venue Image"
                          />


                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {venue.venueName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {venue.description}
                          </Typography>
                          <Typography gutterBottom variant="body2" color="text.secondary " mt={1}>
                            <LocationOnIcon /> {venue.location}
                          </Typography>


                        <Box display="flex"
                          alignItems="center"
                          gap={10}
                          p={2}
                          mt={1}
                          sx={{ border: '2px solid grey' }}>
                          <Box display="flex"
                            alignItems="center"
                            gap={1}>
                            <PeopleIcon /> {venue.capacity}
                          </Box>
                          <Box
                            sx={{
                              width: 200,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Rating
                              name="text-feedback"
                              value={3}
                              readOnly
                              precision={0.5}
                              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />

                          </Box>
                        </Box>
                        </CardContent>
                      </CardActionArea>
                        <CardActions>
                          <Box display="flex"
                            alignItems="center"
                            gap={20} px={1}>
                            <Button variant="outlined">More</Button>
                            <Button variant="contained" color="success">
                              Book
                            </Button>
                          </Box>
                        </CardActions>
                    </Card>
                  </Grid>
               
                }
            }else{
              
             return <Grid key={index} item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                  
                      <CardMedia
                        component="img"
                        height="140"
                        image={venue.imageUrl}
                        alt="Venue Image"
                      />
                    
                  
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {venue.venueName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {venue.description}
                      </Typography>
                      <Typography gutterBottom variant="body2" color="text.secondary " mt={1}>
                        <LocationOnIcon /> {venue.location}
                      </Typography>


                    <Box display="flex"
                      alignItems="center"
                      gap={10}
                      p={2}
                      mt={1}
                      sx={{ border: '2px solid grey' }}>
                      <Box display="flex"
                        alignItems="center"
                        gap={1}>
                        <PeopleIcon /> {venue.capacity}
                      </Box>
                      <Box
                        sx={{
                          width: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Rating
                          name="text-feedback"
                          value={3}
                          readOnly
                          precision={0.5}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />

                      </Box>
                    </Box>
                    </CardContent>
                  </CardActionArea>
                    <CardActions>
                      <Box display="flex"
                        alignItems="center"
                        gap={20} px={1}>
                        <Button variant="outlined">More</Button>
                        <Button variant="contained" color="success">
                          Book
                        </Button>
                      </Box>
                    </CardActions>
                </Card>
              </Grid>
            }
    })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

}
export default Main;