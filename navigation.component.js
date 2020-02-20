import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './home.component';
import { DetailsScreen } from './details.component';
import { helpScreen} from './helpScreen.component';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Help: helpScreen,
}, {
  headerMode: 'none',
});

export const AppNavigator = createAppContainer(HomeNavigator);