import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

import { globalStyles } from '../shared/globalStyles'

export default function Main(){
    return(
        <View style={globalStyles.container}>
            <Text>Create post</Text>
        </View>
    )
}