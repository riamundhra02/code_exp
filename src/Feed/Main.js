import React, { useState, useEffect, } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function Home() {
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
    const [recipeData, setRecipeData] = useState([])


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
    const [hawkerData, setHawkerData] = useState([])

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL()
    }


    useEffect(() => {
        const unsubscribeRecipes = firebase.firestore().collection("recipeData").onSnapshot(async (collection) => {
            let results = await Promise.all(collection.docs.map(async (doc) => {
                let data = doc.data()
                let img = await getImage(data.image)
                data.image = img
                data.ingredients=data.ingredients.replaceAll("\\n", "\n")
                data.method=data.method.replaceAll("\\n", "\n")
                return { ...data, id: doc.id }
            }));
            console.log(results)
            setRecipeData(results)
        })

        const unsubscribeHawkers = firebase.firestore().collection("hawkerData").onSnapshot(async (collection) => {
            let results = await Promise.all(collection.docs.map(async (doc) => {
                let data = doc.data()
                let revieww = await Promise.all(doc.data().reviews.map(async (review, index) => {
                    let copy = review
                    let img = await getImage(doc.id + "/" + review.image)
                    copy.image = img
                    copy.review=copy.review.replaceAll("\\n", "\n")
                    return copy
                }))
                data.reviews = revieww
                data.Location=data.Location.replaceAll("\\n", '\n')
                return { ...data, id: doc.id }
            }));
            console.log(results)
            setHawkerData(results)
        })

        return () => {
            unsubscribeRecipes()
            unsubscribeHawkers()
        };

    }, []);

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text>Explore</Text>
            <Text>{JSON.stringify(recipeData)}</Text>
            <Text>{JSON.stringify(hawkerData)}</Text>
        </SafeAreaView>
    )
}