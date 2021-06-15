import React, { useState, useEffect, } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, SafeAreaView } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'
import HawkerfeedScreen from "./HawkerFeed"
import RecipefeedScreen from "./RecipeFeed"
import HawkerCard from "../HawkerCard"

export default function Home({ navigation }) {
    const [feed, setFeed] = useState("recipe")

    return (
        <View style={globalStyles.container}>
            <Text style={{ left: 130, top: 50, zIndex: 100, backgroundColor: "transparent", fontSize: 20, position: "absolute", color: feed === "recipe" ? "blue" : 'white', fontWeight: feed === "recipe" ? "bold" : "normal" }} onPress={() => setFeed("recipe")}>Recipe</Text>
            <Text style={{ left: 200, top: 50, zIndex: 100, backgroundColor: "transparent", fontSize: 20, position: "absolute", color: feed === "hawker" ? "blue" : 'white', fontWeight: feed === "hawker" ? "bold" : "normal" }} onPress={() => setFeed("hawker")}>Hawker</Text>
            <>
                {feed === "recipe" ? <RecipefeedScreen /> : <HawkerfeedScreen />}
            </>
        </View >
    )
}