import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider = ({ images }) => {
    return (
        <Swiper style={styles.container}>
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image style={{ width: 200, height: 200 }} source={{ uri: image }} />
            </View>
          ))}
        </Swiper>
      );
};

const styles = {
    container: {
      height: 200,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
export default ImageSlider;