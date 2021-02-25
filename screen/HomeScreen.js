import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const logout = () => {
        auth.signOut().then(() =>{
            navigation.replace("login");
        });
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats')
        .onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));

        return unsubscribe;
    }, [])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}} >
                    <TouchableOpacity activeOpacity ={0.5} onPress ={logout} >
                        <Avatar
                            rounded
                            source={{
                                uri: "https://scontent.fcgp7-1.fna.fbcdn.net/v/t1.0-9/118589703_1025868897884938_4756722051990937297_n.jpg?_nc_cat=105&ccb=3&_nc_sid=09cbfe&_nc_eui2=AeGND08fnLT9_xk4yAYKaGJn2ujioMMe0zza6OKgwx7TPJOZtKu8I532frG8UBMFLtQEo0kIsWGSsGd0nFZrminD&_nc_ohc=dNE5QDNxyOkAX_0IDGF&_nc_ht=scontent.fcgp7-1.fna&oh=99ec43f6f612c13d3c8f4c317d05d4c5&oe=605867BD"
                                //uri: auth?.currentUser?.photoURL
                            }}
                        />

                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate("chat", {
            id,
            chatName,
        });
    }

    return (
        <SafeAreaView>
            <StatusBar style = "light" />
            <ScrollView style={styles.container} >
                {chats.map(({id, data:{chatName}}) => (
                    <CustomListItem 
                        key={id} 
                        id={id} 
                        chatName={chatName} 
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
