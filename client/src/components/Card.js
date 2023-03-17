

import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from "axios"



export default function MediaCard({cities}) {
  
  const [place,setPlaces]=useState()
  const [image,setImages]=useState()

 
 // give your geolocation api here
  const GEOLOCATION_API="GEOLOCATION_API"
   //give your unsplash access key  api here
  const UNSPLASH_ACCESS_KEY="UNSPLASH_ACCESS_KEY"
  useEffect(() => { 
    fetchImages() 
    fetchPlaces()
   }, [])

   const fetchImages=async()=>{
    try{
      const {data}=await axios.get(`https://api.unsplash.com/photos/random?query=${cities}&client_id=${UNSPLASH_ACCESS_KEY}`)  
      console.log(data,'Imgggggggdata')
     setImages(data)
    }catch(err){
      console.log(err,'err in Img');
    }
   }

   const fetchPlaces=async()=>{
    try{
      const {data}=await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${cities}&key=${GEOLOCATION_API}`)
      console.log(data,'data')
     setPlaces(data)
    }catch(err){
      console.log(err,'err in Place');
    }
   }

  return (
    <Box display="flex"
    flexDirection="row"
    justifyContent="space-between"
    flexWrap="wrap">
    <Box p={5} >
    <Card sx={{ maxWidth: 345 }}>
      <img className='h' src={image?.links?.download} ></img>
      {/* <CardMedia
        sx={{ height: 140 }}
        image={image?.links?.download}
        title="green iguana"
      /> */}
      <CardContent>
        
      <Link to={`/map?lat=${place?.results[0].geometry.lat}&lng=${place?.results[0].geometry.lng}`}>  
        <Typography gutterBottom variant="h5" component="div" >
        {place?.results[0].components.city }
        </Typography>
        </Link>
        

        <Typography variant="body2" color="text.secondary">
        {place?.results[0].formatted}
        </Typography>
      </CardContent>
    </Card>
    </Box>
     </Box>

  );
}