import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import Establishment from './components/Establishment'
import NearestCoffees from './components/NearestCoffees'

import EstablishmentsService from './services/establishments_service'

function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [location, setLocation] = useState([])
  const [selected, setSelected] = useState({})

  const { REACT_APP_GOOGLE_API_KEY } = process.env

  useEffect(() => {
    setCurrentLocation()
  }, [])

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      loadCoffeeShops()
    }, function(error){
      alert('Habilite a localização para usar esse APP')
    })
  }

  async function loadCoffeeShops() {
    const response = await EstablishmentsService.index(latitude, longitude)
    setLocation(response.data.results)
  }

  return (
    <>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={{height: '100vh', width: '100%'}}
          zoom={15}
          center={{lat: latitude, lng: longitude}}
        >
          {
            location.map((item, index) => {
              return (
                <Marker key={index} icon="/images/coffee-pin.png" title={item.name} animation="4" 
                  position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Establishment place={selected} />
            )
          }
          <Marker key="my location" icon="/images/my-location-pin.png" title="Seu local" animation="2"
            position={{lat: latitude, lng: longitude}}
          />

          {(latitude !== 0 && longitude !== 0) && 
            <NearestCoffees latitude={latitude} longitude={longitude} />
          }

        </GoogleMap>
      </LoadScript>      
    </>
  );
}

export default App;
