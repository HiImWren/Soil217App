import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, CardHeader} from '@ui-kitten/components';
import { retrieveData } from './App';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>




      </Layout>
    </SafeAreaView>
  );
  
};
const LoadAllData = async() => {
      
  return JSON.parse(await retrieveData());
 
}


export class DataCard extends Component{
    render(){
        <Card>
            <CardHeader>Data</CardHeader>
            <Text>Dry Bulb:{this.props.dryBulb} Wet Bulb:{this.props.dryBulb} Dewpoint:{this.props.dewpoint} Relative Humidity:{this.props.relHumidity}</Text>
        </Card>
    }
}
