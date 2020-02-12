import React,{Component, useState, useEffect}from 'react';
import { Platform, StyleSheet, View, TextInput, AsyncStorage,StatusBar,SafeAreaView, statusbar } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Input, CardHeader, Card , Text, ButtonGroup} from '@ui-kitten/components';
import App,{retrieveData,saveData, deleteAllData} from './App';

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
    const [dangerText, setDangerText] = useState("");

    function onChangeDry(text) {

        setDryBulb( parseFloat(text) );
        // calculateResults();

    }

    function onChangeWet(text) {
        setWetBulb( parseFloat(text) );
        // calculateResults();
    }

    function ValidateResults (x,y){
      if(y<0){
        return "Difference too great";
      }
      return "";
    }

    function calculateResults() {

      if(wetBulb <= dryBulb){

        var Es = a * Math.exp(((b * dryBulb) / (dryBulb + c)));
        var Esw = a * Math.exp((b * wetBulb) / (wetBulb + c));
        var Ea = Esw - (pressure*(dryBulb-wetBulb)*0.00066*(1+(0.00115*wetBulb)));
        setRelHumidity((Ea/Es)*100);
        setDewPoint((c*Math.log(Ea/a))/((b - Math.log(Ea/a))));
        setDangerText(ValidateResults(dryBulb,(Ea/Es)*100));
      }else{
        setDangerText("Wet bulb temp too high");
      }
      

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
      <Layout style={styles.container}>
        <Layout style={styles.layout} level='1'>
          <Input label='Dry Bulb Temperature' style={styles.inputBox}
            placeholder="20°C"
            onChangeText={text => onChangeDry(text)}/>
          <Input label='Wet Bulb Temperature' style={styles.inputBox}
            placeholder="20°C"
            onChangeText={text => onChangeWet(text)}
            status={dangerText != ""? 'danger':'success'}
            caption={dangerText}/> 
        </Layout>


        <Layout style={styles.layout} level='1'>
          <Card style={styles.card}>
              <CardHeader title="Dewpoint Temperature"/>
              <Text>
              {dangerText==""?dewpoint:"--"}°C
              </Text>
          </Card>
          <Card style={styles.card}>
              <CardHeader title="Relative Humidity"/>
              <Text>
              {dangerText==""?relHumidity:"--"}%
              </Text>
          </Card>
        </Layout>

        <Layout style={styles.layout} level='1'>
          <ButtonGroup style={styles.buttonGroup}> 
            <Button style={styles.Button} onPress={()=>{navigateDetails()}}>View Data</Button>
            <Button style={styles.Button} disabled={dangerText!=""} onPress={()=>{appendToData()}}>Log Data!</Button>
            {/* <Button style={styles.Button} onPress={()=>{deleteAllData()}}>delete</Button> */}
          </ButtonGroup>
        </Layout>
        <Text>{testData}</Text>
      </Layout>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor: '#F5FCFF',
    },

    inputBox:{
      padding:20
    },
    
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    
    card: {
      margin: 10
    },

    button: {
      margin: 8,
    },

    buttonGroup: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  