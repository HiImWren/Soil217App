import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, View, TextInput, AsyncStorage} from 'react-native';
import { ApplicationProvider, Layout, Text, Input , Card, CardHeader, Button,IconRegistry} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation.component';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>Soil 217 Companion</Text>
  </Layout>
);



export const deleteData = async () => {
  await AsyncStorage.removeItem("LoggedData");
}

export const saveData = async (savingData, dryBulb, wetBulb, dewpoint, relHumidity) => {
  
  console.log(savingData);
  var lData = JSON.parse(savingData);
  var data = {"dryBulb":dryBulb,"wetBulb":wetBulb,"dewpoint":dewpoint,"relHumidity":relHumidity};
  lData.observations.push(data);
  console.log(JSON.stringify(savingData));  
  await AsyncStorage.setItem('LoggedData',JSON.stringify(lData));


}

export const retrieveData = async () => {
  // try {
  const loadedData = await AsyncStorage.getItem('LoggedData');

  var resObject = "";
  //setTestData(loadedData);
  if(loadedData !== null){
      //lets parse this json 
      
      console.log("Found data");
      resObject = loadedData

      
  }else{

      console.log("Creating new data");
      resObject = '{"observations":[]}';
      //We don't have any data so lets create some
  }
  return (resObject);
  // }catch{

  // }
}

export default function App() {

    

  

  


  return (

    <React.Fragment>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
    
      <AppNavigator></AppNavigator>

    </ApplicationProvider>
    </React.Fragment>
  );
}