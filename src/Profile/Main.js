import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../shared/config'
import { globalStyles } from '../shared/globalStyles'

export default function Main() {

    // {
    //     email: "ria.mundhra1234@gmail.com",
    //     fullName: "ria mu",
    //     hawkerPosts:[
    //         "UGafNQZ88Fddddmx6nH5",
    //     ],
    //     recipePosts:[
    //         "NGa21ieM5LIsEHe0V8uk",
    //     ],
    // }
    const [user, setUser] = useState()

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
    const [bookmarkedRecipeData, setBookmarkedRecipeData] = useState([])

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
    const [bookmarkedHawkerData, setBookmarkedHawkerData] = useState([])

    const logOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    const getImage = async (img) => {
        let imageRef = firebase.storage().ref(img);
        return imageRef.getDownloadURL()
    }

    const getRecipeData = async (id) => {
        let data
        await firebase.firestore().collection("recipeData").doc(id).get()
            .then(async (doc) => {
                if (doc.exists) {
                    data = doc.data()
                    let img = await getImage(data.image)
                    data.image = img
                    data.ingredients = data.ingredients.replaceAll("\\n", "\n")
                    data.method = data.method.replaceAll("\\n", "\n")
                }
            })
        return { ...data, id: id }
    }

    const getHawkerData = async (id) => {
        let data
        await firebase.firestore().collection("hawkerData").doc(id).get()
            .then(async (doc) => {
                data = doc.data()
                let revieww = await Promise.all(doc.data().reviews.map(async (review, index) => {
                    let copy = review
                    let img = await getImage(doc.id + "/" + review.image)
                    copy.image = img
                    copy.review = copy.review.replaceAll("\\n", "\n")
                    return copy
                }))
                data.reviews = revieww
                data.Location = data.Location.replaceAll("\\n", '\n')
            });
        return { ...data, id: id }
    }


    useEffect(() => {
        const user = firebase.auth().currentUser
        const unsubscribeUser = firebase.firestore().collection("userData").doc(user.uid).onSnapshot(async (doc) => {
            let data = doc.data()
            setUser(data)
            if (data.recipePosts.length > 0) {
                let recipes = await Promise.all(data.recipePosts.map(async (id, index) => {
                    return await getRecipeData(id)
                }))
                setRecipeData(recipes)
            }

            if (data.bookmarkedRecipes.length > 0) {
                let bookmarkedRecipes = await Promise.all(data.bookmarkedRecipes.map(async (id, index) => {
                    return await getRecipeData(id)
                }))
                setBookmarkedRecipeData(bookmarkedRecipes)
            }

            if (data.hawkerPosts.length > 0) {
                let hawkers = await Promise.all(data.hawkerPosts.map(async (id, index) => {
                    return await getHawkerData(id)
                }))
                setHawkerData(hawkers)
            }

            if (data.bookmarkedHawkers.length > 0) {
                let bookmarkedHawkers = await Promise.all(data.bookmarkedHawkers.map(async (id, index) => {
                    return await getHawkerData(id)
                }))
                setBookmarkedHawkerData(bookmarkedHawkers)
            }
        })

        return () => {
            unsubscribeUser()
        };
    }, [])

    return (
        <View style={globalStyles.container}>
            <Text>Profile</Text>
            <Text>{JSON.stringify(recipeData)}</Text>
            <Text>{JSON.stringify(hawkerData)}</Text>
            <Text>{JSON.stringify(bookmarkedHawkerData)}</Text>
            <Text>{JSON.stringify(bookmarkedRecipeData)}</Text>
            <Text>{JSON.stringify(user)}</Text>
            <TouchableOpacity
                style={{ alignItems: "center", justifyContent: 'center', backgroundColor: "red" }}
                onPress={logOut}>
                <Text style={globalStyles.secondaryTitleText}>Log Out</Text>
            </TouchableOpacity>

        </View>
    )
}