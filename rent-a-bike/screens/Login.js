import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { firebaseConfig } from "../firebase/fb-credentials";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/fb-data';
import Toast from "react-native-root-toast";



const Login = ({route, navigation}) => {

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[passwordError, setPasswordError] = React.useState('');
    const[emailError, setEmailError] = React.useState('');

    const dismissKeyboard = () => {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    };

    

    return (
        <Pressable onTouchStart={dismissKeyboard} style={{flex: 1}}>
                <View style={styles.container}>
                <Text style={styles.title}> Welcome to RentABike! </Text>
                <View style={styles.input}>
                    <Input 
                        label='Your Email Address'
                        placeholder='email@address.com'
                        onChangeText={setEmail}
                        value={email}autoCapitalize='none'
                        keyboardType='email-address'
                        autoCompleteType='email'
                        errorStyle={styles.inputError}
                        errorMessage={emailError}
                    />
                    <Input 
                        label='Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        errorStyle={styles.inputError}
                        errorMessage={passwordError}
                    />
                    <Button
                        title='Log In'
                        onPress={() =>{
                            setEmailError('');
                            setPasswordError('');

                            if (password === '') {
                                setPasswordError('Enter a password.')
                            }
                            else {
                                signInWithEmailAndPassword(auth, email, password)
                                    .then((userCredential) => {
                                        const user = userCredential.user;
                                        navigation.navigate("HomeScreen")
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorCode,errorMessage)
    
                                        if (errorCode === 'auth/invalid-email') {
                                            setEmailError('Enter a valid email address.');
                                        }
                                        else if (errorCode === 'auth/missing-email') {
                                            setEmailError('Enter an email.')
                                        }
                                        else if (errorCode === 'auth/wrong-password') {
                                            setPasswordError('Incorrect password.')
                                        }
                                        else {
                                            Toast.show(errorMessage, {
                                                duration: Toast.durations.LONG,
                                                animation: true,
                                                hideOnPress: true,
                                            });
                                        }
                                    }
                                )
                            }
                        }}
                        style={styles.button}
                    />
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{fontSize: 16}} >  Dont have an acount? </Text> 
                            <TouchableOpacity 
                                onPress={() => {
                                    setPassword("")
                                    setEmail("")
                                    navigation.navigate("CreateAccount");
                                }}
                            >
                                <Text style={styles.link}> Create Account </Text>
                            </TouchableOpacity>
                    </View>
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
});

export default Login;