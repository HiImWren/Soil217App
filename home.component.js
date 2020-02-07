import React,{Component, useState, useEffect}from 'react';
import { Platform, StyleSheet, View, TextInput, AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Divider, Layout, TopNavigation, Input, CardHeader, Card , Text, ButtonGroup} from '@ui-kitten/components';
import App,{retrieveData,saveData, deleteData} from './App';

const a = 6.112
const b = 17.67
const c = 243.5


export const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

 
  // this.state = {
  //   wetBulb: 0,
  //   dryBulb: 0,
  //   dewpoint: 0,
  //   relHumidity: 0,
  //   pressure: 1000,
  // };

    const [wetBulb, setWetBulb] = useState(20);//: 0,
    const [dryBulb, setDryBulb] = useState(20); //: 0,
    const [dewpoint, setDewPoint] = useState(20);//: 0,
    const [relHumidity, setRelHumidity] = useState(100);//: 0,
    const [pressure, setPressure] = useState(1000);//: 1000,
    const [testData,setTestData] = useState("");

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
    
    useEffect(() => calculateResults(),[dryBulb,wetBulb])

    const appendToData = async () => {
        const x = await retrieveData();
        saveData(x,dryBulb,wetBulb,dewpoint,relHumidity)
    }

  return (
      
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Soil 217 Companion' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Input
        label='Dry Bulb Temperature'
        placeholder="20"
        onChangeText={text => onChangeDry(text)}
        />
        <Input
        label='Wet Bulb Temperature'
        placeholder="20"
        onChangeText={text => onChangeWet(text)}
        />
        
        <Card style={styles.card}>
            <CardHeader title="Dewpoint Temperature"/>
            <Text>
            {Math.round(dewpoint)}*C
            </Text>
            </Card>
            <Card style={styles.card}>
            <CardHeader title="Relative Humidity"/>
            <Text>
            {Math.round(relHumidity)}%
            </Text>
            </Card>
        <ButtonGroup>
        <Button style={styles.Button} onPress={()=>{appendToData()}}>Log Data!</Button>
        <Button style={styles.Button} onPress={()=>{navigateDetails()}}>View Data</Button>
        <Button style={styles.Button} onPress={()=>{deleteData()}}>deleteData</Button>
        </ButtonGroup>
        <Text>{testData}</Text>
      </Layout>
    </SafeAreaView>
  );
};


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
  