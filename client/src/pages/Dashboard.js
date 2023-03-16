
import React,{useState} from 'react'
import MediaCard from '../components/Card'
import ResponsiveAppBar from '../components/Navbar'

export default function Dashboard() {
  const [cities,setCities] = useState(["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Jaipur", "Lucknow", "Pune"])
  return (
    <>
    <ResponsiveAppBar/>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
    {cities?.map((city)=>(
         <MediaCard key={city} cities={city} />      
    ))     
    } 
    </div>
    </>  
  )
}


