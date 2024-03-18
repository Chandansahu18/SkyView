import React from 'react';
import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const SkyView = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'gray',
        tabBarActiveBackgroundColor:'rgba(64,85,86,1)',
        tabBarInactiveBackgroundColor:'rgba(64,85,86,0.7)',
      }}
      >

      <Tab.Screen name="Home" component={HomeTab} options={{
        tabBarIcon:({size})=>(
        <AntDesign name='home' size={size} color={'#ffffff'}/>
        )
      }}/>
      <Tab.Screen name="Search" component={SearchTab} options={{
        tabBarIcon:({size})=>(
        <AntDesign name='search1' size={size} color={'#ffffff'}/>
        )
      }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default SkyView;


