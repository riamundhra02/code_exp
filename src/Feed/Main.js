import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

import { globalStyles } from '../shared/globalStyles'

export default function Home(){
    return(
        <View style={globalStyles.container}>
            <Text>Explore</Text>
        </View>
    )
}