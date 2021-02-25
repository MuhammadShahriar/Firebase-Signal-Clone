import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
// import {  } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';
import { auth, db } from '../firebase';
import firebase from 'firebase';


const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAling: "left",
            headerTitle: () => (
                <View style ={{
                    flexDirection: "row",
                    alignItems: "center",
                }} >
                    <Avatar
                        rounded 
                        source={{
                            uri:"https://scontent.fcgp7-1.fna.fbcdn.net/v/t1.0-9/118589703_1025868897884938_4756722051990937297_n.jpg?_nc_cat=105&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeGND08fnLT9_xk4yAYKaGJn2ujioMMe0zza6OKgwx7TPJOZtKu8I532frG8UBMFLtQEo0kIsWGSsGd0nFZrminD&_nc_ohc=dNE5QDNxyOkAX_0IDGF&_nc_ht=scontent.fcgp7-1.fna&oh=99ec43f6f612c13d3c8f4c317d05d4c5&oe=605867BD"
                                
                        }}
                    />
                    <Text>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style ={{
                    flexDirection: "row",
                    alignItems: "center",
                }} >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    });

    const sendMessage =() => {
        Keyboard.dismiss();

        db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName : auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });

        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => setMessage(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe;
    }, [route]);

    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}

            >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
                    <>
                
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }} >
                            {message.map(({id, data}) => (
                                
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar 
                                            source={{
                                                uri: "https://scontent.fcgp7-1.fna.fbcdn.net/v/t1.0-9/118589703_1025868897884938_4756722051990937297_n.jpg?_nc_cat=105&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeGND08fnLT9_xk4yAYKaGJn2ujioMMe0zza6OKgwx7TPJOZtKu8I532frG8UBMFLtQEo0kIsWGSsGd0nFZrminD&_nc_ohc=dNE5QDNxyOkAX_0IDGF&_nc_ht=scontent.fcgp7-1.fna&oh=99ec43f6f612c13d3c8f4c317d05d4c5&oe=605867BD"
                                                // uri: data.photoURL
                                            }}
                                            rounded
                                            size={30}
                                            containerStyle={{
                                                    
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            position="absolute"
                                            bottom={-15}
                                            right={-5}
                                        />
                                        <Text style={styles.receiverText} >{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar 
                                            source={{
                                                uri: "https://scontent.fcgp7-1.fna.fbcdn.net/v/t1.0-9/118589703_1025868897884938_4756722051990937297_n.jpg?_nc_cat=105&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeGND08fnLT9_xk4yAYKaGJn2ujioMMe0zza6OKgwx7TPJOZtKu8I532frG8UBMFLtQEo0kIsWGSsGd0nFZrminD&_nc_ohc=dNE5QDNxyOkAX_0IDGF&_nc_ht=scontent.fcgp7-1.fna&oh=99ec43f6f612c13d3c8f4c317d05d4c5&oe=605867BD"
                                                // uri: data.photoURL
                                            }}
                                            rounded
                                            size={30}
                                            containerStyle={{
                                                    
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5,
                                            }}
                                            position="absolute"
                                            bottom={-15}
                                            left={-5}
                                        />
                                        <Text style={styles.senderText} >{data.displayName}</Text>
                                        <Text style={styles.senderText} >{data.message}</Text>
                                    </View>
                                )
                            ))}

                        </ScrollView>

                        <View style={styles.footer} >
                            <TextInput 
                                placeholder="Signal Message"
                                style={styles.textInput}
                                value ={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />

                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                                <Ionicons name = "send" size={24} color ="#2868E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                {/* </TouchableWithoutFeedback> */}

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender:{
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position:"relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName : {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius: 30,
    }
})
