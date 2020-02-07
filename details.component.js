import React from 'react';
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

  const LoadAllData = async() => {
      
    data = JSON.parse(await retrieveData());
    data.observations.forEach(element => {
        <DataCard dryBulb={data.dryBulb} wetBulb={data.wetBulb} dewpoint={data.dewpoint} relHumidity={data.relHumidity}/>
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' leftControl={BackAction()}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        


      </Layout>
    </SafeAreaView>
  );
  
};

class DataCard extends Card{
    render(){
        <Card>
            <CardHeader>Data</CardHeader>
            <Text>Dry Bulb:{this.props.dryBulb} Wet Bulb:{this.props.dryBulb} Dewpoint:{this.props.dewpoint} Relative Humidity:{this.props.relHumidity}</Text>
        </Card>
    }
}
