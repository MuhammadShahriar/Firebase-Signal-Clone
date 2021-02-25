import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if ( authUser ) {
                navigation.replace("home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior = "padding" style={styles.container} >
            <StatusBar style = "light" />
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
                }}
                style={{width: 200, height: 200}}
            />
            <View style={styles.inputContainer} >
                <Input
                    placeholder = "Email"
                    autoFocus
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    type = "email"
                />

                <Input
                    placeholder = "Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    type = "password"
                    onSubmitEditing ={signIn}
                />
            </View>

            <Button 
                containerStyle={styles.button} 
                title = "Login"
                onPress ={signIn} 
            />

            <Button 
                containerStyle={styles.button} 
                type ="outline" 
                title = "Register" 
                onPress={() => navigation.navigate('register')}
            />

            <View style={{height: 50}} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
