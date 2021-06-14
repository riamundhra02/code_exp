import React, { useState, useRef } from 'react'
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }  // navigates to login

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }//else
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password) //creates entry into database
            .then((response) => {
                const uid = response.user.uid  //userid
                const data = {
                    fullName: fullName,
                    email: email,
                    hawkerPosts: [],
                    recipePosts: []

                }
                const usersRef = firebase.firestore().collection('userData')  // from db collection of userinfo
                usersRef
                    .doc(uid)
                    .set(data)
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", height: "100%" }}>
            <TextInput
                style={globalStyles.input}
                placeholder='Full Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={globalStyles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Confirm Password'
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => onRegisterPress()}>
                <Text style={globalStyles.secondaryTitleText}>Create account</Text>
            </TouchableOpacity>

            <View style={globalStyles.footerView}>
                <Text style={globalStyles.footerText}>Already have an account? <Text onPress={onFooterLinkPress} style={globalStyles.footerLink}>Log in</Text></Text>
            </View>
        </View>
    )
}