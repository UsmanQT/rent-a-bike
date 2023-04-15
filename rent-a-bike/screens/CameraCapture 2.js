import React, { useEffect, } from 'react';
import { View, } from 'react-native';
import { Camera, userCameraDevices, } from 'react-native-vision-camera';

const CameraCapture = () => {

    useEffect(() => {
        async function getPermission() {
          const cameraPermission = await Camera.getCameraPermission();
          console.log(`Camera permission status: ${cameraPermission}`);
          //if (permission === 'denied') await Linking.openSettings();

          if (cameraPermission === 'not-determined') {
            const newCameraPermision = await Camera.requestCameraPermission();
          }
        }
        getPermission();
      }, []);

    return (
        <View>
          <Text> Camera Screen </Text>
        </View>
    );
};

export default CameraCapture;