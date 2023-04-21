import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from 'react-native-elements';
import Toast from "react-native-root-toast";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, setProfile, } from '../firebase/fb-data';

import {
    initDB,
    setupDataListener,
    storeData,
    paths
} from '../firebase/fb-data'


const CreateAccount = ({route, navigation}) => {

    const[user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    const[confirm, setConfirm] = React.useState('');
    const[passwordError, setPasswordError] = React.useState('');
    const[nameError, setNameError] = React.useState('');
    const[emailError, setEmailError] = React.useState('');

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
        if (password != '') {
            return password === confirm ? '' : 'Passwords do not match'
        }
        else {
            return 'Enter a password'
        }
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
                        errorStyle={styles.inputError}
                        errorMessage={nameError}
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
                        errorStyle={styles.inputError}
                        errorMessage={emailError}
                    />
                    <Input 
                        label='Create Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(val) => updateStateObject({password: val})}
                        value={user.password}
                        autoCorrect={false}
                        autoCapitalize='none'
                        errorStyle={styles.inputError}
                        errorMessage={passwordError}
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
                            setNameError('');
                            setEmailError('');
                            setPasswordError('');

                            if (user.password != confirm || user.password === '') {
                                setPasswordError(validatePassword(user.password, confirm));
                            }
                            else if (user.name === '') {
                                setNameError('Enter a name.')
                            }
                            else {
                                createUserWithEmailAndPassword(auth, user.email, user.password)
                                    .then(() => {

                                        signInWithEmailAndPassword(auth, user.email, user.password)
                                            .then(() => {
                                                console.log(auth.currentUser.uid)
                                                updateProfile(auth.currentUser, {
                                                    displayName: user.name, photoURL: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
                                                })
                                                const profileData = {
                                                    uid: auth.currentUser.uid,
                                                    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
                                                    name: user.name,
                                                    bio: '',
                                                    email: user.email,
                                                    listings: [],
                                                    rentals: [],
                                                }
                                                setProfile(profileData)
                                            })
                                        navigation.navigate("Login");
                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;

                                        if (errorCode === 'auth/invalid-email') {
                                            setEmailError('Enter a valid email address.');
                                        }
                                        else if (errorCode === 'auth/missing-email') {
                                            setEmailError('Enter an email.')
                                        }
                                        else if (errorCode === 'auth/weak-password') {
                                            setPasswordError('Password should be at least 6 characters.')
                                        }
                                        else {
                                            Toast.show(errorMessage, {
                                                duration: Toast.durations.LONG,
                                                animation: true,
                                                hideOnPress: true,
                                            });
                                        }
                                    })

                                
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