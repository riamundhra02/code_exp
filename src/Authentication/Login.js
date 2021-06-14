import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, globalStylesheet, ImageBackground, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const onFooterLinkPress = () => {  //navigate to registration page when executed
        navigation.navigate('Register')
    }
    // refer to firebase console -> authentication for userdata
    const onLoginPress = () => {   // signin using firebase
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                navigation.navigate('Explore')  //navigates to homepage if successful
            })
            .catch(error => {
                alert(error)
            })
    }


    return (

        <View style={{ flex: 1, justifyContent:"center", height:"100%" }}>
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

                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={globalStyles.secondaryTitleText}>Log In</Text>
                </TouchableOpacity>

                <View style={globalStyles.footerView}>
                    <TouchableOpacity>
                        <Text style={{ ...globalStyles.footerText, fontSize: 14 }}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.footerView}>
                    <Text style={globalStyles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={globalStyles.footerLink}>Sign up</Text></Text>
                </View>
        </View>

    )
}


{/* <TouchableOpacity style={{alignItems: "center",
                        ustifyContent: 'center'}}
                        onPress={() => signInWithGoogleAsync()}>
                        <Image
                            style={{
                                height: 48,
                                width: 200,
                                borderRadius: 5,
                                overflow: 'hidden',
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 20,}}
                            source={require("./signIn.png")}
                        />
                    </TouchableOpacity>  */}
