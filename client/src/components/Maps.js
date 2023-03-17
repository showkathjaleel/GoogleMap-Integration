import React,{useEffect,useState} from 'react'
import {useLocation} from "react-router-dom";
import {MapContainer,Marker,Popup,TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet'


const icon=L.icon({
    iconUrl:"./placeholder.png",
    iconSize:[38,38]
})


export default function Maps() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get('lat');
  const lng = params.get('lng');
   const position = [lat,lng]
    
  return (
    <MapContainer 
    center={position}
     zoom={13} style={{width:'100%',height:"100%"}}
     >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=fPCiA9vVBOKWbp6qEw4x"
    />
    <Marker
     position={position} 
     icon={icon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  );
}



