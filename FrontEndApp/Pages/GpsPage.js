import React,{createContext, useEffect,useState} from 'react'
import {View, Dimensions,StyleSheet} from 'react-native';
import { Button,Switch,TextInput, Checkbox } from 'react-native-paper';
import MapView,{ Marker} from 'react-native-maps';
import axios from "./axios";

let i=0;

export default function GpsPage() {
  const [coordinates, setCoordinates] = useState({latitude:32.221221,
                                                   longitude:35.260680});



useEffect(() => {
  setTimeout(() => {
  axios()
  .get("/gps")
  .then((response) => {
        setCoordinates({latitude:response.data.latitude,
                    longitude:response.data.longitude})
    // setCoordinates({latitude:32.221221,
    //                 longitude:35.260680})
     console.log(response.data.latitude)
    console.log(response.data.longitude)


  })
  .catch((error) => {
    console.log(error)
    if(!error.response)
  return

});

  }, 5000);

  return () => {

  };},[coordinates]);


  return (

   <View>
        
        <MapView
       
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
    initialRegion={{
      latitude:32.221221,
      longitude: 35.260680,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
     <Marker
  coordinate={{ latitude : coordinates.latitude , longitude : coordinates.longitude}}

/>

  </MapView>
   </View>
  );
}
const style = StyleSheet

