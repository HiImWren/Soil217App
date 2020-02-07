import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});



const a = 6.112
const b = 17.67
const c = 243.5

export default function App() {

  const [wetBulb, setWetBulb] = useState(0);//: 0,
  const [dryBulb, setDryBulb] = useState(0); //: 0,
  const [dewpoint, setDewPoint] = useState(0);//: 0,
  const [relHumidity, setRelHumidity] = useState(0);//: 0,
  const [pressure, setPressure] = useState(1000);//: 1000,
  const [testData,setTestData] = useState("");
  // this.state = {
  //   wetBulb: 0,
  //   dryBulb: 0,
  //   dewpoint: 0,
  //   relHumidity: 0,
  //   pressure: 1000,
  // };

  function onChangeDry(text) {

    setDryBulb( parseFloat(text) );
    // calculateResults();
  
  }

  function onChangeWet(text) {
    setWetBulb( parseFloat(text) );
    // calculateResults();
  }
  
  function calculateResults() {
   
    var Es = a * Math.exp(((b * dryBulb) / (dryBulb + c)));
    var Esw = a * Math.exp((b * wetBulb) / (wetBulb + c));
    var Ea = Esw - (pressure*(dryBulb-wetBulb)*0.00066*(1+(0.00115*wetBulb)));
    setRelHumidity((Ea/Es)*100);
    setDewPoint((c*Math.log(Ea/a))/((b - Math.log(Ea/a))));
   
  }

  const saveData = async (savingData) => {
    try{
      var data = {"dryBulb":dryBulb,"wetBulb":wetBulb,"dewpoint":dewpoint,"relHumidity":relHumidity};

     
      savingData.observations.push(data);
      console.log(JSON.stringify(savingData));  
      setTestData(JSON.stringify(savingData));
      await AsyncStorage.setItem('LoggedData',JSON.stringify(savingData));

    }catch(error){

    }
  }

  const retrieveData = async () => {
    // try {
      const loadedData = await AsyncStorage.getItem('LoggedData');

      console.log(await AsyncStorage.getAllKeys());
      var resObject;
      //setTestData(loadedData);
      if(loadedData !== null){
        //lets parse this json 
        
        console.log("Found data");
        resObject = JSON.parse(loadedData);

        
      }else{

        console.log("Creating new data");
        resObject = {"observations":[]};
        //We don't have any data so lets create some
      }
      saveData(resObject);
    // }catch{

    // }

  }
  
  const deleteData = async () => {
    await AsyncStorage.removeItem("LoggedData");
  }

  
  useEffect(() => calculateResults(),[dryBulb,wetBulb])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Dry Bulb Temperature</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeDry(text)}
        keyboardType={"number-pad"}

      />
      <Text style={styles.welcome}>Wet Bulb Temperature</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeWet(text)}
        keyboardType={"number-pad"}
      />
      <Text style={styles.welcome}>Dew Point Temperature</Text>
      <Text style={styles.welcome}>{Math.round(dewpoint.toPrecision(1))}*C</Text>
      <Text style={styles.welcome}>Relative Humidity</Text>
      <Text style={styles.welcome}>{Math.round(relHumidity)}%</Text>
      <Button title="Log Data!" onPress={()=>{retrieveData()}}/>
      <Button title="Delete" onPress={()=>{deleteData()}}/>
      <Text style={styles.welcome}>{testData}</Text>
    </View>

  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
