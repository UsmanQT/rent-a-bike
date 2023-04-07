import {View, Text,Image, StyleSheet , FlatList} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Input, ListItem } from 'react-native-elements';
import CreateListing from "./CreateListing";
import Profile from "./Profile";
import FilterScreen from "./Filter";
import Icon from 'react-native-vector-icons/FontAwesome';
import listings from '../models/listing'


const HomeScreen = ({route, navigation}) => {
   
    const [listingImages, setListingImages] = React.useState([1,1,1,1,1,1,1,1,1,1]) // random data to populate dummy images

    const renderListing = ( { item } ) => {
        return (
            <TouchableOpacity
            onPress={() => navigation.navigate('ViewListing', {itemId: item.id})}
            >
                <ListItem key={item.index}>
                    <Image
                        source={item.imageuri }
                        style={styles.listingImage}
                    />
                    <ListItem.Content>
                        <ListItem.Title>
                            {item.name}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                
            </TouchableOpacity>
        );
    };  

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateListing")
              }
            >
              <Text style={styles.button}> Create Listing </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
            >
             <Text style={styles.button}> Profile </Text>
            </TouchableOpacity>
          ),
    
        });
      });
  return (
    <View style={styles.container}>
    <View style={styles.list}>
        
        <View style={{width: '100%', padding: 20}}>
                    <Button 
                        title='Apply Filter'
                        onPress={() =>{
                            navigation.navigate('FilterScreen');
                        }}
                        style={styles.button}
                    />
            </View>
    
    <FlatList
        data={listings}
        renderItem={renderListing}
        numColumns={1}
    />
    
</View>
</View>
  );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "column",
        backgroundColor: "#cbe7f5",
        alignItems: "center",
        padding: 10,
        gap: 10,
      },
    list: {
        flexDirection:'col',
        //backgroundColor: "white",
        padding: 2,
        borderRadius: 10,
        width: '100%',
        flex: 1,
        marginBottom: 20
    },
    listingImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    button: {
        borderRadius: 10,
    },
})

export default HomeScreen;