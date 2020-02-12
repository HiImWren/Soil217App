import React, { Component, useState} from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, View, TextInput, AsyncStorage} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, CardHeader, Button, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ScrollView } from 'react-native-gesture-handler';
import App,{retrieveData,saveData, deleteData} from './App';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);


export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>

  )
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <ScrollView>
        <DataCard></DataCard>
        </ScrollView>
    
        
        
        
        

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
            <div>
              {this.state.data.observations.map((nData,index) => (
                
                <Card key={index}>
                  <IconRegistry icons={EvaIconsPack}/>
                  <CardHeader title={"Observation on "+nData.month+"/"+nData.day+"/"+nData.year+" at "+nData.hour+":"+nData.minutes}/>
                  <Text>Dry Bulb:{nData.dryBulb}°C Wet Bulb:{nData.wetBulb}°C Dewpoint:{Math.round(nData.dewpoint)}°C Relative Humidity:{Math.round(nData.relHumidity)}%</Text>
                  <Button style={styles.Button} onPress={()=>{deleteData(this,index).then(() => LoadAllData().then(res=> this.setState({data: res})))}}>delete</Button>
                </Card>
              ))}
            </div>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  
  button: {
    margin: 8,
  },
});
