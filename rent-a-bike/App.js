import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import HomeScreen from './screens/Home';
import FilterScreen from './screens/Filter';
import ViewListing from './screens/ViewListing';
import CreateListing from './screens/CreateListing';
import RentalScreen from './screens/RentalScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login to RentABike" }}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccount}/>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name='ViewListing' component={ViewListing}/>
      
      <Stack.Screen name='FilterScreen' component={FilterScreen}/>
      <Stack.Screen name='CreateListing' component={CreateListing}/>
      
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name='EditProfile' component={EditProfile}/>
      <Stack.Screen name='RentalScreen' component={RentalScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
