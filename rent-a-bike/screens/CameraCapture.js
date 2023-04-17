import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { ref, uploadBytes } from "firebase/storage";
import { storage, } from '../firebase/fb-data';


const CameraCapture = ({route, navigation}) => {

    const {triggeringScreen} = route.params;

    const [state, setState] = useState({
        hasCameraPermission: null,
        image: null,
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    });
    
    const cameraRef = useRef(null);
    const storageRef = ref(storage);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            updateStateObject({ hasCameraPermission: cameraPermission.status === 'granted' })
        })();
    }, []);

    if(state.hasCameraPermission === false) {
        return <Text> Camera access not granted. </Text>
    }
    
    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
    };

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                updateStateObject({image: data.uri});
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            {!state.image ?
                <Camera
                    style={styles.camera}
                    type={state.type}
                    flashMode={state.flashMode}
                    ref={cameraRef}
                >
                    <View style= {{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 20,
                        alignContent: 'flex-start',
                    }}>
                        <Button
                            icon={<AntDesign name="retweet" size={34} color="white" />}
                            type='clear'
                            onPress={() => {
                                if(state.type == Camera.Constants.Type.back) {
                                    updateStateObject({type: Camera.Constants.Type.front})
                                }
                                else if(state.type == Camera.Constants.Type.front) {
                                    updateStateObject({type: Camera.Constants.Type.back})
                                }
                            }}
                        />
                        <Button
                            icon={() => {
                                if (state.flashMode == Camera.Constants.FlashMode.on) {
                                    return <Ionicons name="flash" size={34} color="white" />;
                                }
                                else if (state.flashMode == Camera.Constants.FlashMode.off) {
                                    return <Ionicons name="flash-off" size={34} color="white" />
                                }
                            }}
                            onPress={() => {
                                if (state.flashMode == Camera.Constants.FlashMode.on) {
                                    updateStateObject({flashMode: Camera.Constants.FlashMode.off});
                                }
                                else if (state.flashMode == Camera.Constants.FlashMode.off) {
                                    updateStateObject({flashMode: Camera.Constants.FlashMode.on});
                                }
                            }}
                            type='clear'
                        />
                    </View>

                </Camera>
            :
                <Image source={{uri: state.image}} style={styles.camera} />
            }
            
            {!state.image ?
            
                <Button
                    buttonStyle={styles.captureButton}
                    onPress={takePicture}
                />
            :
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 50,
                    paddingHorizontal: 30,
                }}>
                    <Button
                        title={'Re-take'}
                        onPress={() => updateStateObject({image: null})}
                    />
                    <Button
                        title={'Save'}
                        onPress={() => {
                            navigation.navigate(triggeringScreen, {imageUri: state.image})
                        }}
                    />

                </View>
            }
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        backgroundColor: "black",
    },
    camera: {
        flex: 1,
    },
    captureButton: {
        backgroundColor: '#fff',
        alignSelf:'center',
        resizeMode: 'contain',
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 35,
    },
})

export default CameraCapture;
