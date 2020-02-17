import React, { Component, useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, View, TextInput, AsyncStorage, StatusBar, ImageBackground} from 'react-native';
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

export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={backButtonIcon} onPress={navigateBack}>
     {/* <Button  style={styles.button} size='small' onPress={navigateBack}>Back</Button> */}
    </TopNavigationAction>
  )
    
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight}}>
      <TopNavigation title='Recorded Observations' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <ImageBackground source={cloud} style={{height:'100%'}}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#00000000', }}>
        <DataCard></DataCard>
      </Layout>
      </ImageBackground>
    </SafeAreaView>
  );
  
};

const LoadAllData = async() => {
  return JSON.parse(await retrieveData());
}


export default function DataCard (){

    const [ isLoading, setIsLoading ] = useState(false);
    const [data, setDataState] = useState({observations: []});

    useEffect(() => {
      // Update the document title using the browser API
      //LoadAllData().then(res => setDataState( res));

      async function fetchData() {
        setIsLoading(true)
        const loadedData = await LoadAllData();
        setDataState(loadedData);
        setIsLoading(false);
      }
      fetchData();
    }, []);

    if(isLoading)
    {
      return  <Text>Loading....</Text>
    }

    return(
      
      <ScrollView style={{width: '100%', marginBottom:StatusBar.currentHeight}}>
          {data.observations.map((nData,index) => (
            
            <Card key={index} footer={() => (
                <View style={styles.footerContainer}>
                    <Button style={styles.button} 
                    onPress={()=>{
                        deleteData(this, index, setDataState);
                       // .then(() => LoadAllData())
                      }} status='danger' icon={DeleteIcon}>Delete</Button>
                </View>
              )} style={styles.card}>
              <CardHeader title={"Observation on "+nData.month+"/"+nData.day+"/"+nData.year+" at "+nData.hour+":"+nData.minutes}/>
              <Layout style={styles.horizontalBox}>
                <Layout style={styles.Box}> 
                  <Text style={{textAlign: 'center', fontSize: 10}}>Dry Bulb</Text>
                  <Text style={styles.BigText}>{nData.dryBulb}°C</Text>
                </Layout>
                <Layout style={styles.Box}> 
                  <Text style={{textAlign: 'center', fontSize: 10}}>Wet Bulb</Text>
                  <Text style={styles.BigText}>{nData.wetBulb}°C</Text>
                </Layout>
                <Layout style={styles.Box}> 
                  <Text style={{textAlign: 'center', fontSize: 10}}>Dewpoint</Text>
                  <Text style={styles.BigText}>{Math.round(nData.dewpoint*10)/10}°C</Text>
                </Layout>
                <Layout style={styles.Box}> 
                  <Text style={{textAlign: 'center', fontSize: 10}}>Rel. Humidity</Text>
                  <Text style={styles.BigText}>{Math.round(nData.relHumidity)}%</Text>
                </Layout>
              </Layout>
            </Card>
          ))}
        </ScrollView>
    );
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
  }
});
