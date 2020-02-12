import React, { Component, useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, View, TextInput, AsyncStorage, StatusBar} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, CardHeader, Button, IconRegistry} from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import App,{retrieveData,saveData, deleteData} from './App';

const BackIcon = (style) => (
  <Text>Back</Text>
);


export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>

  )
  
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight}}>
      <TopNavigation title='MyApp' alignment='center' leftControl={BackAction()}/>
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


export class DataCard extends Component{


    constructor (props){
      super(props);
      this.state = {data: null}
    }

    componentDidMount(){
      LoadAllData().then(res => this.setState({data: res}))
    }

    render(){


      if(this.state.data!=null){
        if(true){
          return(
            <ScrollView>
                {this.state.data.observations.map((nData,index) => (
                  
                  <Card key={index} footer={() => (
                      <View style={styles.footerContainer}>
                          <Button style={styles.button} size='small' onPress={()=>{deleteData(this,index).then(() => LoadAllData().then(res=> this.setState({data: res})))}} status='danger'>delete</Button>
                      </View>
                    )} style={styles.card}>
                    <CardHeader title={"Observation on "+nData.month+"/"+nData.day+"/"+nData.year+" at "+nData.hour+":"+nData.minutes}/>
                    <Text>Dry Bulb:{nData.dryBulb}°C Wet Bulb:{nData.wetBulb}°C Dewpoint:{Math.round(nData.dewpoint)}°C Relative Humidity:{Math.round(nData.relHumidity)}%</Text>
                  </Card>
                ))}
              </ScrollView>
          );
        }
      }else{
        return null;
      }
    }
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
