import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { storeData } from '../firebase/fb-data';
import { getAuth } from "firebase/auth";



const CreateListing = ({navigation}) => {
  
  const[listingName, setListingName] = React.useState('');
  const[listingDescription, setDescription] = React.useState('');
  const[price, setPrice] = React.useState('');
  const[brand, setBrand] = React.useState('');
  const[size, setSize] = React.useState('');
  const[address, setAddress] = React.useState('');
  var userId = '';
  const dismissKeyboard = () => {
      if (Platform.OS != "web") {
          Keyboard.dismiss();
      }
  };

 


  return (
      <Pressable onTouchStart={dismissKeyboard} style={{flex: 1}}>
          <View style={styles.container}>
              <Text style={styles.title}> Create A Listing </Text>
              <View style={styles.input}>
                  <Input 
                      label='Listing Name'
                      placeholder='Enter the name of listing'
                      onChangeText={setListingName}
                      value={listingName}
                      autoCorrect={false}
                  />
                  <Input 
                      label='Description'
                      placeholder='Enter some description of the listing'
                      onChangeText={setDescription}
                      value={listingDescription}
                  />
                  <Input 
                      label='Price'
                      placeholder='Enter price per day'
                      keyboardType='numeric'
                      onChangeText={setPrice}
                      value={price}
                      
                  />
                  <Input 
                      label='Brand'
                      placeholder='Enter the brand name'
                      
                      onChangeText={setBrand}
                      value={brand}
                  />
                  <Input 
                      label='Size'
                      placeholder='Enter size'
                      
                      onChangeText={setSize}
                      value={size}
                  />
                  <Input 
                      label='Address'
                      placeholder='Enter the address'
                      
                      onChangeText={setAddress}
                      value={address}
                  />
                  <Icon name="camera" size={30} style={styles.icon} />
                  <Button
                      title='Create'
                      onPress={() =>{
                        const auth = getAuth();
                        userId = auth.currentUser.uid;
                          const listObject = {
                            userId: userId,
                            listName: listingName,
                            listDisc: listingDescription,
                            listPrice: price,
                            brandName: brand,
                            listSize: size,
                            listAddress: address,
                            listImageUri: 'https://www.cityworks.com/wp-content/uploads/2022/05/placeholder-3.png'
                          }
                          storeData(listObject)
                          navigation.navigate("Profile", {uid: userId})
                      }}
                      style={styles.button}
                  />
              </View>
          </View>
      </Pressable>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: "column",
    backgroundColor: "#cbe7f5",
    alignItems: "center",
    padding: 10,
  },
  input: {
      backgroundColor: "white",
      padding: 7,
      borderRadius: 10,
      width: '95%',
  },
  title: {
      fontSize: 34,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#143342',
      padding: 10,
      paddingTop: 20,

  },
  link: {
      color: '#0000EE',
      fontSize: 16,
      textDecorationLine: 'underline',
  },
  button: {
      alignSelf:'center',
      width: '95%',
      padding: 10,
  },
  inputError: {
      color: "red",
  },
  icon: {
    
    padding: 10,
    alignSelf: 'center',
  }
});
export default CreateListing;