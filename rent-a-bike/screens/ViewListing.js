import {View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";
import listings from '../models/listing';
import { ScrollView } from "react-native-gesture-handler";


const ViewListing = ({route, navigation}) => {
  const { itemId } = route.params;

  function getItemDetails(id) {
    const item = listings.find((item) => item.id === id);
    return item;
  }

  const item = getItemDetails(itemId);
  return (
    <ScrollView >
    <View style={styles.container}>
    <Image 
    source={item.imageuri} 
    style={{ width: '70%', height: '20%',borderRadius: 40}} />
    
    <View style={styles.fields}>
    <Text style={styles.title}>Name:</Text>
    <Text style={styles.text}>{item.name}</Text>
    <Text style={styles.title}>Description: </Text>
    <Text style={styles.text}>{item.description}</Text>
    <Text style={styles.title}>Price:</Text>
    <Text style={styles.text}>{item.price}</Text>
    <Text style={styles.title}>Brand:</Text>
    <Text style={styles.text}>{item.brand}</Text>
    <Text style={styles.title}>Size:</Text>
    <Text style={styles.text}>{item.size}</Text>
    <Text style={styles.title}>Address:</Text>
    <Text style={styles.text}>{item.address}</Text>
    
    </View>
    <View style={styles.button}>
      <Button 
        title='Get'
        color= 'white'
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
},
})
export default ViewListing;

