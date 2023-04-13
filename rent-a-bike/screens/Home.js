import {View, Text,Image, StyleSheet , FlatList} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, Input, ListItem } from 'react-native-elements';
import CreateListing from "./CreateListing";
import Profile from "./Profile";
import FilterScreen from "./Filter";
import Icon from 'react-native-vector-icons/FontAwesome';
import listings from '../models/listing';
import { auth,  fetchData, dataListener } from '../firebase/fb-data';


const HomeScreen = ({route, navigation}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [listingData, setListingData] = useState([]);

    const renderListing = ( { item } ) => {
        return (
          <View>
          {isLoading ? (<View><Text>Loading..</Text></View> ): (
            <TouchableOpacity
            onPress={() => navigation.navigate('ViewListing', {
              itemId: item.id, 
              itemName: item.listName,
              itemDisc: item.listDisc,
              itemBrand: item.brandName,
              itemSize: item.listSize,
              itemPrice: item.listPrice,
              itemImageUrl: item.listImageUri,
              userId: item.userId,
              itemAddress: item.listAddress
            })}
            >
                <ListItem key={item.id}>
                    <Image
                        source={item.listImageUri ? { uri: item.listImageUri } : require('../assets/Default_bike.png')}
                        style={styles.listingImage}
                    />
                    <ListItem.Content>
                        <ListItem.Title>
                            {item.listName}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                
            </TouchableOpacity>)}
            </View>
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
              
              onPress={() => {
                const user = auth.currentUser;
                console.log(user.uid);
                navigation.navigate("Profile", {
                  uid: user?.uid
                })}
              }
            >
             <Text style={styles.button}> Profile </Text>
            </TouchableOpacity>
          ),
    
        });
      });

      useEffect(() => {
        // const getListings = async () => {
        //     const list = await fetchData();
        //     setListingData(list);
        //     setIsLoading(false);
            
        //   };
      
        //   getListings();
        const unsubscribe = fetchData((items) => {
          setListingData(items);
          setIsLoading(false);
          console.log(listingData)
        })
        
          console.log("home screen")
          console.log(listingData);
          
    },[])

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
        data={listingData}
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