import { Text, Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

const EditProfile = ({navigation}) => {

    const [state, setState] = React.useState({
        userID: uuid.v4(), // TODO: get id from firebase
        name: 'John Doe',
        bio: 'Lorem Ipsum Dolor',
        email: 'JDoe@email.com',
    });

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
      };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                // onPress: change image
            >
                <Image style={styles.pfp} source={require('../assets/Default_pfp.png')}/>
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