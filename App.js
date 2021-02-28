
import React, { useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
export default function App() {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(60.200692);
  const [lng, setLng] = useState(24.934302);
  const [places, setPlaces] = useState([]);
 
  async function getGeo () {
    const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+address+'&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyC2dTdfCw-iSRIYCrWL6qzENKaE68jEzac';
    
    try{
      const response = await fetch(url);
      const data = await response.json();
      setLat(data.candidates[0].geometry.location.lat)
      setLng(data.candidates[0].geometry.location.lng)
    }
    catch (error) {
    setPlace('Error', error);
    };
  }

  async function getRestaurant () {
    getGeo();
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&radius=1500&type=restaurant&key=AIzaSyC2dTdfCw-iSRIYCrWL6qzENKaE68jEzac'
    console.log(url)
    try{
      const response = await fetch(url);
      const data = await response.json();
      setPlaces(data.results)
      
    }
    catch(error) {
      setPlaces('Error', error);
   
    };
  }
     
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: "bold"}}>Restaurant-Finder{"\n"}</Text>
      <Text>
        1. Type an address{"\n"}
        2. Click on a Marker to see restaurant info{"\n"}
      </Text>
      <MapView style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0322,
        longitudeDelta:0.0221,}} >
        {places.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.geometry.location.lat, 
            longitude: marker.geometry.location.lng}}
            title={marker.name}
            description={marker.vicinity}
        />
        ))}
      </MapView>
            <TextInput style={styles.input} value={address} placeholder="Type your address here" onChangeText={address => setAddress(address)}></TextInput>
            <Button style={styles.button} title="SHOW" onPress={getRestaurant}></Button>
        </ View>
);}
        

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  map: {
    width: 400,
    height: 400,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    height: 40, 
    width: 400
  },
  button: {
    alignSelf: 'stretch'
  }
});
