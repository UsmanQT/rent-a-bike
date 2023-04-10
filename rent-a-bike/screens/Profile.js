import { Text, Image, Keyboard, StyleSheet, View, Pressable, FlatList, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, getUser, } from '../firebase/fb-data';

const Profile = ({route, navigation}) => {
    const uid = route.params.uid;

    // TODO: figure out how to get user information from uid.
    var defaultName = 'John Doe';
    if (uid === auth.currentUser.uid) {
        defaultName = auth.currentUser.displayName;
        
    }

    const [state, setState] = React.useState({
        userID: uid,
        name: defaultName,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    });

    const [listingImages, setListingImages] = React.useState([1,1,1,1,1,1,1,1,1,1]) // random data to populate dummy images

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
      };

    const renderListing = ( {index, item } ) => {
        return (
            <TouchableOpacity>
                <ListItem key={index}>
                    <Image
                        source={require('../assets/Default_bike.png')}
                        style={styles.listingImage}
                    />
                </ListItem>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        if (route.params?.uid) {
            updateStateObject({userID: route.params.uid});
        };
    }, [route.params?.uid])
    
    return (
        <View style={styles.container}>
            <Image style={styles.pfp} src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'/>
            <View style={styles.info}>
                <Text style={{fontSize: 24, fontWeight: 'bold', fontStyle:'italic', paddingBottom: 7,}}>{state.name}</Text>
                <Text style={{fontSize: 20,}}>{state.bio}</Text>
            </View>   
            <View style={{width: '95%'}}>
                {state.userID != auth.currentUser.uid ? null : // TODO: compare the state.userID to the userID of the person viewing the screen.
                    <Button 
                        title='Edit Profile'
                        onPress={() =>{
                            navigation.navigate('EditProfile');
                        }}
                        style={styles.button}
                    />
                }
            </View>

            <View style={styles.list}>
                <FlatList
                    data={listingImages}
                    renderItem={renderListing}
                    numColumns={3}
                />
                
            </View>
            
        </View>
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
      gap: 10,
    },
    info: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        width: '95%',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#143342',
        padding: 10,
        paddingTop: 50,
    },
    link: {
        color: '#0000EE',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    button: {
        borderRadius: 10,
    },
    inputError: {
        color: "red",
    },
    pfp: {
        backgroundColor: 'white',
        alignSelf:'flex-start',
        resizeMode: 'contain',
        width: 175,
        height: 175,
        borderRadius: 175 / 2,
    },
    list: {
        flexDirection:'row',
        backgroundColor: "white",
        padding: 2,
        borderRadius: 10,
        width: '95%',
        flex: 1,
        marginBottom: 20
    },
    listingImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    }
});

export default Profile;