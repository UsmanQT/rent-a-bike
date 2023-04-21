import {View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";
import listings from '../models/listing';
import { ScrollView } from "react-native-gesture-handler";
import ImageSlider  from '../components/ImageSlider';


const ViewListing = ({route, navigation}) => {

  const { itemId, itemName, itemDisc, itemBrand, itemSize, itemPrice, itemImageUrl, userId, itemAddress } = route.params;

  const defaultImage = [
    'https://www.cityworks.com/wp-content/uploads/2022/05/placeholder-3.png',
  ];

  return (
    <ScrollView >
    <View style={styles.container}>
    <ImageSlider images={itemImageUrl ? itemImageUrl : defaultImage}/>
    {/* <Image 
    source={{uri: itemImageUrl[0]}} 
    style={{ width: '70%', height: '20%',borderRadius: 40}} /> */}
    
    <View style={styles.fields}>
    <Text style={styles.title}>Name:</Text>
    <Text style={styles.text}>{itemName}</Text>
    <Text style={styles.title}>Description: </Text>
    <Text style={styles.text}>{itemDisc}</Text>
    <Text style={styles.title}>Price:</Text>
    <Text style={styles.text}>{itemPrice}</Text>
    <Text style={styles.title}>Brand:</Text>
    <Text style={styles.text}>{itemBrand}</Text>
    <Text style={styles.title}>Size:</Text>
    <Text style={styles.text}>{itemSize}</Text>
    <Text style={styles.title}>Address:</Text>
    <Text style={styles.text}>{itemAddress}</Text>
    
    </View>
    <View style={styles.button}>
      <Button 
        title='Get'
        color= 'white'
        onPress={() => {
          navigation.navigate("RentalScreen", 
          {
              itemId: itemId, 
              itemName: itemName,
              itemDisc: itemDisc,
              itemBrand: itemBrand,
              itemSize: itemSize,
              itemPrice: itemPrice,
              itemImageUrl: itemImageUrl,
              userId: userId,
              itemAddress: itemAddress
          }
          )
        }}
        />
    </View>

    <View style={styles.button}>
      <Button 
        title='View Poster'
        color={'white'}
        onPress={() => {
          console.log("Poster: ",userId)
          navigation.navigate("Profile", {
            uid: userId
        })
        }}
      />
    </View>
    
    
    
  </View>
  
  </ScrollView>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#cbe7f5",
    alignItems: "center",
    flexGrow: 1,
    padding: 40,
    paddingBottom: 200,
    
    justifyContent: 'flex-start',
    
  },
  fields : {
    marginTop: 20,
    marginBottom: 30,
    //flex: 1,
    //flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
    
    width: 350,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#143342',
    padding: 10,
    paddingTop: 10,

},
text: {
  fontSize: 14,
    color: '#143342',
    borderColor: '#143342',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    width: '100%'
    
},
button: {
  borderRadius: 5,
  backgroundColor: '#1e90ff',
  flex: 1,
  height: 60,
  padding: 10,
  width: '99%',
  marginBottom: 10
},
listingImage: {
  width: 100,
  height: 100,
  resizeMode: 'cover'
},
})
export default ViewListing;

