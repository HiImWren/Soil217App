import React, { Component, useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, View, TextInput, AsyncStorage, StatusBar} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, CardHeader, Button, IconRegistry} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import App,{retrieveData,saveData, deleteData} from './App';


export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    //<TopNavigationAction onPress={navigateBack}>
      <Button  style={styles.button} size='small' onPress={navigateBack}>Back</Button>
   // </TopNavigationAction>
  )
    
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight}}>
      <TopNavigation title='Recorded Observations' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DataCard></DataCard>
      </Layout>
    </SafeAreaView>
  );
  
};
const LoadAllData = async() => {
  return JSON.parse(await retrieveData());
}


export default function DataCard (){

    const [data, setDataState] = useState({observations: []});

    useEffect(() => {
      // Update the document title using the browser API
      LoadAllData().then(res => setDataState( res));
    });

    return(
      <ScrollView>
          {data.observations.map((nData,index) => (
            
            <Card key={index} footer={() => (
                <View style={styles.footerContainer}>
                    <Button style={styles.button} size='small' 
                    onPress={()=>{
                        deleteData(this,index)
                       // .then(() => LoadAllData())
                      }} status='danger'>delete</Button>
                </View>
              )} style={styles.card}>
              <CardHeader title={"Observation on "+nData.month+"/"+nData.day+"/"+nData.year+" at "+nData.hour+":"+nData.minutes}/>
              <Text>Dry Bulb:{nData.dryBulb}°C Wet Bulb:{nData.wetBulb}°C Dewpoint:{Math.round(nData.dewpoint)}°C Relative Humidity:{Math.round(nData.relHumidity)}%</Text>
            </Card>
          ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',

    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  card:{ 
   margin:10 
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  
  button: {
    //margin: 8,
    marginHorizontal: 4,
    width: 50
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  
  footerControl: {
    marginHorizontal: 4,
  },
});
