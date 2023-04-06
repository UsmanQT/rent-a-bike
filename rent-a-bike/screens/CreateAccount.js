import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import {
    initDB,
    setupDataListener,
    storeData,
    paths
} from '../firebase/fb-data'

const CreateAccount = ({navigation}) => {

    const[user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    const[confirm, setConfirm] = React.useState('');
    const[error, setError] = React.useState('');

    const updateStateObject = (vals) => {
        setUser({
          ...user,
          ...vals,
        });
      };

    const dismissKeyboard = () => {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    };

    function validatePassword(password, confirm) {
        return password === confirm ? '' : 'Passwords do not match'
    }

    useEffect(() => {
        try {
          initDB();
        } catch (err) {
          console.log(err);
        }
      }, []);

    return (
        <Pressable onTouchStart={dismissKeyboard} style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.title}> Create Account </Text>
                <View style={styles.input}>
                    <Input 
                        label='Enter Name'
                        placeholder='Your Name'
                        onChangeText={(val) => updateStateObject({name: val})}
                        value={user.name}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <Input 
                        label='Enter Email'
                        placeholder='email@address.com'
                        onChangeText={(val) => updateStateObject({email: val})}
                        value={user.email}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        autoCompleteType='email'
                    />
                    <Input 
                        label='Create Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(val) => updateStateObject({password: val})}
                        value={user.password}
                        autoCorrect={false}
                        errorStyle={styles.inputError}
                        autoCapitalize='none'
                        errorMessage={error}
                    />
                    <Input 
                        label='Confirm Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setConfirm}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={confirm}
                    />
                    <Button
                        title='Create Account'
                        onPress={() =>{
                            if(user.password === confirm && user.name != '' && user.email != '') {
                                // Generate a UUID and assign it to UserID
                                let name = user.name;
                                let email = user.email;
                                let password = user.password;
                                storeData({name, email, password, userID: uuid.v4()}, paths.USER_DATA_PATH)
                                navigation.navigate("Login");
                            }
                            else {
                                setError(validatePassword(password, confirm));
                            }
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
        paddingTop: 50,

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
});

export default CreateAccount;