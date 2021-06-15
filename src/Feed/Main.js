import React, { useState, useEffect, } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, SafeAreaView } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'
import HawkerfeedScreen from "./HawkerFeed"
import HawkerCard from "../HawkerCard"

export default function Home({ navigation }) {
    const Stack = createStackNavigator();
    // [{
    //     cuisine: ["Local", "Vegetarian"],
    //     difficulty: "easy",
    //     id: "NGa21ieM5LIsEHe0V8uk",
    //     image: image_source,
    //     ingredients: "maggie\nmee\n",
    //     method: "Step 1\n2. Step 2",
    //     recipeName: "Maggie Mee",
    //     saves: 0,
    //     time: "1h"
    // },
    // {...},
    // {...}]
    const [recipeData, setRecipeData] = useState(null)
    const [feed, setFeed] = useState("recipe")


    // [{
    //     Location: "Blk, 208B New Upper Changi Rd, 462208",
    //     id: "UGafNQZ88Fddddmx6nH5",
    //     rating: 5,
    //     region: "East",
    //     reviews: [{
    //         "image": image_source,
    //         "review": "Very tasty",
    //     },
    //     {
    //         "image": image_source,
    //         "review": "Very tasty",
    //     }],
    //     saves: 0,
    //     stallName: "Prata Stall",
    // },
    // {...},
    // {...}]
    const [hawkerData, setHawkerData] = useState(null)
    const [loading, setLoading] = useState(true)

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL()
    }


    useEffect(() => {
        const unsubscribeRecipes = firebase.firestore().collection("recipeData").onSnapshot(async (collection) => {
            setLoading(true)
            let results = await Promise.all(collection.docs.map(async (doc) => {
                let data = doc.data()
                let img = await getImage(data.image)
                data.image = img
                data.ingredients = data.ingredients.replaceAll("\\n", "\n")
                data.method = data.method.replaceAll("\\n", "\n")
                return { ...data, id: doc.id }
            }));
            setRecipeData(results)
            setLoading(false)

        })

        return () => {
            unsubscribeRecipes()
        };

    }, []);

    return (
        <View style={globalStyles.container}>
            <Text style={{ left: 130, top: 50, zIndex: 100, backgroundColor: "transparent", fontSize: 20, position: "absolute", color: feed==="recipe"? "blue":'white', fontWeight: feed==="recipe"? "bold":"normal" }} onPress={() => setFeed("recipe")}>Recipe</Text>
            <Text style={{ left: 200, top: 50, zIndex: 100, backgroundColor: "transparent", fontSize: 20, position: "absolute", color: feed==="hawker"? "blue":'white', fontWeight: feed==="hawker"? "bold":"normal"}} onPress={() => setFeed("hawker")}>Hawker</Text>
            <>
                {feed==="recipe" ? <></> : <HawkerfeedScreen />}
            </>
        </View >
    )
}