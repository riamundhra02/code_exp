import React, { useState } from 'react'
import TabNavigator from './src/TabsNavigator'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const getFonts = () => Font.loadAsync({
    'quicksand-regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'quicksand-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    'quicksand-light': require('./assets/fonts/Quicksand-Light.ttf'),
    'quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
})

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (fontsLoaded) {
        return (
            <SafeAreaProvider>
                <TabNavigator />
            </SafeAreaProvider>
        )
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={console.warn}
            />
        )
    }
}

