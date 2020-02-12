import React from 'react';

import { Platform, AsyncStorage, StatusBar, SafeAreaView} from 'react-native';
import { ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { AppNavigator } from './navigation.component';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export const deleteAllData = async () => {
  await AsyncStorage.removeItem("LoggedData");
}

export const deleteData = async (comp,index) => {
  var d = JSON.parse(await retrieveData());
  d.observations.splice(index,1);

  await AsyncStorage.setItem('LoggedData',JSON.stringify(d));
  console.log(d);
  comp.forceUpdate();
}

export const saveData = async (savingData, dryBulb, wetBulb, dewpoint, relHumidity) => {
  
  console.log(savingData);
  var lData = JSON.parse(savingData);
  var d = new Date();
  d.getTime();
  var data = {"dryBulb":dryBulb,"wetBulb":wetBulb,"dewpoint":dewpoint,"relHumidity":relHumidity, "month":d.getMonth()+1,"day":d.getDate(),"year":d.getFullYear(),"hour":d.getHours(),"minutes":d.getMinutes()};
  lData.observations.push(data);
  console.log(JSON.stringify(savingData));  
  await AsyncStorage.setItem('LoggedData',JSON.stringify(lData));


}

export const retrieveData = async () => {
  // try {
  const loadedData = await AsyncStorage.getItem('LoggedData');

  var resObject = "";
  //setTestData(loadedData);
  if(loadedData !== null){
      //lets parse this json 
      
      console.log("Found data");
      resObject = loadedData

      
  }else{

      console.log("Creating new data");
      resObject = '{"observations":[]}';
      //We don't have any data so lets create some
  }
  return (resObject);
  // }catch{

  // }
}

export default function App() {

  return (

    <React.Fragment>
    
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <SafeAreaProvider>
      <AppNavigator></AppNavigator>
      </SafeAreaProvider>
    </ApplicationProvider>
    
    </React.Fragment>
  );
}