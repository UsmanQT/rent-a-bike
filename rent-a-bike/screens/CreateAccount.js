import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateAccount = ({navigation}) => {

    const[name, setName] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[confirm, setConfirm] = React.useState('');
    const[error, setError] = React.useState('');

    const dismissKeyboard = () => {
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    };

    function validatePassword(password, confirm) {
        return password === confirm ? '' : 'Passwords do not match'
    }

    return (
        <Pressable onTouchStart={dismissKeyboard} style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.title}> Create Account </Text>
                <View style={styles.input}>
                    <Input 
                        label='Enter Name'
                        placeholder='Your Name'
                        onChangeText={setName}
                        value={name}
                        autoCorrect={false}
                    />
                    <Input 
                        label='Enter Email'
                        placeholder='email@address.com'
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Input 
                        label='Create Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        errorStyle={styles.inputError}
                        errorMessage={error}
                    />
                    <Input 
                        label='Confirm Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setConfirm}
                        value={confirm}
                    />
                    <Button
                        title='Create Account'
                        onPress={() =>{
                            // TODO: Check if valid password
                            if(password === confirm && name != '' && email != '') {
                                // Generate a UUID and assign it to UserID
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