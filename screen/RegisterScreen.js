import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back"
        });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName : name,
                photoURL: imageUrl || "https://www.elegantthemes.com/blog/wp-content/uploads/2017/01/shutterstock_534491617-600.jpg"
            });
        })
        .catch((error) => alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior = "padding" style={styles.container}>
            <StatusBar style = "light" />
            <Text h3 style = {{marginBottom: 50}} >Create a Signal Account</Text>
            
            <View style={styles.inputContainer}>
                <Input
                    placeholder = "Full Name"
                    autoFocus
                    type = 'text'
                    value = {name}
                    onChangeText ={(text) => setName(text)}
                />
                <Input
                    placeholder = "Email"
                    type = 'email'
                    value = {email}
                    onChangeText ={(text) => setEmail(text)}
                />
                <Input
                    placeholder = "Password"
                    type = 'password'
                    secureTextEntry
                    value = {password}
                    onChangeText ={(text) => setPassword(text)}
                />
                <Input
                    placeholder = "Profile Picture URL (Optional)"
                    type = 'text'
                    value = {imageUrl}
                    onChangeText ={(text) => setImageUrl(text)}
                    onSubmitEditing ={register}
                />
            </View>

            <Button 
                raised 
                onPress={register} 
                title="Register" 
                style={styles.button}
            />
            <View style={{height: 50}} />
        </KeyboardAvoidingView>

    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})
