import { Text, Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {auth, storage, getProfile, setProfile } from '../firebase/fb-data';
import { updateProfile, updateEmail } from "firebase/auth";
import {  ref as fbStorageRef, getDownloadURL, uploadBytesResumable, } from 'firebase/storage';
import Toast from "react-native-root-toast";


const EditProfile = ({route, navigation}) => {


    const [state, setState] = React.useState({
        userID: auth.currentUser.uid,
        name: '',
        bio: '',
        email: '',
        imageUri: auth.currentUser.photoURL,
    });

    const [uploading, setUploading] = React.useState(false);
    const [loading, setloading] = React.useState(false);

    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
    };

    useEffect(() => { 
        (async () => {
            try{
                if (route.params?.imageUri) {
                    setUploading(true);
                    let uri = route.params.imageUri
                    let fileName = `${auth.currentUser.uid}-profileImage`

                    let result = await fetch(uri);
                    let blob = await result.blob();
                    
                    const storageRef = fbStorageRef(storage, fileName);
                    
                    await uploadBytesResumable(storageRef, blob)
                    url = await getDownloadURL(storageRef);
                    
                    console.log('Uploaded image: ', url);
                    
                        updateStateObject({imageUri: url})
                        console.log("EditProfile: ", url)
                        console.log('Uploaded profile image');
                        setUploading(false);
                } 
            } catch (e) {
                console.log(e)
            }
        })();
    }, [route.params?.imageUri]);

    useEffect(() => {
        (async () => {
            const data = await getProfile(auth.currentUser.uid)

            const userInfo = data[0];
            console.log(userInfo)
            updateStateObject({
                userID: userInfo.uid, 
                name: userInfo.name,
                bio: userInfo.bio,
                email: userInfo.email,
                profileImage: userInfo.profileImage
            })
        })();

    }, [])
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>  {
                    navigation.navigate('CameraCapture', {triggeringScreen: 'EditProfile'});
                }}
            >
                {state.imageUri == null || uploading ?
                <Image style={styles.pfp} src={'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}/>
                :
                <Image style={styles.pfp} source={{uri: state.imageUri}}/>
                }
            </TouchableOpacity>
            
            <View style={styles.info}>
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
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoCompleteType='email'
                /> 
                {/** Maybe add in password reset? */}
            </View>   
            <Button 
                style={styles.button} 
                title={"Save"}
                onPress={() => {
                    
                    updateProfile(auth.currentUser, {
                        displayName: state.name,
                        photoURL: state.imageUri,
                    })

                    updateEmail(auth.currentUser, state.email)
                    .then(() => {
                        const profileData = {
                            uid: auth.currentUser.uid,
                            profileImage: state.imageUri,
                            name: state.name,
                            bio: state.bio,
                            email: state.email,
                        }

                        setProfile(profileData)

                        navigation.navigate("Profile", {
                            uid: auth.currentUser.uid,
                            uri: state.imageUri
                        })
                    })
                    .catch((error) => {
                        Toast.show(error.message, {
                            duration: Toast.durations.LONG,
                            animation: true,
                            hideOnPress: true,
                        });
                    })


                }}
            />
            
            
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
        resizeMode: 'cover',
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