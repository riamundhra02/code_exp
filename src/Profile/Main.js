import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function Main() {
    const logOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text>Profile</Text>
            <TouchableOpacity
                style={{ alignItems: "center", justifyContent: 'center', backgroundColor: "red" }}
                onPress={logOut}>
                <Text style={globalStyles.secondaryTitleText}>Log Out</Text>
            </TouchableOpacity>

        </View>
    )
}