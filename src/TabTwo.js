import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

import { globalStyles } from './shared/globalStyles'

export default function TabTwo(){
    return(
        <View style={globalStyles.container}>
            <Text>This is tab two</Text>
        </View>
    )
}