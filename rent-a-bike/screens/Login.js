import { Text, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Login = ({navigation}) => {

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');

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
                        value={email}
                    />
                    <Input 
                        label='Password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <Button
                        title='Log In'
                        onPress={() =>{
                            // TODO: Check if correct password
                            // TODO: navigate to home screen
                        }}
                        style={styles.button}
                    />
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{fontSize: 16}} >  Dont have an acount? </Text> 
                            <TouchableOpacity 
                                onPress={() => {
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