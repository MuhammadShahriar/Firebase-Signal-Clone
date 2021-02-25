import React, { useLayoutEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    });

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error));
    }

    return (
        <View style={styles.container} >
            <Input 
                placeholder= "Enter a chat name"
                value={input}
                onChangeText ={(text) => setInput(text)}
                leftIcon={
                    <AntDesign name="wechat" size={24} color="black" />
                }
                onSubmitEditing={createChat}
            />

            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    }
})
