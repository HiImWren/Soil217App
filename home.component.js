import React,{Component, useState, useEffect}from 'react';
import { Platform, StyleSheet, View, TextInput, AsyncStorage,StatusBar,SafeAreaView, statusbar, ImageBackground } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Input, CardHeader, Card , Text, ButtonGroup, withStyles} from '@ui-kitten/components';
import App,{retrieveData,saveData, deleteAllData} from './App';

import catUmbrella from './Clouds.jpg';

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
    <ImageBackground source={catUmbrella} style={{... styles.container, width: '100%', height: '100%'}}>

    <SafeAreaView style={styles.safeArea}>
      <TopNavigation title='Soil 217 Weather Observation' style={styles.TopNavigation} titleStyle={styles.TopTitle} alignment='center'/>
      {/* <Divider/> */}

      <Layout style={styles.container}>
        <Layout style={styles.childLayout2} level='1'>
          <Input label='Dry Bulb Temperature' style={styles.inputBox}
            placeholder="20°C"
            onChangeText={text => onChangeDry(text)}/>
          <Input label='Wet Bulb Temperature' style={styles.inputBox}
            placeholder="20°C"
            onChangeText={text => onChangeWet(text)}
            status={dangerText != ""? 'danger':'success'}
            caption={dangerText}/> 
        </Layout>


        <Layout style={styles.childLayout} level='1'>
          <Card style={styles.card}>
              <CardHeader title="Dewpoint Temperature"/>
              <Text style={styles.BigText}>
              {dangerText==""?Math.round(dewpoint*10)/10:"--"}°C
              </Text>
          </Card>
          <Card style={styles.card}>
              <CardHeader title="Relative Humidity"/>
              <Text style={styles.BigText}>
              {dangerText==""?Math.round(relHumidity):"--"}%
              </Text>
          </Card>
        </Layout>
      </Layout>

      <Layout style={{...styles.buttonGroupContainer}} level='1'>
          <ButtonGroup style={styles.buttonGroup} size='giant'> 
            <Button onPress={()=>{navigateDetails()}} >View Data</Button>
            <Button disabled={dangerText!=""} onPress={()=>{appendToData()}} >Log Data!</Button>
            {/* <Button style={styles.Button} onPress={()=>{deleteAllData()}}>delete</Button> */}
          </ButtonGroup>
        </Layout>
      
        <Text>{testData}</Text>
    </SafeAreaView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 4,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF00',
     // backgroundColor: '#F5FCFF',
    },
    buttonGroupContainer: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF00',
     // backgroundColor: '#F5FCFF',
    },

    TopNavigation:{
    //  width: '100%',
      backgroundColor: '#00000000',
      
    },

    TopTitle:{
      color:'white',
      fontSize: 20,
      fontWeight: 'bold',
    },

    inputBox:{
      padding:10,
    },
    
    safeArea:{
      height:'100%',
      marginTop: StatusBar.currentHeight*2,
      
    },
    
    childLayout2: {

      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFFAA',
      width: '90%',
    },

    childLayout: {

      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF55',
      margin:10,
      width: '90%',
    },

    footerLayout: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 20
    },

 
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    
    card: {
      margin: 10,
    },

    buttonGroup: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin:20
    },
    BigText:{
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },

  });
  