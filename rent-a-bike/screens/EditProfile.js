import { Text, Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { ref, uploadBytes } from "firebase/storage";
import { storage, } from '../firebase/fb-data';

const EditProfile = ({route, navigation}) => {

    const [state, setState] = React.useState({
        userID: uuid.v4(), // TODO: get id from firebase
        name: 'John Doe',
        bio: 'Lorem Ipsum Dolor',
        email: 'JDoe@email.com',
        imageUri: null,
    });

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
    };

    useEffect(() => { 
        (async () => {
            if (route.params?.imageUri) {
                let result = await fetch(route.params.imageUri);
                let blob = await result.blob();
                uploadBytes(storageRef, blob).then((snapshot) => {
                    console.log('Uploaded profile image');
                })
                updateStateObject({imageUri: route.params.imageUri})
            }
        })();
    }, [route.params?.imageUri]);

    useEffect(() => {
        if (route.params?.imageUri) {
            updateStateObject({imageUri: route.params.imageUri})
        }
    }, [route.params?.imageUri]);

    const storageRef = ref(storage, '/profileImages');
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>  {
                    navigation.navigate('CameraCapture', {triggeringScreen: 'EditProfile'});
                }}
            >
                {state.imageUri == null ?
                <Image style={styles.pfp} source={require('../assets/Default_pfp.png')}/>
                :
                <Image style={styles.pfp} source={{uri: state.imageUri}}/>
                }
            </TouchableOpacity>
            
            <View style={styles.info}>
                {/* <Text style={{fontSize: 24, fontWeight: 'bold', fontStyle:'italic', paddingBottom: 7,}}>{state.name}</Text>
                <Text style={{fontSize: 20,}}>{state.bio}</Text> */}
                <Input 
                    label='Name'
                    placeholder='Your Name'
                    onChangeText={(val) => updateStateObject({ name: val })}
                    value={state.name}
                />
                <Input 
                    label='Bio'
                    placeholder='Bio'
                    onChangeText={(val) => updateStateObject({ bio: val })}
                    value={state.bio}
                />
                <Input 
                    label='Your Email Address'
                    placeholder='email@address.com'
                    onChangeText={(val) => updateStateObject({ email: val })}
                    value={state.email}
                /> 
                {/** Maybe add in password reset? */}
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

export default EditProfile;