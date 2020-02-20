import React, { Component, useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, View, TextInput, AsyncStorage, StatusBar, ImageBackground, Linking} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, CardHeader, Button, IconRegistry} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import App, {saveData, deleteData, retrieveData} from './App';
import cloud from './Clouds.jpg';
const backButtonIcon = (style)=>(
  <Icon name='arrow-back-outline' style={{...style}}/>
);

const DeleteIcon = (style)=>(
  <Icon name='trash-outline' fill='white' style={{...style}}/>
);

export const helpScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const OpenWebsite = () =>{
    var url = 'https://apps.cs.ndsu.edu/weathertracking/student/reports/presentweather';
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

  const BackAction = () => (
    <TopNavigationAction icon={backButtonIcon} onPress={navigateBack}>
     {/* <Button  style={styles.button} size='small' onPress={navigateBack}>Back</Button> */}
    </TopNavigationAction>
  )
    
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, marginBottom: StatusBar.currentHeight*2}}>
      <TopNavigation title='How to use this app' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <ImageBackground source={cloud} style={{height:'100%'}}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#00000000'}}>
      <ScrollView style={{width: '100%',}}>
        <Card style={styles.card}>
          <Text style={styles.helpText}>
          To begin the process of taking wet bulb measurements, you must first acquire a sling psychrometer. A sling psychrometer is an instrument that measures the temperature and wet bulb temperature of the surrounding air. Using these readings, one can then determine the dew point and relative humidity of the surrounding air. The psychrometer consists of two thermometers; a wet bulb and a dry bulb, that are each secured to a plastic backing. Next, you will take the ‘wick’ and slip it over one of the thermometers, so it is fully covering the bulb. You will then secure the wick with a rubber band.
          </Text>
          <Divider/>
          <Text style={styles.helpText}>
  Once you assemble the sling psychrometer, you want to make sure it is calibrated by taking the temperature on both bulbs at room temperature indoors. Both thermometers should read approximately 20 C˚. Next, you generously wet the wick of the wet bulb and goes outside. Once outside, you will gently swing the psychrometer in circles while periodically checking the temperature readings on each thermometer. If you swing the psychrometer too hard, the thermometers can slip out of their brackets. So, it is important to swing the instrument gently. The temperature should fall or rise (depending on the temperature outside) on both thermometers. Once the temperatures on both thermometers remain constant, you should take note of the temperature each thermometer gave and may stop swinging the psychrometer.
          </Text>
          <Divider/>
          <Text style={styles.helpText}>
  Next, you will use the measurements given on the thermometers to determine the dew point temperature and relative humidity. Dew point temperature can be described as the temperature the air must be for it to become saturated with water vapor. If it cools to less than the dew point, then the water vapor will turn into liquid water. Relative humidity can be described as the amount of water vapor present in the air versus the amount of water vapor that is needed to fully saturate the air at the current temperature. This app assumes that the atmospheric pressure is at 1000 millibars
          </Text>
          <Divider/>
          <Text style={styles.helpText}>
  You will then put the reading from the dry bulb in for the ‘Temperature/T’ value and the reading from the wet bulb in for ‘Wet-Bulb/Tw’ in the input boxes. This app will calculate the dew point and relative humidity for the readings you gathered. If the temperature readings are incorrect or inconsistent, the app will tell you. You may then tap the Log Data button; this will store the data on your phone so that you may revisit your observations later.
          </Text>
          <Divider/>
          <Text style={styles.helpText}>
  In summary, the whole procedure takes less than 10 minutes. It is a fairly simple process and the biggest challenge you will likely face, is enduring the cold for 5 minutes while taking your readings. It is a useful lesson in understanding the everyday weather around us.
          </Text>
          <Text style={styles.helpText}>
            If you are an NDSU student you may submit your observations at this website.
          </Text>
          <Button onPress={()=>{OpenWebsite()}} >NDSU Weather Submission</Button>
        </Card>
        
      </ScrollView>
      </Layout>
      </ImageBackground>
    </SafeAreaView>
  );
  
};

const LoadAllData = async() => {
  return JSON.parse(await retrieveData());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:'column',
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },

  card:{ 
   margin:10,
   paddingBottom: 50,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  
  button: {
    //margin: 8,
    marginHorizontal: 4,
    width: 100
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  
  footerControl: {
    marginHorizontal: 4,
  },

  horizontalBox:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  Box:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  BigText:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  helpText:{
    fontSize: 20,
    margin: 10,

  }


});
