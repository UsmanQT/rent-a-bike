import { Text, Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { storage, } from '../firebase/fb-data';
import {auth} from '../firebase/fb-data';
import { updateProfile } from "firebase/auth";

const EditProfile = ({route, navigation}) => {

    const [state, setState] = React.useState({
        userID: auth.currentUser.uid,
        name: 'John Doe',
        bio: 'Lorem Ipsum Dolor',
        email: 'JDoe@email.com',
        imageUri: auth.currentUser.photoURL,
    });

    const [uploading, setUploading] = React.useState(false);

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
                    
                    let uri = route.params.imageUri;
                    let result = await fetch(uri);
                    let blob = await result.blob();
                    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
                    // const fileName = `${state.userID}-profileImage`

                    const storageRef = ref(storage, fileName);

                    const upload = uploadBytesResumable(storageRef, blob);
                    upload.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        console.log("Error: ", error.message)
                    }, 
                    () => {
                        getDownloadURL(storageRef)
                            .then((url) => {
                                updateProfile(auth.currentUser, {
                                    photoURL: url,
                                })

                                updateStateObject({imageUri: url})
                                setUploading(false);
                                console.log('Uploaded profile image');
                            })
                    });
                    // .then(() => {
                    //     updateStateObject({imageUri: uri})

                    //     getDownloadURL(storageRef)
                    //         .then((url) => {
                    //             updateProfile(auth.currentUser, {
                    //                 photoURL: url,
                    //             })
                    //             setUploading(false);
                    //             console.log('Uploaded profile image');
                    //         })
                    // })
                    // .catch((e) => {
                    //     console.log(e);
                    // })
                } 
            } catch (e) {
                console.log(e)
            }
        })();
    }, [route.params?.imageUri]);
    
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
                {/* <Text style={{fontSize: 24, fontWeight: 'bold', fontStyle:'italic', paddingBottom: 7,}}>{state.name}</Text>
                <Text style={{fontSize: 20,}}>{state.bio}</Text> */}
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
                /> 
                {/** Maybe add in password reset? */}
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
        marginBottom: 20
    },
    listingImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    }
});

export default EditProfile;

// import { Text, Image, Keyboard, StyleSheet, View, Pressable } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Button, Input } from 'react-native-elements';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
// import { storage, } from '../firebase/fb-data';
// import {auth, setProfile, } from '../firebase/fb-data';
// import { updateProfile } from "firebase/auth";

// const EditProfile = ({route, navigation}) => {
//     const uid = route.params?.uid;

//     const [state, setState] = React.useState({
//         userID: uid,
//         name: 'John Doe',
//         bio: 'Lorem Ipsum Dolor',
//         email: 'JDoe@email.com',
//         imageUrl: auth.currentUser.photoURL,
//     });

//     const updateStateObject = (vals) => {
//         setState({
//           ...state,
//           ...vals,
//         });
//     };

//     useEffect(() => { 
//         (async () => {
//             if (route.params?.imageUri) {
//                 let result = await fetch(route.params.imageUri);
//                 let blob = await result.blob();
//                 uploadBytes(storageRef, blob).then(() => {
//                     console.log('Uploaded profile image');
//                 })

//                 getDownloadURL(storageRef)
//                     .then((url) => {
//                         updateProfile(auth.currentUser, {
//                             photoURL: url, 
//                         })
//                         updateStateObject({imageUrl: url})
//                     })
//             }
//         })();
//     }, [route.params?.imageUri]);

//     const storageRef = ref(storage, `${uid}-profileImage`);
    
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 onPress={() =>  {
//                     navigation.navigate('CameraCapture', {triggeringScreen: 'EditProfile'});
//                 }}
//             >
//                 <Image style={styles.pfp} src={state.imageUrl}/>
//             </TouchableOpacity>
            
//             <View style={styles.info}>
//                 <Input 
//                     label='Name'
//                     placeholder='Your Name'
//                     onChangeText={(val) => updateStateObject({ name: val })}
//                     value={state.name}
//                 />
//                 <Input 
//                     label='Bio'
//                     placeholder='Bio'
//                     onChangeText={(val) => updateStateObject({ bio: val })}
//                     value={state.bio}
//                 />
//                 <Input 
//                     label='Your Email Address'
//                     placeholder='email@address.com'
//                     onChangeText={(val) => updateStateObject({ email: val })}
//                     value={state.email}
//                 /> 
//                 {/** Maybe add in password reset? */}
//             </View>   
            
            
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'flex-start',
//       flexDirection: "column",
//       backgroundColor: "#cbe7f5",
//       alignItems: "center",
//       padding: 10,
//       gap: 10,
//     },
//     info: {
//         backgroundColor: "white",
//         padding: 10,
//         borderRadius: 10,
//         width: '95%',
//     },
//     title: {
//         fontSize: 34,
//         fontWeight: 'bold',
//         fontStyle: 'italic',
//         color: '#143342',
//         padding: 10,
//         paddingTop: 50,
//     },
//     link: {
//         color: '#0000EE',
//         fontSize: 16,
//         textDecorationLine: 'underline',
//     },
//     button: {
//         borderRadius: 10,
//     },
//     inputError: {
//         color: "red",
//     },
//     pfp: {
//         backgroundColor: 'white',
//         alignSelf:'flex-start',
//         resizeMode: 'contain',
//         width: 175,
//         height: 175,
//         borderRadius: 175 / 2,
//     },
//     list: {
//         flexDirection:'row',
//         backgroundColor: "white",
//         padding: 2,
//         borderRadius: 10,
//         width: '95%',
//         flex: 1,
//         marginBottom: 20
//     },
//     listingImage: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover'
//     }
// });

// export default EditProfile;