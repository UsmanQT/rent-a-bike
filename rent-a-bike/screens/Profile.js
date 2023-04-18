import { Text, Image, Keyboard, StyleSheet, View, Pressable, FlatList, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input, ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth, fetchUserData, fetchUserRentals } from '../firebase/fb-data';


const Profile = ({route, navigation}) => {
    const uid = route.params?.uid;

    // TODO: figure out how to get user information from uid.
    var defaultName = 'John Doe';
    if (uid === auth.currentUser.uid) {
        defaultName = auth.currentUser.displayName;
        
    }

    const [isLoading, setIsLoading] = useState(true);

    const [listingData, setListingData] = useState([]);

    const [rentalsData, setRentalsData] = useState([]);

    const [isRentalsLoading, setIsRentalsLoading] = useState(true);


    const [state, setState] = React.useState({
        userID: uid,
        name: defaultName,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    });


    const updateStateObject = (vals) => {
        setState({
          ...state,
          ...vals,
        });
      };

    const renderListing = ( {item } ) => {
        
        return (
            <TouchableOpacity>
                {isLoading ? (<View><Text>Loading..</Text></View> ): (
                <ListItem key={item.id}>
                    <Image
                    
                    source={item.listImageUri[0] ? { uri: item.listImageUri[0] } : require('../assets/Default_bike.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </ListItem>)}
            </TouchableOpacity>
            
        );
    };

    const renderRentals = ( {item } ) => {
        
        return (
            <TouchableOpacity>
                {isRentalsLoading ? (<View><Text>Loading..</Text></View> ): (
                <ListItem key={item.id}>
                    <Image
                    
                    source={item.listImageUri[0] ? { uri: item.listImageUri[0] } : require('../assets/Default_bike.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </ListItem>)}
            </TouchableOpacity>
            
        );
    };

    useEffect(() => {
        if (route.params?.uid) {
            updateStateObject({userID: route.params.uid});
        };
        
        
    }, [route.params?.uid])

    useEffect(() => {
        const getListings = async () => {
            const list = await fetchUserData(state.userID);
            setListingData(list);
            setIsLoading(false);
            
          };
      
          getListings();
          //console.log("profile screen")
          //console.log(listingData.length)

          const getRentals = async () => {
            const list2 = await fetchUserRentals(state.userID);
            setRentalsData(list2);
            setIsRentalsLoading(false);
            
          };
      
          getRentals();
          console.log("rentals")
          console.log(rentalsData)
    },[])

    return (
        
        
        <View style={styles.container}>
            <Image style={styles.pfp} src={auth.currentUser.photoURL}/>
            <View style={styles.info}>
                <Text style={{fontSize: 24, fontWeight: 'bold', fontStyle:'italic', paddingBottom: 7,}}>{state.name}</Text>
                <Text style={{fontSize: 20,}}>{state.bio}</Text>
            </View>   
            <View style={{width: '95%'}}>
                {state.userID != auth.currentUser.uid ? null : 
                    <Button 
                        title='Edit Profile'
                        onPress={() =>  {
                            navigation.navigate('EditProfile');
                        }}
                        style={styles.button}
                    />
                }
            </View>
            <View><Text style={styles.label}>Your Listings</Text></View>
            <View style={styles.list}>
                {listingData.length > 0 ? (<FlatList
                    data={listingData}
                    renderItem={renderListing}
                    //numColumns={3}
                    horizontal={true}
                />) : (<View><Text>No Listings to show</Text></View>)}
                
                
            </View>
            <View><Text style={styles.label}>Your Rentings</Text></View>
            
            {/* Change the following list to display the Rentings
            Currently it is displaying the list of listings */}
            <View style={styles.list}>
                {rentalsData.length > 0 ? (<FlatList
                    data={rentalsData}
                    renderItem={renderRentals}
                    //numColumns={3}
                    horizontal={true}
                
                />) : (<View><Text>No Listings to show</Text></View>)}
                
                
            </View>
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
      gap: 5,
      paddingBottom: 50
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
        resizeMode: 'contain',
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
        marginBottom: 10,
        paddingBottom: 20
    },
    listingImage: {
        width: 100,
        height: 8,
        resizeMode: 'cover'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#143342',
        padding: 10,
        paddingTop: 20,
        textAlign: 'center'
    },
});

export default Profile;