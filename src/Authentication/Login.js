import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

import { globalStyles } from '../shared/globalStyles'

export default function TabOne() {
    return (
        <View style={globalStyles.container}>
            <Text>Login</Text>
        </View>
    )
}