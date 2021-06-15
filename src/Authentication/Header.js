import React, { useState, useRef } from 'react'
import { Text, TextInput, TouchableOpacity, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function Header() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                <Text style={globalStyles.secondaryTitleText}>AppName</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}