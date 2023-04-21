import { Text, Keyboard, StyleSheet, View, Pressable, FlatList, Image, } from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input, ListItem } from 'react-native-elements';
import { storeData } from '../firebase/fb-data';
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { storage, auth, uploadImage } from '../firebase/fb-data';
import uuid from 'react-native-uuid';



const CreateListing = ({route, navigation}) => {
  
  const[listingName, setListingName] = React.useState('');
  const[listingDescription, setDescription] = React.useState('');
  const[price, setPrice] = React.useState('');
  const[brand, setBrand] = React.useState('');
  const[size, setSize] = React.useState('');
  const[address, setAddress] = React.useState('');
  const [images, setImages] = React.useState([]);
  const[numImages, setNumImages] = React.useState(0);
  const[uploading, setUploading] = React.useState(false);
  var userId = '';
  const dismissKeyboard = () => {
      if (Platform.OS != "web") {
          Keyboard.dismiss();
      }
  };

//   const storageRef = ref(storage, `${auth.currentUser.uid}-listingImage`);

//   useEffect(()=> {
//     const listimages = ['https://www.cityworks.com/wp-content/uploads/2022/05/placeholder-3.png', 
//     'https://static.vecteezy.com/system/resources/previews/002/292/395/original/placeholder-on-map-line-outline-icon-for-website-and-mobile-app-on-grey-background-free-vector.jpg' ]
//     setImages(listimages)
//   },[])

// useEffect(()=> {
//     const listimages = ['https://www.cityworks.com/wp-content/uploads/2022/05/placeholder-3.png']
//     setImages(listimages)
//   },[])

  useEffect(() => { 
    (async () => {
        if (route.params?.imageUri) {
            const uri = route.params.imageUri;
            // TODO: Add a uid for the listing and attach it to the filename
            const fileName = `${auth.currentUser.uid}-listingImage#${numImages}-${uuid.v4()}`
            console.log("uploading: ", fileName)
            await uploadImage(uri, fileName)

            var arr = images;
            arr.push(url);
            setImages(arr);
            setNumImages(numImages + 1)
            console.log("Url:",url)
        }
    })();
}, [route.params?.imageUri]);

const renderImage = ( {index, item } ) => {
    return (
        <TouchableOpacity>
             
            <ListItem key={index}>
                <Image
                    src={images[index]}
                    style={styles.listingImage}
                />
            </ListItem>
        </TouchableOpacity>
        
    );
};

  return (
      <Pressable onTouchStart={dismissKeyboard} style={{flex: 1}}>
          <View style={styles.container}>
              <Text style={styles.title}> Create A Listing </Text>
              <View style={styles.input}>
                  <View>
                    <FlatList
                        data={images}
                        renderItem={renderImage}
                        //numColumns={3}
                        horizontal={true}
                    
                        />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("CameraCapture",{triggeringScreen: 'CreateListing'})
                        }}
                    >
                        <Icon name="camera" size={30} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  <Input 
                      label='Listing Name'
                      placeholder='Enter the name of listing'
                      onChangeText={setListingName}
                      value={listingName}
                      autoCorrect={false}
                  />
                  <Input 
                      label='Description'
                      placeholder='Enter some description of the listing'
                      onChangeText={setDescription}
                      value={listingDescription}
                  />
                  <Input 
                      label='Price'
                      placeholder='Enter price per day'
                      keyboardType='numeric'
                      onChangeText={setPrice}
                      value={price}
                      
                  />
                  <Input 
                      label='Brand'
                      placeholder='Enter the brand name'
                      
                      onChangeText={setBrand}
                      value={brand}
                  />
                  <Input 
                      label='Size'
                      placeholder='Enter size'
                      
                      onChangeText={setSize}
                      value={size}
                  />
                  <Input 
                      label='Address'
                      placeholder='Enter the address'
                      
                      onChangeText={setAddress}
                      value={address}
                  />
                  <Button
                      title='Create'
                      onPress={() =>{
                        const auth = getAuth();
                        userId = auth.currentUser.uid;
                        
                        const listObject = {
                            userId: userId,
                            listName: listingName,
                            listDisc: listingDescription,
                            listPrice: price,
                            brandName: brand,
                            listSize: size,
                            listAddress: address,
                            listImageUri: images
                          }
                          storeData(listObject)
                          navigation.goBack();
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
      paddingTop: 20,

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
  icon: {
    padding: 10,
    alignSelf: 'center',
  },
  listingImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
});
export default CreateListing;